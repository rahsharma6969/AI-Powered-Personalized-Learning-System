import mongoose from "mongoose";
import Video from "./VideoModel.js";

const courseSchema = new mongoose.Schema({
    // Basic Information
    title: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, maxlength: 200 }, // For previews/cards
    
    // Course Structure
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    totalVideos: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 }, // in minutes
    
    // Pricing & Access
    isFree: { type: Boolean, default: true },
    price: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    discountPrice: { type: Number },
    
    // Course Metadata
    level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'], // add all allowed levels here
    required: true
   },

    language: { type: String, default: 'English' },
   
    subcategory: { type: String },
    tags: [{ type: String }],
    
    // Media
    coverImage: { type: String },
    previewVideo: { type: String }, // Trailer/preview video URL
    
    // Instructor Information
    instructor: {
        name: { type: String, required: true },
        bio: { type: String },
        avatar: { type: String },
        socialLinks: {
            website: { type: String },
            twitter: { type: String },
            linkedin: { type: String }
        }
    },
    
    // Learning Outcomes
    learningOutcomes: [{ type: String }], // What students will learn
    prerequisites: [{ type: String }], // What students should know beforehand
    targetAudience: [{ type: String }], // Who this course is for
    
    // Course Status & Publishing
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    publishedAt: { type: Date },
    lastUpdated: { type: Date, default: Date.now },
    
    // Engagement & Analytics
    enrollmentCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    
    // Course Content Organization
    chapters: [{
        title: { type: String, required: true },
        description: { type: String },
        videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
        order: { type: Number, required: true }
    }],
    
    // Additional Resources
    resources: [{
        title: { type: String, required: true },
        type: { type: String, enum: ['pdf', 'link', 'file', 'quiz'] },
        url: { type: String },
        description: { type: String }
    }],
    
    // Course Settings
    settings: {
        allowComments: { type: Boolean, default: true },
        allowDownloads: { type: Boolean, default: false },
        certificateEnabled: { type: Boolean, default: false },
        autoPlay: { type: Boolean, default: false }
    },
    
    // SEO & Marketing
    slug: { type: String, unique: true, required: true },
    metaDescription: { type: String, maxlength: 160 },
    metaKeywords: [{ type: String }],
    
    // Completion & Progress
    completionCriteria: {
        type: String,
        enum: ['all_videos', 'percentage', 'quiz_passed'],
        default: 'all_videos'
    },
    completionPercentage: { type: Number, default: 100 }, // Required % to complete
    
    // Reviews (or reference to Review model)
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true // This automatically adds createdAt and updatedAt
});

// Indexes for better performance
// courseSchema.index({ category: 1, level: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ status: 1, publishedAt: -1 });
courseSchema.index({ slug: 1 });
courseSchema.index({ tags: 1 });

// Virtual for average rating calculation
courseSchema.virtual('averageRating').get(function() {
    return this.reviewCount > 0 ? (this.rating / this.reviewCount) : 0;
});

// Pre-save middleware to update slug and timestamps
courseSchema.pre('save', function(next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    }
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model("Course", courseSchema);


