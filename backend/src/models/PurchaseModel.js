import express from 'express';
import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  amount: { type: Number, required: true },        // store paid amount
  datePlaced: { type: Date, default: Date.now },
  paymentStatus: { type: String, default: 'PENDING' },  // e.g., 'COMPLETED'
  paymentId: String,     // Razorpay paymentId
  orderId: String,       // Razorpay orderId
});


PurchaseSchema.index({ user: 1, course: 1 }, { unique: true }); // Prevent duplicate purchases
PurchaseSchema.pre('save', function(next) {
  if (this.isNew) {
    this.datePlaced = Date.now();
  }
  next();
});

export default mongoose.model('Purchase', PurchaseSchema);