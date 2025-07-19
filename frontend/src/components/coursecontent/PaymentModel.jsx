// ========================================
import React from "react";
import { CreditCard, Shield, CheckCircle } from "lucide-react";

const PaymentModal = ({ courseData, paymentInfo, loading, onPurchase, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full border border-white/10">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Purchase Course</h3>
          <p className="text-purple-200">{courseData.title}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <span className="text-white">Course Price</span>
            <span className="text-2xl font-bold text-white">${paymentInfo.price}</span>
          </div>

          <div className="text-sm text-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4" />
              <span>Secure payment processing</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span>Lifetime access to course</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>All future updates included</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onPurchase}
            disabled={loading}
            className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 font-semibold transition-all ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-green-600 hover:scale-105"
            } text-white`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Pay with Razorpay</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
