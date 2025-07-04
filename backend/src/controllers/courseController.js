import * as courseService from "../services/courseService.js";

export const createCourseController = async (req, res) => {
    try {
        // Prepare the course data with the uploaded file
        const courseData = {
            ...req.body,
            // Add the coverImage path if a file was uploaded
            coverImage: req.file ? `/uploads/${req.file.filename}` : null
        };
        
        console.log('File uploaded:', req.file?.filename);
        console.log('Course data:', courseData);
        
        const course = await courseService.createCourse(courseData);
        res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
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
