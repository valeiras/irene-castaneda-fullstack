import mongoose from 'mongoose';

import { PUBLICATION_TYPES } from '../utils/constants.js';

const PublicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  authors: { type: [mongoose.Types.ObjectId], ref: 'Author', required: true },
  publishedIn: { type: String, required: true },
  pages: { type: String, required: false },
  link: { type: String, required: false },
  publicationType: {
    type: String,
    required: true,
    enum: Object.values(PUBLICATION_TYPES),
  },
});

export default mongoose.model('Publication', PublicationSchema);
