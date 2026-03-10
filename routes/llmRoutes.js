const router = require("express").Router();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});

router.post("/summarize", limiter, async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Text required" });
  if (text.length < 50) return res.status(400).json({ error: "Text too short" });

  res.json({
    summary: "Demo summary endpoint working",
    model: "demo"
  });
});

module.exports = router;