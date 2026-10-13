import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    headline: { type: String, required: true },
    lede: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    summary: { type: String, required: true },
    yearsLabel: { type: String, required: true },
    focus: { type: [String], required: true },
  },
  { timestamps: true },
);

const experienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    current: { type: Boolean, default: false },
    points: { type: [String], required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true },
);

const skillSchema = new Schema(
  {
    category: { type: String, required: true },
    items: { type: [String], required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true },
);

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    summary: { type: String, required: true },
    highlights: { type: [String], required: true },
    stack: { type: [String], required: true },
    accent: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true },
);

const educationSchema = new Schema(
  {
    degree: { type: String, required: true },
    field: { type: String, required: true },
    school: { type: String, required: true },
    location: { type: String, required: true },
    year: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true },
);

const messageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, maxlength: 120 },
    subject: { type: String, trim: true, maxlength: 140, default: "" },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { timestamps: true },
);

export const Profile = mongoose.model("Profile", profileSchema);
export const Experience = mongoose.model("Experience", experienceSchema);
export const Skill = mongoose.model("Skill", skillSchema);
export const Project = mongoose.model("Project", projectSchema);
export const Education = mongoose.model("Education", educationSchema);
export const Message = mongoose.model("Message", messageSchema);
