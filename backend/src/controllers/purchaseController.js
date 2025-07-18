import { fetchUserPurchases } from '../services/purchaseService.js';

export async function getUserPurchases(req, res) {
  const purchases = await fetchUserPurchases(req.params.userId);
  res.json(purchases || []);
}
