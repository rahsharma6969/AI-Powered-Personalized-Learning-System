// src/routes/paymentRoutes.js
import express from 'express';
import { createOrder, verifySignature } from '../services/payment_service.js';
import Purchase from '../models/PurchaseModel.js';
import Student from '../models/StudentModel.js';
import { getUserPurchases } from '../controllers/purchaseController.js';
import { authenticateUser } from '../middlewares/auth.js';
import { log } from 'console';
import Razorpay from 'razorpay';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_spBDRYjvb803nY',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_razorpay_secret_key'
});
const router = express.Router();

router.post('/create-order',authenticateUser, async (req, res) => {
  try {
    const { amount, receipt, courseId } = req.body;
    const notes = {
      courseId : courseId,
      userId: req.user._id.toString()
      
    };
  
    const order = await createOrder(amount, receipt, notes);
    console.log("Order created successfully:", order);
    
    res.json(order);
  } catch (error) {
    console.log("Error creating order:", error);
    res.status(500).json({ success: false, error: 'Failed to create order' });
    
  }
});

router.post('/verify-payment', authenticateUser, async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  // 1️⃣ Verify Razorpay signature
  const isValid = verifySignature({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  });
  if (!isValid) {
    return res.status(400).json({ success: false, error: 'Invalid signature' });
  }

  try {
    // 2️⃣ Fetch detailed payment object from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // 3️⃣ Read metadata from notes
    const studentId = req.user._id;
    log("Student ID:", studentId);
    log("Payment Notes:", payment.notes);
    const purchasedCourseId = payment.notes.courseId;

    // 4️⃣ Create a purchase record
    const purchase = await Purchase.create({
      user: studentId,
      course: purchasedCourseId,
      amount: payment.amount / 100,  // converting paise to rupees
      paymentStatus: 'COMPLETED',
      paymentId: payment.id,
      orderId: payment.order_id,
    });

    // 5️⃣ Add purchase to the student
    await Student.findByIdAndUpdate(studentId, {
      $push: { purchases: purchase._id }
    });

    return res.json({ success: true, purchaseId: purchase._id });
  } catch (err) {
    console.error('Payment verification error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});



router.get('/:userId', authenticateUser, getUserPurchases);

router.get('/user/purchases/:courseId', authenticateUser, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;
    
    const purchase = await Purchase.findOne({
      user: userId,
      course: courseId,
      paymentStatus: 'COMPLETED'
    });
    
    res.json({ hasPurchased: !!purchase });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check purchase status' });
  }
});
export default router;
