import courseRepository from "../repository/courseRepository.js";

export const createCourse = async (data) => {
    return await courseRepository.create(data);
};

export const getAllCourses = async () => {
    const courses = await courseRepository.getAllCourses();
    return courses;
  }

export const getCourseById = async (courseId) => {
    return await courseRepository.getDetailCourse(courseId);
};

export const updateCourse = async (courseId, updateData) => {
    return await courseRepository.update(courseId, updateData);
};

export const deleteCourse = async (courseId) => {
    return await courseRepository.delete(courseId);
};


export const fetchCourseVideos = async (courseId) => {
    const course = await courseRepository.getCourseWithVideos(courseId);
    if (!course) {
        const error = new Error('Course not found');
        error.status = 404;
        throw error;
    }
    return course.videos;
};

export const getCourseDetailsExceptVideo = async (courseId) => {
    // Validate course ID format
    if (!isValidObjectId(courseId)) {
      throw new Error('Invalid course ID format');
    }

    const course = await courseRepository.findById(courseId);
    
    if (!course) {
      throw new Error('Course not found');
    }

    return course;
}

function isValidObjectId(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
}


// services/courseService.js


export const getCoursePaymentDetails = async (courseId) => {
    if (!courseId) {
        throw new Error("Course ID is required.");
    }

    const course = await courseRepository.findCourseById(courseId);

    if (!course) {
        const error = new Error("Course not found.");
        error.statusCode = 404;
        throw error;
    }

    return {
        courseId: course._id,
        title: course.title,
        isFree: course.isFree,
        ...(course.isFree ? {} : { price: course.price || 0 })
    };
};
