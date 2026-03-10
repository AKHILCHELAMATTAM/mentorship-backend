const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Booking = require("../models/Booking");

router.post("/", auth, async (req, res) => {
  try {
    const booking = await Booking.create({
      studentId: req.body.studentId,
      lessonId: req.body.lessonId
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;