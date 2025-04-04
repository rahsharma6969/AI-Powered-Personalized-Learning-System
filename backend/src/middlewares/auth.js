import jwt from "jsonwebtoken";
import Student from "../models/StudentModel.js";

export const authenticateUser = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access Denied: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the actual token

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Student.findById(verified.id || verified._id); // Handle both `id` and `_id`
        
        if (!req.user) return res.status(404).json({ error: "User not found" });

        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
};
// Middleware to check if user is admin
export const adminAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
  
 
  
