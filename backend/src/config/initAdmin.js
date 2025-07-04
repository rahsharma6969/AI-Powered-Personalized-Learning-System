import mongoose from "mongoose";
import { Admin } from "../models/AdminModel.js"; 

export const createAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    const admin = new Admin({
      email: "admin@gmail.com",
      password: "CollegeProject@26", // You may hash this later
      name: "Super Admin",
    });

    await admin.save();
    console.log("✅ Admin created successfully");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  }
};
