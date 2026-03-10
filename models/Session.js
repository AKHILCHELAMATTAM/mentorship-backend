const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
lessonId:{type:mongoose.Schema.Types.ObjectId,ref:"Lesson"},
date:Date,
topic:String,
summary:String
});

module.exports = mongoose.model("Session",SessionSchema);
