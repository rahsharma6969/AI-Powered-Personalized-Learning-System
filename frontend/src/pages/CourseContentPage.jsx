import React, { useState, useEffect } from "react";
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  Download,
  Share2,
  Heart,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Lock,
  CreditCard,
  Shield,
} from "lucide-react";


const CourseContentPage = () => {
  const [courseData, setCourseData] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSection, setExpandedSection] = useState(0);
  const [completedVideos, setCompletedVideos] = useState(new Set());
  const [hasAccess, setHasAccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Extract courseId from URL
  const courseId = window.location.pathname.split("/course/")[1];

  useEffect(() => {
  const fetchCourseData = async () => {
  try {
    setLoading(true);
    setError(null);

    console.log("Fetching course data for courseId:", courseId);

    // Fetch course details
    const courseResponse = await fetch(
      `http://localhost:5000/api/courses/${courseId}/details`
    );
    
    if (!courseResponse.ok) {
      const errorText = await courseResponse.text();
      throw new Error(`HTTP error! status: ${courseResponse.status} - ${errorText}`);
    }

    const courseData = await courseResponse.json();
    console.log("Course Details API Response:", courseData);

    // Fetch course videos
    const videosResponse = await fetch(
      `http://localhost:5000/api/courses/${courseId}/videos`
    );
    
    if (!videosResponse.ok) {
      const errorText = await videosResponse.text();
      console.error("Videos API Error:", errorText);
      // Don't throw error here - videos might not exist yet
    }

    let videosData = null;
    if (videosResponse.ok) {
      videosData = await videosResponse.json();
      console.log("Videos API Response:", videosData);
    }

    // Safely access the course data
    const data = courseData.data || courseData;

    if (!data) {
      throw new Error("Invalid course data structure");
    }

    // Transform course data with safe access
    const transformedData = {
      title: data.title || "Course Title",
      instructor: data.instructor?.name || data.instructor || "Instructor",
      description: data.description || "Course description will be available soon.",
      rating: data.rating || 0,
      students: data.enrollmentCount || data.students || 0,
      duration: data.totalDuration || data.duration || "N/A",
      level: data.level || "Beginner",
      sections: [], // Will be populated below
    };

    // Process videos if they exist
    if (videosData && videosData.videos && videosData.videos.length > 0) {
      transformedData.sections = [
        {
          title: "Course Videos",
          videos: videosData.videos.map((video, index) => ({
            id: video._id,
            title: video.title,
            duration: video.duration || "N/A",
            thumbnail: video.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
            url: video.url,
          })),
        },
      ];
    }

    // Set payment info from the course details
    const paymentData = {
      isFree: data.isFree || false,
      price: data.price || 0,
      currency: data.currency || "USD"
    };

    setCourseData(transformedData);
    setPaymentInfo(paymentData);

    // Check if user has access
    const userHasAccess = data.isFree || (await checkIfUserPurchased(courseId));
    setHasAccess(userHasAccess);

    // Set first video as selected if videos exist and user has access
    if (
      userHasAccess &&
      transformedData.sections &&
      transformedData.sections.length > 0 &&
      transformedData.sections[0].videos &&
      transformedData.sections[0].videos.length > 0
    ) {
      setSelectedVideo(transformedData.sections[0].videos[0]);
    }

  } catch (err) {
    console.error("Error fetching course data:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
    if (courseId) {
      fetchCourseData();
    } else {
      setError("Course ID not found in URL");
      setLoading(false);
    }
  }, [courseId]);

  // Check if user has purchased the course
  const checkIfUserPurchased = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/ap1/payments/user/purchases/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const { hasPurchased } = await response.json();
        return hasPurchased;
      }

      return false;
    } catch (error) {
      console.error("Error checking purchase status:", error);
      return false;
    }
  };

  // Function to dynamically load Razorpay script if not available
  // Simplified function to load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => {
        if (window.Razorpay) {
          resolve();
        } else {
          reject(new Error("Razorpay failed to initialize"));
        }
      };

      script.onerror = () => {
        reject(new Error("Failed to load Razorpay script"));
      };

      document.head.appendChild(script);
    });
  };

  // Fixed handlePurchase function with proper error handling and receipt formatting
  const handlePurchase = async () => {
    try {
      setLoading(true);

      // Create a shorter receipt string (max 40 characters)
      const receipt = `course_${courseId.slice(-8)}_${Date.now()
        .toString()
        .slice(-6)}`;

      console.log("Receipt length:", receipt.length); // Debug log

      // Create order on backend
      const orderResponse = await fetch(
        "http://localhost:5000/ap1/payments/create-order",
        {
          // Fixed: 'api' instead of 'ap1'
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            amount: paymentInfo.price * 100, // Convert to paise
            receipt: receipt, // Shortened receipt
            courseId: courseId,
          }),
        }
      );

      // Better error handling
      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        console.error("Order creation failed:", errorData);
        throw new Error(
          errorData.error?.description || "Failed to create order"
        );
      }

      const order = await orderResponse.json();

      // Initialize Razorpay
      const options = {
        key: "rzp_test_spBDRYjvb803nY", // Replace with your actual Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: "EduPlatform",
        description: `Purchase: ${courseData.title.slice(0, 30)}...`, // Truncate if too long
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch(
              "http://localhost:5000/ap1/payments/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  courseId: courseId,
                }),
              }
            );

            if (!verifyResponse.ok) {
              const errorText = await verifyResponse.text();
              console.error("Verification response:", errorText);
              throw new Error(
                `Payment verification failed: ${verifyResponse.status} - ${errorText}`
              );
            }

            const result = await verifyResponse.json();

            if (result.success) {
              // Payment successful
              setHasAccess(true);
              setShowPaymentModal(false);

              // Set first video as selected after purchase
              if (
                courseData?.sections &&
                courseData.sections.length > 0 &&
                courseData.sections[0].videos &&
                courseData.sections[0].videos.length > 0
              ) {
                setSelectedVideo(courseData.sections[0].videos[0]);
              }

              alert("Course purchased successfully!");
            } else {
              throw new Error(result.message || "Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert(`Payment verification failed: ${error.message}`);
          }
        },
        prefill: {
          name: "Student Name", // You can get this from user data
          email: "student@example.com", // You can get this from user data
          contact: "9999999999", // You can get this from user data
        },
        theme: {
          color: "#3B82F6",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      // Check if Razorpay is loaded with retry logic
      // Check if Razorpay is loaded with better retry logic
      try {
        await loadRazorpayScript();
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("Purchase error:", err);
        alert(`Purchase failed: ${err.message}`);
        setLoading(false);
      }
      // try {
      //   await checkRazorpay();
      // } catch (error) {
      //   throw error;
      // }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Purchase error:", err);
      alert(`Purchase failed: ${err.message}`);
      setLoading(false);
    }
  };

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;

    const regexes = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([^&\n?#]+)/,
      /(?:https?:\/\/)?youtu\.be\/([^&\n?#]+)/,
    ];

    for (const regex of regexes) {
      const match = url.match(regex);
      if (match) return match[1];
    }
    return null;
  };

  // Toggle video completion state
  const toggleVideoComplete = (videoId) => {
    if (!hasAccess) return;

    const newCompleted = new Set(completedVideos);
    if (newCompleted.has(videoId)) {
      newCompleted.delete(videoId);
    } else {
      newCompleted.add(videoId);
    }
    setCompletedVideos(newCompleted);
  };

  const totalVideos =
    courseData?.sections?.reduce(
      (acc, section) => acc + (section.videos?.length || 0),
      0
    ) || 0;
  const completedCount = completedVideos.size;
  const progress = totalVideos > 0 ? (completedCount / totalVideos) * 100 : 0;

  const hasVideos = courseData?.sections?.some(
    (section) => section.videos && section.videos.length > 0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-white text-xl font-bold mb-2">
            Error Loading Course
          </h2>
          <p className="text-purple-200 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform"
          >
            Try Again
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
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen size={24} className="text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-white">
                    {courseData.title || "Course Title"}
                  </h1>
                  {!paymentInfo.isFree && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      Premium
                    </span>
                  )}
                  {paymentInfo.isFree && (
                    <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Free
                    </span>
                  )}
                </div>
                <p className="text-purple-200">
                  by {courseData.instructor || "Instructor"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {!hasAccess && !paymentInfo.isFree && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform flex items-center space-x-2 font-semibold"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Buy Course - ${paymentInfo.price}</span>
                </button>
              )}
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player or Access Restricted */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 mb-8">
              {!hasAccess && !paymentInfo.isFree ? (
                // Locked content for paid courses
                <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Lock className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Premium Content
                    </h2>
                    <p className="text-purple-200 text-lg max-w-md mx-auto mb-6">
                      This course contains premium content. Purchase the course
                      to get full access to all videos and materials.
                    </p>
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform flex items-center space-x-2 font-semibold mx-auto"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Buy Course - ${paymentInfo.price}</span>
                    </button>
                  </div>
                </div>
              ) : hasVideos && selectedVideo ? (
                // Video content for accessible courses
                <>
                  <div className="aspect-video bg-gray-900 relative">
                    {getYouTubeVideoId(selectedVideo.url) ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                          selectedVideo.url
                        )}`}
                        title={selectedVideo.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                          <p className="text-white text-lg mb-2">
                            Video Preview
                          </p>
                          <a
                            href={selectedVideo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform"
                          >
                            Watch Video
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedVideo.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-purple-200">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedVideo.duration}</span>
                      </span>
                      <button
                        onClick={() => toggleVideoComplete(selectedVideo.id)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                          completedVideos.has(selectedVideo.id)
                            ? "bg-green-500 text-white"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>
                          {completedVideos.has(selectedVideo.id)
                            ? "Completed"
                            : "Mark Complete"}
                        </span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                // Coming soon for courses without videos
                <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Clock className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Coming Soon
                    </h2>
                    <p className="text-purple-200 text-lg max-w-md mx-auto">
                      Course videos are being prepared and will be available
                      soon. Stay tuned!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">
                About This Course
              </h3>
              <p className="text-purple-200 mb-6 leading-relaxed">
                {courseData.description ||
                  "Course description will be available soon."}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {courseData.rating || "N/A"}
                  </div>
                  <div className="text-purple-200 text-sm">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {courseData.students?.toLocaleString() || "N/A"}
                  </div>
                  <div className="text-purple-200 text-sm">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {courseData.duration || "N/A"}
                  </div>
                  <div className="text-purple-200 text-sm">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {courseData.level || "N/A"}
                  </div>
                  <div className="text-purple-200 text-sm">Level</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            {hasVideos && hasAccess && (
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Your Progress
                </h3>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-purple-200 mb-1">
                    <span>
                      {completedCount} of {totalVideos} completed
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Access Info for Paid Courses */}
            {!paymentInfo.isFree && (
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Course Access
                </h3>
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
                      onClick={() => setShowPaymentModal(true)}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:scale-105 transition-transform flex items-center justify-center space-x-2 font-semibold"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Buy Now - ${paymentInfo.price}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Course Content */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">
                  Course Content
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {courseData.sections && courseData.sections.length > 0 ? (
                  courseData.sections.map((section, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      className="border-b border-white/10 last:border-b-0"
                    >
                      <button
                        onClick={() =>
                          setExpandedSection(
                            expandedSection === sectionIndex ? -1 : sectionIndex
                          )
                        }
                        className="w-full px-6 py-4 text-left hover:bg-white/5 transition-colors flex items-center justify-between"
                      >
                        <span className="text-white font-medium">
                          {section.title}
                        </span>
                        {expandedSection === sectionIndex ? (
                          <ChevronUp className="w-5 h-5 text-purple-300" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-purple-300" />
                        )}
                      </button>
                      {expandedSection === sectionIndex && (
                        <div className="px-6 pb-4 space-y-2">
                          {section.videos && section.videos.length > 0 ? (
                            section.videos.map((video) => (
                              <button
                                key={video.id}
                                onClick={() =>
                                  hasAccess && setSelectedVideo(video)
                                }
                                className={`w-full p-3 rounded-lg text-left transition-all relative ${
                                  hasAccess
                                    ? selectedVideo?.id === video.id
                                      ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/50"
                                      : "hover:bg-white/5"
                                    : "opacity-60 cursor-not-allowed"
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="relative">
                                    <img
                                      src={
                                        video.thumbnail ||
                                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop"
                                      }
                                      alt={video.title}
                                      className="w-12 h-8 object-cover rounded"
                                    />
                                    {!hasAccess && !paymentInfo.isFree && (
                                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                                        <Lock className="w-3 h-3 text-white" />
                                      </div>
                                    )}
                                    {hasAccess &&
                                      completedVideos.has(video.id) && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                          <CheckCircle className="w-3 h-3 text-white" />
                                        </div>
                                      )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-white text-sm font-medium flex items-center space-x-2">
                                      <span>{video.title}</span>
                                      {!hasAccess && !paymentInfo.isFree && (
                                        <Lock className="w-3 h-3 text-yellow-400" />
                                      )}
                                    </div>
                                    <div className="text-purple-300 text-xs">
                                      {video.duration}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="text-center py-6">
                              <Clock className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                              <p className="text-purple-300 text-sm">
                                Videos coming soon
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                    <p className="text-purple-300">
                      Course content coming soon
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full border border-white/10">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Purchase Course
              </h3>
              <p className="text-purple-200">{courseData.title}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white">Course Price</span>
                <span className="text-2xl font-bold text-white">
                  ${paymentInfo.price}
                </span>
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
                onClick={handlePurchase}
                disabled={loading}
                className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 font-semibold transition-all ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:scale-105"
                } text-white`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
                onClick={() => setShowPaymentModal(false)}
                className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentPage;
