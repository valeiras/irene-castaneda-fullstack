import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/customErrors.js';
import mongoose from 'mongoose';
import UserModel from '../models/UserModel.js';
import ProjectModel from '../models/ProjectModel.js';
import PublicationModel from '../models/PublicationModel.js';
import TutoringModel from '../models/TutoringModel.js';
import AuthorModel from '../models/AuthorModel.js';
import { PUBLICATION_TYPES, STUDENT_TYPES } from '../utils/constants.js';

const withValidationErrors = (validateValues) => {
  return [
    ...validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('no project')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthenticatedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().trim().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('please provide valid email')
    .custom(async (email) => {
      const previousUser = await UserModel.findOne({ email });
      if (previousUser)
        throw Error('the email is already registered in the database');
    })
    .trim(),
  body('password')
    .isLength({ min: 8, max: 12 })
    .withMessage('password should be between 8 and 12 characters long')
    .notEmpty()
    .withMessage('password is required'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('please provide a valid email')
    .trim(),
  body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required').trim(),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('please provide valid email')
    .custom(async (email, { req }) => {
      const previousUser = await UserModel.findOne({ email });
      if (previousUser && previousUser._id.toString() !== req.user.userId)
        throw Error('the email is already registered in the database');
    })
    .trim(),
]);

export const validateProjectInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required').trim(),
  body('description').notEmpty().withMessage('description is required').trim(),
  body('imageFile').notEmpty().withMessage('image file is required'),
]);

export const validatePublicationInput = withValidationErrors([
  body('title').notEmpty().withMessage('title is required').trim(),
  body('year').notEmpty().withMessage('year is required'),
  body('authorIds')
    .notEmpty()
    .withMessage('authorIds are required')
    .custom(async (authors) => {
      let areValidAuthorIds = true;
      for (const authorId of authors) {
        const isValidId = mongoose.Types.ObjectId.isValid(authorId);
        if (!isValidId) {
          areValidAuthorIds = false;
          break;
        }
        const author = await AuthorModel.findById(authorId);
        if (!author) {
          areValidAuthorIds = false;
          break;
        }
      }

      if (!areValidAuthorIds)
        throw Error('Some or all of the author IDs are not correct');
    }),
  body('publicationType')
    .notEmpty()
    .withMessage('publication type is required')
    .isIn(Object.values(PUBLICATION_TYPES))
    .withMessage('Invalid publication type'),

  body('journal').notEmpty().withMessage('journal is required'),
]);

export const validateTutoringInput = withValidationErrors([
  body('students').notEmpty().withMessage('students are required').trim(),
  body('year').notEmpty().withMessage('year is required'),
  body('description').notEmpty().withMessage('description is required'),
  body('studentType')
    .notEmpty()
    .withMessage('student type is required')
    .isIn(Object.values(STUDENT_TYPES))
    .withMessage('Invalid student type'),
]);

export const validateAuthorInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required').trim(),
]);

const validateIdParam = (paramName, ObjectModel) => {
  return withValidationErrors([
    param(paramName).custom(async (value, { req }) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidId) throw Error('invalid mongoDB id');

      const project = await ObjectModel.findById(value);
      if (!project) throw Error(`no entry with id ${value}`);
    }),
  ]);
};

export const validateProjectIdParam = validateIdParam(
  'projectId',
  ProjectModel
);

export const validatePublicationIdParam = validateIdParam(
  'publicationId',
  PublicationModel
);

export const validateTutoringIdParam = validateIdParam(
  'tutoringId',
  TutoringModel
);

export const validateAuthorIdParam = validateIdParam('authorId', AuthorModel);
