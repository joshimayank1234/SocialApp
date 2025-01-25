import { Router } from "express"
import User from '../models/User.js'
import bcrypt from "bcrypt"


const router = Router();


router.get("/",async (req,res)=>{
   try{
    let data = await User.find()
    res.json({"All Users":data})
   }
   catch(error){
    res.status(500).json({message:error.message})
   }
})

router.post("/", async (req,res) => {
    let{username,FullName,password,avtar}=req.body;
    password  = await bcrypt.hash(password,10);

    const newUser= new User({username,FullName,password,avtar}); // Change 'Post' to 'newPost'
    console.log(username,FullName,password,avtar);
    
    try {
      await newUser.save(); // Save the new instance
      res.status(201).json({message:"user registered successfully",newUser}); // Send the saved post as a response
    } catch (error) {
      res.status(400).json({ message: error.message }); // Handle validation or other errors
    }
  });


router.post("/login",async(req,res)=>{
    let{username,password}=req.body;

    let user= await User.findOne({username})
    if(!user) return res.status(404).json({message:"user not find"});

    let validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword) return res.status(401).json({message:"Invalid password"})

    res.json({
      message:"Login successfully",
      user:{
        username:user.username,
        FullName:user.FullName,
        avtar:user.avtar,
        userId:user._id
      }
     
    })
    console.log(user);
})  

export default router;