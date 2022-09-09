import { body } from 'express-validator';
export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 6 символов').isLength({
    min: 6,
  }),
  body('fullName', 'Имя должно быть минимум 4 символа').isLength({ min: 4 }),
];

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 6 символов').isLength({
    min: 6,
  }),
];

export const postCreateValidation = [
  body('title', 'Введите загаловок').isLength({ min: 5 }).isString(),
  body('description', 'Введите описание картины')
    .isLength({
      min: 6,
    })
    .isString(),
  body('imgUrl', 'Неверная ссылка на изображение').isString(),
];
