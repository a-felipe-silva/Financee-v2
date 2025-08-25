import { body, checkExact } from "express-validator";

export const validateExpenseCreation = [
  body("description").isString().isLength({ max: 300 }),
  body("amount")
    .isString()
    .matches(/^\d+(\.\d+)?$/)
    .withMessage("Amount must be a string of a numeric value."),
  body("date").isISO8601().toDate().withMessage("Invalid date."),
  body("categoryId")
    .optional()
    .isInt({ allow_leading_zeroes: false })
    .withMessage("CategoryId must be a valid integer."),
  checkExact([], {
    message: "Only description, amount, date and categoryId are allowed.",
  }),
];
