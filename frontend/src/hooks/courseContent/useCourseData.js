import { useState, useEffect } from 'react';

const useCourseData = (courseId) => {
  const [courseData, setCourseData] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);

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
  id: data._id || data.id, // 👈 Add this line
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

  return {
    courseData,
    paymentInfo,
    loading,
    error,
    hasAccess,
    setHasAccess,
    checkIfUserPurchased
  };
};

export default useCourseData;