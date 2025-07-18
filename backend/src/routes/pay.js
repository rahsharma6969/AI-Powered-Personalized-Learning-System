import express from "express";
import paymentroutes from "./paymentRoutes.js";

const router = express.Router();

// Payment Routes
router.use("/payments", paymentroutes);

export default router;

