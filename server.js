import 'express-async-errors';
import express from 'express';
const app = express();

import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// routers
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import projectRouter from './routes/projectRouter.js';
import publicationRouter from './routes/publicationRouter.js';
import tutoringRouter from './routes/tutoringRouter.js';
import authorRouter from './routes/authorRouter.js';
import opportunityRouter from './routes/opportunityRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './client/dist')));
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/publications', publicationRouter);
app.use('/api/v1/tutorings', tutoringRouter);
app.use('/api/v1/authors', authorRouter);
app.use('/api/v1/opportunities', opportunityRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Listening on PORT  ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
