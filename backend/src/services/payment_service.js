// src/services/paymentService.js
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function createOrder(amount, receipt, notes = {}) {
  return razorpay.orders.create({
      amount: amount * 100,
    currency: 'INR',
    receipt,
    payment_capture: '1',
    notes,  // attach custom metadata here
  });
}


export function verifySignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');
  return expected === razorpay_signature;
}
