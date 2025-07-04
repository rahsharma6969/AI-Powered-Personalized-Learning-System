import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { Admin } from "../models/AdminModel.js";

configDotenv(); // Make sure to load environment variables

export const adminLogin = async (req, res) => {
  console.log("Received data on server:", req.body);

  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Admin login successful, sending response",token);
    return res.json({ 
      admin: { id: admin._id, email: admin.email },
      token,
      message: "Admin login successful"
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


