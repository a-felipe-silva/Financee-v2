import express from "express";
import { requireAuth } from "../middlewares/requireAuth";
import {
  changeExpense,
  createExpense,
  listCategories,
  listExpenses,
} from "../controllers/Expenses.controller";
import { validateExpenseCreation } from "../middlewares/validateExpenseCreation";
import { validateExpenseChange } from "../middlewares/validateExpenseChange";

const expensesRouter = express.Router();

expensesRouter.route("/categories").get(requireAuth, listCategories);

expensesRouter
  .route("/")
  .get(requireAuth, listExpenses)
  .post(requireAuth, validateExpenseCreation, createExpense);

expensesRouter
  .route("/:id")
  .put(requireAuth, validateExpenseChange, changeExpense);

export default expensesRouter;
