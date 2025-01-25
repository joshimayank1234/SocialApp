import { Router } from "express"
import Post from '../models/Post.js'


const router = Router();


router.get("/",async (req,res)=>{
   try{
    let data = await Post.find().populate({path:'userId',select:'username FullName'})
    res.json(data)
   }
   catch(error){
    res.status(500).json({message:error.message})
   }
})

router.post("/", async (req, res) => {
    const newPost = new Post(req.body); // Change 'Post' to 'newPost'
    
    try {
      let savedPost = await newPost.save(); // Save the new instance
      res.json(savedPost); // Send the saved post as a response
    } catch (error) {
      res.status(400).json({ message: error.message }); // Handle validation or other errors
    }
  });
  

export default router;
