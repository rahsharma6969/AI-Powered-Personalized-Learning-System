import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import adminRouter from "./routes/adminRoutes.js";
import { createAdmin } from "./config/initAdmin.js"; // ✅ import clean
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use("/api", routes);
app.use("/admin", adminRouter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    await createAdmin(); // ✅ Cleaner and separate
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
