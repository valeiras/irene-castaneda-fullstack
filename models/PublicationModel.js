import mongoose, { Types } from 'mongoose';

import { PUBLICATION_TYPES } from '../utils/constants.js';

const PublicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  authorIds: { type: [mongoose.Types.ObjectId], ref: 'Author', required: true },
  journal: { type: String, required: true },
  pages: { type: String, required: false },
  link: { type: String, required: false },
  publicationType: {
    type: String,
    required: true,
    enum: Object.values(PUBLICATION_TYPES),
  },
});

export default mongoose.model('Publication', PublicationSchema);
