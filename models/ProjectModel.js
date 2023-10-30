import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    cloudinaryUrl: String,
    cloudinaryId: String,
  },
  { timestamps: true }
);

export default mongoose.model('Project', ProjectSchema);
