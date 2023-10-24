import 'express-async-errors';
import express from 'express';
const app = express();

import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

// routers
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import adminRouter from './routes/adminRouter.js';
import projectRouter from './routes/projectRouter.js';
import publicationRouter from './routes/publicationRouter.js';

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

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/admin', authenticateUser, adminRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/publications', publicationRouter);

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
