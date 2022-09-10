import express from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import multer from 'multer';

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from '../back/validation.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';

import { UserController, PostController } from './controllers/index.js';
mongoose
  .connect(
    process.env.MONGODB_URI ||
      'mongodb+srv://Alex:FriECoaSt123@cluster0.4vc4zoy.mongodb.net/artGallery?authSource=admin&replicaSet=atlas-jzny0p-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
  )
  .then(() => {
    console.log('DB ok');
  })
  .catch((err) => console.log('DB  ne ok', err));

const app = express();

// const storage = multer.diskStorage({
//   destination: (__, _, cb) => {
//     cb(null, 'uploads');
//   },
//   filename: (_, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

import cors from 'cors';
app.use(express.json());

app.use(cors());

app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  registerValidation,
  PostController.create
);
app.get('/posts/:id', PostController.getOnePost);
app.get('/posts', PostController.getAll);
app.delete('/posts/:id', checkAuth, PostController.removePost);
app.patch(
  '/posts/:id',
  checkAuth,
  registerValidation,
  PostController.updatePost
);

app.listen(process.env.PORT || 4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server ok!)');
});
