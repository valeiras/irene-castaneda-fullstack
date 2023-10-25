import mongoose from 'mongoose';

import { STUDENT_TYPES } from '../utils/constants.js';

const TutoringSchema = new mongoose.Schema({
  students: { type: [String], required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
  studentType: {
    type: String,
    required: true,
    enum: Object.values(STUDENT_TYPES),
  },
});

export default mongoose.model('Tutoring', TutoringSchema);
