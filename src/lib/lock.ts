import { redis } from "./redis";

export async function acquireLock(key: string, ttl = 5000) {
  const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const res = await redis.set(key, token, "NX", "PX", ttl);
  return res === "OK" ? token : null;
}

export async function releaseLock(key: string, token: string) {
  const script = `if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end`;
  return await redis.eval(script, 1, key, token);
}
