const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
studentId:{type:mongoose.Schema.Types.ObjectId,ref:"Student"},
lessonId:{type:mongoose.Schema.Types.ObjectId,ref:"Lesson"}
});

module.exports = mongoose.model("Booking",BookingSchema);
