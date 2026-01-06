import ratelimit from "../config/upstash.js";
const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-rate-limit");
    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default ratelimiter;
