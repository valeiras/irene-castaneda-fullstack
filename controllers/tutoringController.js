import { StatusCodes } from 'http-status-codes';
import TutoringModel from '../models/TutoringModel.js';
import { TUTORING_TYPES, typesToLabels } from '../utils/constants.js';

export const getAllTutorings = async (req, res) => {
  const tutorings = await TutoringModel.find();
  res.status(StatusCodes.OK).json({ tutorings });
};

export const createTutoring = async (req, res) => {
  let newTutoringData = {};
  for (const [key, value] of Object.entries(req.body)) {
    newTutoringData[key] = value[0];
  }

  const newTutoring = await TutoringModel.create(newTutoringData);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Tutoring created', newTutoring });
};

export const getTutoring = async (req, res) => {
  const tutoring = await TutoringModel.findById(req.params.tutoringId);
  res.status(StatusCodes.OK).json(tutoring);
};

export const deleteTutoring = async (req, res) => {
  const deletedTutoring = await TutoringModel.findByIdAndDelete(
    req.params.tutoringId
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Tutoring deleted', Tutoring: deletedTutoring });
};

export const updateTutoring = async (req, res) => {
  let newTutoringData = {};
  for (const [key, value] of Object.entries(req.body)) {
    newTutoringData[key] = value[0];
  }

  const updatedTutoring = await TutoringModel.findByIdAndUpdate(
    req.params.tutoringId,
    newTutoringData,
    { new: true }
  );
  res.status(StatusCodes.OK).json({ msg: 'Tutoring updated', updatedTutoring });
};

export const getTutoringTypes = (req, res) => {
  const tutoringTypes = Object.values(TUTORING_TYPES).map((type) => {
    return { type, label: typesToLabels[type] };
  });
  res.status(StatusCodes.OK).json({ tutoringTypes });
};
