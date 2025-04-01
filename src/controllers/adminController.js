import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { Admin } from "../models/AdminModel.js";

configDotenv(); // Make sure to load environment variables

export const adminLogin = async (req, res) => {
  console.log("Received data:", req.body); // Log the request body
  
  const { email, password } = req.body;

  try {
    // Check if environment variables are loaded
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not found in environment variables");
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create the JWT token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return both token and admin data
    return res.json({ 
      admin: { id: admin._id, email: admin.email }, 
      token, 
      message: "Admin login successful" 
    });
    
  } catch (error) {
    console.error("Server error:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

