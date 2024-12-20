import Order from "../models/order.model.js";
import Coupon from "../models/coupon.model.js";
import { stripe } from "../lib/stripe.js";

// Function to create a new coupon with a 10% discount for the user
async function createNewCoupon(userId) {
  const existingCoupon = await Coupon.findOne({ userId });

  // If the user already has a coupon, don't create a new one
  if (existingCoupon) {
    return existingCoupon;
  }

  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Valid for 30 days
    userId,
  });

  await newCoupon.save();
  return newCoupon;
}

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    // Validate products array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    let totalAmount = 0;
    const lineItems = products.map((product) => {
      if (!product.name || !product.price || product.price <= 0) {
        throw new Error(`Invalid product: ${JSON.stringify(product)}`);
      }
      const amount = Math.round(product.price * 100); // Stripe requires price in cents
      totalAmount += amount * (product.quantity || 1);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: product.image ? [product.image] : [],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    // Check if the total amount exceeds $200 to apply the 10% discount
    let coupon = null;
    if (totalAmount >= 20000) {
      // Create a new coupon for the user if the total exceeds $200
      coupon = await createNewCoupon(userId);
    }

    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: userId,
        isActive: true,
      });

      if (!coupon) {
        return res.status(400).json({ error: "Invalid or expired coupon" });
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.BASE_CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: coupon.stripeCouponId,
            },
          ]
        : [],
      metadata: {
        userId,
        couponCode: couponCode || coupon?.code || "",
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
          }))
        ),
      },
    });

    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error processing checkout:", error.message);
    res.status(500).json({
      message: "Error processing checkout",
      error: error.message,
    });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponCode,
            userId: session.metadata.userId,
          },
          { isActive: false }
        );
      }

      const products = session.metadata?.products
        ? JSON.parse(session.metadata.products)
        : [];
      if (!products || products.length === 0) {
        throw new Error("Invalid products in session metadata");
      }

      const newOrder = new Order({
        user: session.metadata.userId,
        products: products.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
      });
      await newOrder.save();
      res.status(200).json({
        success: true,
        message:
          "Payment successful, order created, and coupon deactivated if used.",
        newOrder,
      });
    } else {
      res.status(400).json({ error: "Payment not successful" });
    }
  } catch (error) {
    console.error("Error processing successful checkout:", error.message);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};
