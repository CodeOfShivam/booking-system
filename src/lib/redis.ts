import Redis from "ioredis";

const url = process.env.REDIS_URL || "redis://localhost:6379";
export const redis = new Redis(url);
export const redisPub = new Redis(url);
export const redisSub = new Redis(url);
