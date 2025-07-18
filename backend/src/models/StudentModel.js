import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true }, 
    password: { type: String, required: true },
    school:{type: String },
    phone:{ type: String },
    standard: { type: String },
    assessments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assessment" }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }],
    subjectPerformance: {  
        Physics: { type: Number, default: 0 },  
        Chemistry: { type: Number, default: 0 },  
        Maths: { type: Number, default: 0 }
    }
});

// Hash password before saving
studentSchema.pre('save', function saveUser(next) {
    if (this.isNew) {
        const user = this;
        const SALT = bcrypt.genSaltSync(9);
        user.password = bcrypt.hashSync(user.password, SALT);
    }
    next();
});

export default mongoose.model("Student", studentSchema);
