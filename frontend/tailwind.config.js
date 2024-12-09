/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define primary and secondary colors
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        neutral: "var(--color-neutral)",

        // Define background and foreground
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Define hover states
        "primary-hover": "var(--color-primary-hover)",
        "secondary-hover": "var(--color-secondary-hover)",

        // Define error and success colors for notifications
        error: "var(--color-error)",
        success: "var(--color-success)",
      },
      // Add box shadows for cards/products
      boxShadow: {
        product: "0 2px 10px rgba(0, 0, 0, 0.1)",
        card: "0 2px 20px rgba(0, 0, 0, 0.1)",
      },
      // Add animations/transitions
      transitionTimingFunction: {
        "in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
