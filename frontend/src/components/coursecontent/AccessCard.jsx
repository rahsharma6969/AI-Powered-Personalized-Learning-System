import React from "react";
import { CheckCircle, Lock, CreditCard } from "lucide-react";

const AccessCard = ({ hasAccess, paymentInfo, onBuyClick }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Course Access</h3>
      {hasAccess ? (
        <div className="flex items-center space-x-2 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span>Full Access Granted</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-yellow-400">
            <Lock className="w-5 h-5" />
            <span>Premium Content</span>
          </div>
          <div className="text-purple-200 text-sm">
            <p className="mb-2">Get unlimited access to:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>All course videos</li>
              <li>Downloadable resources</li>
              <li>Progress tracking</li>
              <li>Lifetime access</li>
            </ul>
          </div>
          <button
            onClick={onBuyClick}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:scale-105 transition-transform flex items-center justify-center space-x-2 font-semibold"
          >
            <CreditCard className="w-5 h-5" />
            <span>Buy Now - ${paymentInfo.price}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessCard;