import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// create a ratelimiter that allows 100 requests per 15 minutes
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "15 m"),
});

export const applyRateLimit = async () => {
  try {
    const { success, limit, remaining, reset } = await ratelimit.limit("api-rate-limit");

    if (!success) {
      return {
        isAllowed: false,
        response: new Response(JSON.stringify({
          success: false,
          message: "Too many requests, please try again later",
          limit: limit,
          remaining: remaining,
          resetTime: new Date(reset).toISOString()
        }), {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString()
          }
        })
      };
    }

    return {
      isAllowed: true,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': new Date(reset).toISOString()
      }
    };
  } catch (error) {
    console.error("Rate limiter error:", error);
    // Allow the request through if rate limiter fails
    return { isAllowed: true, headers: {} };
  }
};