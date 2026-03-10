const router=require("express").Router();
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
