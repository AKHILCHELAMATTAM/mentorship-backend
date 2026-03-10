const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
name:String,
parent:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
});

module.exports = mongoose.model("Student",StudentSchema);
