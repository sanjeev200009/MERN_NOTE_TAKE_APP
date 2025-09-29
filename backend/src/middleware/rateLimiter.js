const { ratelimit } = require("../config/upstash.js");

const ratelimiter = async (req, res, next) => {
  try {
    const { success, limit, remaining, reset } = await ratelimit.limit("api-rate-limit");

    if (!success) {
      return res.status(429).json({
        success: false,
        message: "Too many requests, please try again later",
        limit: limit,
        remaining: remaining,
        resetTime: new Date(reset).toISOString()
      });
    }

    // Add rate limit headers for client visibility
    res.set({
      'X-RateLimit-Limit': limit,
      'X-RateLimit-Remaining': remaining,
      'X-RateLimit-Reset': new Date(reset).toISOString()
    });

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    // Allow the request through if rate limiter fails
    next();
  }
};

module.exports = { ratelimiter };