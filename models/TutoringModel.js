import mongoose from 'mongoose';

import { TUTORING_TYPES } from '../utils/constants.js';

const TutoringSchema = new mongoose.Schema({
  students: { type: String, required: false },
  year: { type: String, required: true },
  description: { type: String, required: true },
  tutoringType: {
    type: String,
    required: true,
    enum: Object.values(TUTORING_TYPES),
  },
});

export default mongoose.model('Tutoring', TutoringSchema);
