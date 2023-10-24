import { StatusCodes } from 'http-status-codes';
import PublicationModel from '../models/PublicationModel.js';

export const getAllPublications = async (req, res) => {
  const publications = await PublicationModel.find();
  res.status(StatusCodes.OK).json({ publications });
};

export const createPublication = async (req, res) => {
  let authors = [];
  for (const [idx, author] of req.body.authors.entries()) {
    authors.push({
      name: author,
      bold: req.body.bold[idx] === 'true' || false,
    });
  }

  let newPublicationData = {};
  for (const [key, value] of Object.entries(req.body)) {
    newPublicationData[key] = value[0];
  }
  newPublicationData.authors = authors;

  const newPublication = await PublicationModel.create(newPublicationData);

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'publication created', newPublication });
};

export const getPublication = async (req, res) => {
  const publication = await PublicationModel.findById(req.params.publicationId);
  res.status(StatusCodes.OK).json(publication);
};

export const deletePublication = async (req, res) => {
  const deletedPublication = await PublicationModel.findByIdAndDelete(
    req.params.publicationId
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Publication deleted', publication: deletedPublication });
};

export const updatePublication = async (req, res) => {
  let newPublicationData = {};
  for (const [key, value] of Object.entries(req.body)) {
    newPublicationData[key] = value[0];
  }

  if (req.body.authors) {
    let authors = [];
    for (const [idx, author] of req.body.authors.entries()) {
      authors.push({
        name: author,
        bold: req.body.bold[idx] === 'true' || false,
      });
    }
    newPublicationData.authors = authors;
  }

  const updatedPublication = await PublicationModel.findByIdAndUpdate(
    req.params.publicationId,
    newPublicationData,
    { new: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'publication updated', updatedPublication });
};
