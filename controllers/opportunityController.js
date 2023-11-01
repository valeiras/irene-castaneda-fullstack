import { StatusCodes } from 'http-status-codes';
import OpportunityModel from '../models/OpportunityModel.js';

export const getAllOpportunities = async (req, res) => {
  const opportunities = await OpportunityModel.find();
  res.status(StatusCodes.OK).json({ opportunities });
};

export const createOpportunity = async (req, res) => {
  let newOpportunityData = {};
  for (const [key, value] of Object.entries(req.body)) {
    newOpportunityData[key] = value[0];
  }

  const newOpportunity = await OpportunityModel.create(newOpportunityData);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Opportunity created', newOpportunity });
};

export const getOpportunity = async (req, res) => {
  const opportunity = await OpportunityModel.findById(req.params.opportunityId);
  res.status(StatusCodes.OK).json(opportunity);
};

export const deleteOpportunity = async (req, res) => {
  const deletedOpportunity = await OpportunityModel.findByIdAndDelete(
    req.params.opportunityId
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Opportunity deleted', Opportunity: deletedOpportunity });
};

export const updateOpportunity = async (req, res) => {
  let newOpportunityData = {};
  for (const [key, value] of Object.entries(req.body)) {
    newOpportunityData[key] = value[0];
  }

  console.log(req.params.opportunityId);
  const updatedOpportunity = await OpportunityModel.findByIdAndUpdate(
    req.params.opportunityId,
    newOpportunityData,
    { new: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Opportunity updated', updatedOpportunity });
};
