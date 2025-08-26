import { body, checkExact } from "express-validator";

export const validateRegister = [
  body("name").trim().notEmpty().withMessage("Name is empty."),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Value is not an email."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is empty.")
    .isStrongPassword()
    .withMessage("Password is not strong."),
  checkExact([], { message: "Only name, email and password are allowed." }),
];
