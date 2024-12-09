import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);

async function testConnection() {
  try {
    await redis.set("testKey", "Hello, Upstash!");
    const value = await redis.get("testKey");
    console.log("Value from Redis:", value);
    redis.disconnect();
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
}

testConnection();
