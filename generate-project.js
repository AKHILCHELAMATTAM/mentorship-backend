const fs = require("fs");

function createFile(path, content) {
  const dir = path.substring(0, path.lastIndexOf("/"));

  // Only create directory if it exists
  if (dir && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(path, content);
}

createFile(
  "server.js",
`require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const llmRoutes = require("./routes/llmRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/lessons", lessonRoutes);
app.use("/bookings", bookingRoutes);
app.use("/sessions", sessionRoutes);
app.use("/llm", llmRoutes);

app.listen(process.env.PORT, () =>
  console.log("Server running on " + process.env.PORT)
);
`
);

createFile(
"config/db.js",
`const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
`
);

createFile(
"models/User.js",
`const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
name:String,
email:{type:String,unique:true},
password:String,
role:{type:String,enum:["parent","mentor"]}
});

module.exports = mongoose.model("User",UserSchema);
`
);

createFile(
"models/Student.js",
`const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
name:String,
parent:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
});

module.exports = mongoose.model("Student",StudentSchema);
`
);

createFile(
"models/Lesson.js",
`const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
title:String,
description:String,
mentorId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
});

module.exports = mongoose.model("Lesson",LessonSchema);
`
);

createFile(
"models/Booking.js",
`const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
studentId:{type:mongoose.Schema.Types.ObjectId,ref:"Student"},
lessonId:{type:mongoose.Schema.Types.ObjectId,ref:"Lesson"}
});

module.exports = mongoose.model("Booking",BookingSchema);
`
);

createFile(
"models/Session.js",
`const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
lessonId:{type:mongoose.Schema.Types.ObjectId,ref:"Lesson"},
date:Date,
topic:String,
summary:String
});

module.exports = mongoose.model("Session",SessionSchema);
`
);

createFile(
"middleware/authMiddleware.js",
`const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
const token=req.headers.authorization?.split(" ")[1];

if(!token)return res.status(401).json({message:"Unauthorized"});

try{
const decoded=jwt.verify(token,process.env.JWT_SECRET);
req.user=decoded;
next();
}catch{
res.status(401).json({message:"Invalid Token"});
}
}
`
);

createFile(
"routes/authRoutes.js",
`const router=require("express").Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const auth=require("../middleware/authMiddleware");

router.post("/signup",async(req,res)=>{
const {name,email,password,role}=req.body;

if(!["parent","mentor"].includes(role)){
return res.status(400).json({message:"Invalid role"});
}

const hashed=await bcrypt.hash(password,10);

const user=await User.create({
name,email,password:hashed,role
});

res.json(user);
});

router.post("/login",async(req,res)=>{
const {email,password}=req.body;

const user=await User.findOne({email});

if(!user)return res.status(400).json({message:"Invalid credentials"});

const match=await bcrypt.compare(password,user.password);

if(!match)return res.status(400).json({message:"Invalid credentials"});

const token=jwt.sign(
{id:user._id,role:user.role},
process.env.JWT_SECRET,
{expiresIn:"1d"}
);

res.json({token});
});

router.get("/me",auth,async(req,res)=>{
const user=await User.findById(req.user.id).select("-password");
res.json(user);
});

module.exports=router;
`
);

createFile(
"routes/studentRoutes.js",
`const router=require("express").Router();
const auth=require("../middleware/authMiddleware");
const Student=require("../models/Student");

router.post("/",auth,async(req,res)=>{
const student=await Student.create({
name:req.body.name,
parent:req.user.id
});
res.json(student);
});

router.get("/",auth,async(req,res)=>{
const students=await Student.find({parent:req.user.id});
res.json(students);
});

module.exports=router;
`
);

createFile(
"routes/lessonRoutes.js",
`const router=require("express").Router();
const auth=require("../middleware/authMiddleware");
const Lesson=require("../models/Lesson");

router.post("/",auth,async(req,res)=>{
const lesson=await Lesson.create({
title:req.body.title,
description:req.body.description,
mentorId:req.user.id
});
res.json(lesson);
});

module.exports=router;
`
);

createFile(
".env",
`PORT=5000
MONGO_URI=mongodb://localhost:27017/mentora
JWT_SECRET=supersecret
OPENAI_API_KEY=your_api_key
`
);

console.log("Mentora backend project generated successfully!");