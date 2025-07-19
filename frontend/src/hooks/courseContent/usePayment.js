// usePayment.js
import { useState } from "react";
import axios from "axios";

const usePayment = (input = {}) => {
  const [loading, setLoading] = useState(false);

  const course = input?.course;

  const handlePurchase = async () => {
    console.log("🧾 Purchase button clicked");

    // if (!course || !course._id || !course.title || !course.price) {
    //   console.error("❌ Purchase error: Course data is incomplete");
    //   return;
    // }
    console.log("📦 Received course:", course);
console.log("🔍 course._id:", course?._id);
console.log("🔍 course.title:", course?.title);
console.log("🔍 course.price:", course?.price);


    try {
      setLoading(true);

      console.log("✅ course._id:", course._id);
      console.log("✅ course.price:", course.price);
      console.log("✅ course.title:", course.title);
      console.log("==============");

      // Step 1: Create order on backend
      const { data: orderData } = await axios.post("/api/payment/create-order", {
        courseId: course._id,
      });

      const { amount, id: order_id, currency } = orderData.order;

      // Step 2: Open Razorpay payment modal
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount,
        currency,
        name: course.title,
        description: "Course Purchase",
        order_id,
        handler: async (response) => {
          // Step 3: Verify payment on backend
          const verification = await axios.post("/api/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courseId: course._id,
          });

          console.log("✅ Payment verified:", verification.data);
        },
        prefill: {
          name: "Student",
          email: "student@example.com",
        },
        theme: {
          color: "#22c55e",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("❌ Purchase error:", error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  return { handlePurchase, loading };
};

export default usePayment;
