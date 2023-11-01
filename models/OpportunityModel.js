import mongoose from 'mongoose';

const OpportunitySchema = new mongoose.Schema({
  description: { type: String, required: true },
});

export default mongoose.model('Opportunity', OpportunitySchema);
