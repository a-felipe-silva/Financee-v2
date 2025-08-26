import { body, checkExact } from "express-validator";

export const validateExpenseChange = [
  body("description").optional().isString().isLength({ max: 300 }),
  body("amount")
    .optional()
    .isString()
    .matches(/^\d+(\.\d+)?$/)
    .withMessage("Amount must be a string of a numeric value."),
  body("date").optional().isISO8601().toDate().withMessage("Invalid date."),
  body("categoryId")
    .optional()
    .custom((value) => {
      if (value === null) return true;
      if (typeof value === "number" && Number.isInteger(value)) return true;

      return false;
    })
    .withMessage("CategoryId must be a valid integer or null."),
  checkExact([], {
    message: "Only description, amount, date and categoryId are allowed.",
  }),
];
