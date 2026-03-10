const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
title:String,
description:String,
mentorId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
});

module.exports = mongoose.model("Lesson",LessonSchema);
