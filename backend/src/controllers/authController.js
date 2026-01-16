import dotenv from "dotenv";
dotenv.config();

import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { signUpSchema } from "../validations/userSchema.js";
import { z } from "zod"
import jwt from "jsonwebtoken"

export const signUpUser = async (req, res) => {
  try{
    const validatedData = signUpSchema.parse(req.body);

    const existingUser = await prisma.User.findUnique({
      where: {Email: validatedData.Email}
    });

    if(existingUser) {
      return res.status(409).json({
        message: "User already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(validatedData.Password, 6);

    const user = await prisma.User.create({
      data: { 
        Email: validatedData.Email, 
        Username: validatedData.Username, 
        Password: hashedPassword, 
        role: validatedData.role,
        updatedAt: new Date()
      }
    });

    res.status(201).json({
      message: "User created successfully!", 
      user
    });
  } catch (error) {
    if(error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        error: error.issues.map(err => err.message)
      });
    }
    return res.status(500).json({
      error: error.message
    });
  };
};


export const loginUser = async (req, res) => {
  try{
    const{Username, Password} = req.body;
    const existingUser = await prisma.User.findUnique({
      where: {Username: Username}
    });

    if(!existingUser){
      return res.status(404).json({
        message: "User not found."
      });
    }
    const matchedPassword = await bcrypt.compare(Password, existingUser.Password);

    if(matchedPassword ){
      const accessToken = jwt.sign({
        userId: existingUser.userId,
        role: existingUser.role
      }, process.env.JWT_SECRET)


      console.log(existingUser.userId);
      console.log(existingUser.role);
      
      return res.status(200).json({
        message: "Login successful",
        accessToken: accessToken,
        data: {
          userId : existingUser.userId,
          Username: existingUser.Username,
        }
      });
    } else{
      return res.status(400).json({
        message: "Error! Passwords do not match."
      });
    }
  } catch(error){
    return res.status(400).json({
      message: error.message
    });
  }
}