import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  cloudinaryUrl: String,
  cloudinaryId: String,
});

export default mongoose.model('Project', ProjectSchema);
