const router=require("express").Router();
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
