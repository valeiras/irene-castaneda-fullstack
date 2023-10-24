import mongoose from 'mongoose';

const PublicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  authors: { type: [{ name: String, bold: Boolean }], required: true },
  publishedIn: { type: String, required: true },
  pages: { type: String, required: false },
  link: { type: String, required: false },
});

export default mongoose.model('Publication', PublicationSchema);
