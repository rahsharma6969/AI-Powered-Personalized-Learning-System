// services/purchaseService.js
import Student from '../models/StudentModel.js';

export async function fetchUserPurchases(userId) {
  return Student.findById(userId)
    .populate({ path: 'purchases', populate: { path: 'course' } })
    .select('purchases')
    .lean();
}

