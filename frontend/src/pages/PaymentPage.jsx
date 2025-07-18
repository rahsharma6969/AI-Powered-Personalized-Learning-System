import React, { useState, useEffect } from 'react';
import { CreditCard, Shield, CheckCircle, ArrowLeft, AlertCircle, Lock, BookOpen, Star, Users, Clock } from 'lucide-react';

const PaymentPage = () => {
  const [courseData, setCourseData] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Extract courseId from URL (assuming URL like /payment/:courseId)
  const courseId = window.location.pathname.split('/payment/')[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch course data
        const courseResponse = await fetch(`http://localhost:5000/api/courses/${courseId}/videos`);
        if (!courseResponse.ok) {
          throw new Error('Failed to fetch course data');
        }
        const courseData = await courseResponse.json();
        
        // Fetch payment info
        const paymentResponse = await fetch(`http://localhost:5000/api/payment-info/${courseId}`);
        if (!paymentResponse.ok) {
          throw new Error('Failed to fetch payment info');
        }
        const paymentData = await paymentResponse.json();
        
        setCourseData(courseData);
        setPaymentInfo(paymentData);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchData();
    } else {
      setError('Course ID not found');
      setLoading(false);
    }
  }, [courseId]);

  const handlePayment = async () => {
    if (!courseData || !paymentInfo) return;
    
    try {
      setProcessing(true);
      
      // Create order
      const orderResponse = await fetch('http://localhost:5000/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          amount: paymentInfo.price * 100, // Convert to paise
          receipt: `course_${courseId}_${Date.now()}`,
          courseId: courseId
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const order = await orderResponse.json();
      
      // Initialize Razorpay
      const options = {
        key: 'rzp_test_your_key_here', // Replace with your actual Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: 'EduPlatform',
        description: `Purchase: ${courseData.title}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            const result = await verifyResponse.json();
            
            if (result.success) {
              // Payment successful - redirect to course
              alert('Payment successful! Redirecting to course...');
              window.location.href = `/course/${courseId}`;
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'Student Name', // Get from user data
          email: 'student@example.com', // Get from user data
          contact: '9999999999' // Get from user data
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-white text-xl font-bold mb-2">Payment Error</h2>
          <p className="text-purple-200 mb-4">{error}</p>
          <button 
            onClick={() => window.history.back()} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!courseData || !paymentInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg">No course data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Complete Your Purchase</h1>
              <p className="text-purple-200">Secure checkout powered by Razorpay</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Details */}
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Course Details</h2>
              
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{courseData.title}</h3>
                  <p className="text-purple-200 text-sm mb-2">by {courseData.instructor || 'Instructor'}</p>
                  <p className="text-purple-300 text-sm leading-relaxed">
                    {courseData.description || 'Comprehensive course content designed to help you master new skills.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="text-white font-semibold">{courseData.rating || 'N/A'}</div>
                  <div className="text-purple-200 text-sm">Rating</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-white font-semibold">{courseData.students?.toLocaleString() || 'N/A'}</div>
                  <div className="text-purple-200 text-sm">Students</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-white font-semibold">{courseData.duration || 'N/A'}</div>
                  <div className="text-purple-200 text-sm">Duration</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-white font-semibold">{courseData.level || 'N/A'}</div>
                  <div className="text-purple-200 text-sm">Level</div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h4 className="text-white font-semibold mb-3">What's Included:</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-200">Full lifetime access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-200">All course videos and materials</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-200">Progress tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-200">Mobile and desktop access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-200">Future updates included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">Payment Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-purple-200">Course Price</span>
                  <span className="text-white font-semibold">₹{paymentInfo.price}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-purple-200">Tax</span>
                  <span className="text-white font-semibold">₹0</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-white font-semibold text-lg">Total</span>
                  <span className="text-white font-bold text-2xl">₹{paymentInfo.price}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className={`w-full py-4 rounded-lg flex items-center justify-center space-x-2 font-semibold text-lg transition-all ${
                  processing 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:scale-105'
                } text-white`}
              >
                {processing ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-6 h-6" />
                    <span>Pay ₹{paymentInfo.price} with Razorpay</span>
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-purple-200 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Secured by Razorpay</span>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Payment Security</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium">SSL Encrypted</div>
                    <div className="text-purple-200 text-sm">Your payment details are secure</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">PCI DSS Compliant</div>
                    <div className="text-purple-200 text-sm">Industry standard security</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">Money Back Guarantee</div>
                    <div className="text-purple-200 text-sm">30-day refund policy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;