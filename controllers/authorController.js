import { StatusCodes } from 'http-status-codes';
import AuthorModel from '../models/AuthorModel.js';

export const getAllAuthors = async (req, res) => {
  const authors = await AuthorModel.find().sort({ name: 1 });
  res.status(StatusCodes.OK).json({ authors });
};

export const createAuthor = async (req, res) => {
  let newAuthorData = {};
  for (const [key, value] of Object.entries(req.body)) {
    if (key === 'highlighted') {
      newAuthorData[key] = true;
    } else {
      newAuthorData[key] = value[0];
    }
  }

  const newAuthor = await AuthorModel.create(newAuthorData);
  res.status(StatusCodes.CREATED).json({ msg: 'Author created', newAuthor });
};

export const getAuthor = async (req, res) => {
  const author = await AuthorModel.findById(req.params.authorId);
  res.status(StatusCodes.OK).json(author);
};

export const deleteAuthor = async (req, res) => {
  const deletedAuthor = await AuthorModel.findByIdAndDelete(
    req.params.authorId
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Author deleted', Author: deletedAuthor });
};

export const updateAuthor = async (req, res) => {
  let newAuthorData = {};
  for (const [key, value] of Object.entries(req.body)) {
    newAuthorData[key] = value[0];
  }

  const updatedAuthor = await AuthorModel.findByIdAndUpdate(
    req.params.authorId,
    newAuthorData,
    { new: true }
  );
  res.status(StatusCodes.OK).json({ msg: 'Author updated', updatedAuthor });
};
