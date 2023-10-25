import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: false },
  highlighted: { type: Boolean, default: false },
});

export default mongoose.model('Author', AuthorSchema);
