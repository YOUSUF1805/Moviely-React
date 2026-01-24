import express from 'express';
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";


const router = express.Router();
const prisma = new PrismaClient();

// SignUp
router.post("/signup", async (req,res)=>{
    const {email,contact,password}=req.body;

    try{
        const existingUser=await prisma.user.findUnique({
            where:{email}
        });

        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        await prisma.user.create({
      data: {
        email,
        contact, // ✅ FIX
        password: hashedPassword
      }
    });

        res.status(201).json({message:"SignUp successful"})
    }
    catch(err){
        res.status(500).json({message: "Signup failed"})
    }
});

//Login
router.post("/login",async (req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await prisma.user.findUnique({
            where:{email}
        });

        if(!user){
            return res.status(401).json({message:"User not found"})
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({message:"Invalid Password"})
        }

        res.json({message:"Login Successful"});
    }
    catch(err){
        res.json({message:"Login failed"});
    }
    
})

export default router;