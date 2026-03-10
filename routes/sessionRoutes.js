const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Session = require("../models/Session");

router.post("/", auth, async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/lessons/:id/sessions", auth, async (req, res) => {
  const sessions = await Session.find({ lessonId: req.params.id });
  res.json(sessions);
});

module.exports = router;