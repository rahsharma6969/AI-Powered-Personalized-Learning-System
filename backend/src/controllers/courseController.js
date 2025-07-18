import { log } from "console";
import * as courseService from "../services/courseService.js";

export const createCourseController = async (req, res) => {
    try {
        // Debug logging
        console.log('=== DEBUG INFO ===');
        console.log('File received:', req.file);
        console.log('Request body:', req.body);
        console.log('Content-Type:', req.headers['content-type']);
        
        // Check if file was uploaded
        if (!req.file) {
            console.log('❌ No file uploaded');
        } else {
            console.log('✅ File uploaded:', req.file.filename);
            console.log('File path:', req.file.path);
            console.log('File size:', req.file.size);
        }
        
        // Prepare the course data with the uploaded file
        const courseData = {
            title: req.body.title,
            description: req.body.description,
            shortDescription: req.body.shortDescription,
            slug: req.body.slug,
            tags: req.body.tags ? JSON.parse(req.body.tags) : [], // Parse if string
            isFree: req.body.isFree === 'true' || req.body.isFree === true,
            price: req.body.price ? parseFloat(req.body.price) : 0,
            level: req.body.level,
            language: req.body.language,
            status: req.body.status,
            instructor: req.body.instructor ? JSON.parse(req.body.instructor) : null,
            // Add the coverImage path if a file was uploaded
            coverImage: req.file ? `/uploads/${req.file.filename}` : null
        };
        
        console.log('Processed course data:', courseData);
        
        // Validate required fields
        if (!courseData.title || !courseData.description) {
            return res.status(400).json({ 
                error: 'Title and description are required' 
            });
        }
        
        const course = await courseService.createCourse(courseData);
        
        console.log('✅ Course created successfully:', course);
        
        res.status(201).json({ 
            message: "Course created successfully", 
            course 
        });
        
    } catch (error) {
        console.error('❌ Error creating course:', error);
        res.status(400).json({ error: error.message });
    }
};


export const getAllCourses =  async (req, res) => {
    try {
      const courses = await courseService.getAllCourses();
      res.status(200).json({ success: true, data: courses });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

export const getCourseById = async (req, res) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        await courseService.deleteCourse(req.params.id);
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getCourseVideos = async (req, res) => {
    try {
        const { courseId } = req.params;
        const videos = await courseService.fetchCourseVideos(courseId);
        res.status(200).json({ success: true, videos });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Server Error',
        });
    }
};



export const getCourseByIdExpectVideoController = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Fetching course details for ID:", id);
      
      const course = await courseService.getCourseById(id);
      console.log("Course details fetched:", course);

      res.status(200).json({
        success: true,
        data: course
      });
    } catch (error) {
      handleError(res, error);
    }
};

function handleError(res, error) {
  if (error.message === 'Course not found') {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }

  if (error.message === 'Invalid course ID format') {
    return res.status(400).json({
      success: false,
      message: 'Invalid course ID format'
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
}
export const getCoursePaymentInfo = async (req, res) => {
    const { courseId } = req.params;

    try {
        const result = await courseService.getCoursePaymentDetails(courseId);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching course payment info:", error.message);

        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message });
    }
};