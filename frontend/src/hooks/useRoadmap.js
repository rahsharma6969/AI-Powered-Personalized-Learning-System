// hooks/useRoadmap.js - Custom hook for roadmap data management
import { useState, useEffect } from "react";
import axios from "axios";

const useRoadmap = (user, activeTab) => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch roadmap data
  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const userId = user?.id;

      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:5001/api/generate-roadmap/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Roadmap response:", response.data);
      setRoadmap(response.data.roadmap);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      setError("Failed to load roadmap data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch roadmap data when roadmap tab is selected
  useEffect(() => {
    if (activeTab === "roadmap" && user?.id) {
      fetchRoadmap();
    }
  }, [activeTab, user?.id]);

  return {
    roadmap,
    loading,
    error,
    fetchRoadmap,
  };
};

export default useRoadmap;