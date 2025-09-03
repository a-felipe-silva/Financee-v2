import express from "express";
import { requireAuth } from "../middlewares/requireAuth";
import {
  changeExpense,
  createExpense,
  deleteExpense,
  listCategories,
  listExpenses,
} from "../controllers/Expenses.controller";
import { validateExpenseCreation } from "../middlewares/validateExpenseCreation";
import { validateExpenseChange } from "../middlewares/validateExpenseChange";

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
const expensesRouter = express.Router();

/**
 * @openapi
 * /expenses/categories:
 *   get:
 *     summary: Get list of expense categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         nullable: true
 *                       name:
 *                         type: string
 *                         nullable: true
 *
 */
expensesRouter.route("/categories").get(requireAuth, listCategories);

/**
 * @openapi
 * /expenses:
 *   get:
 *     summary: Get all expenses for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                    type: integer
 *                   description:
 *                    type: string
 *                   amount:
 *                    type: string
 *                   date:
 *                    type: string
 *                    format: date-time
 *                   category:
 *                    type: object
 *                    properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                       nullable: true
 *   post:
 *     summary: Create a new expense
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - amount
 *               - date
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 amount:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                       nullable: true
 */
expensesRouter
  .route("/")
  .get(requireAuth, listExpenses)
  .post(requireAuth, validateExpenseCreation, createExpense);

/**
 * @openapi
 * /expenses/{id}:
 *   put:
 *     summary: Update an expense by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               categoryId:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 amount:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                       nullable: true
 *   delete:
 *     summary: Delete an expense by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Expense deleted successfully
 */
expensesRouter
  .route("/:id")
  .put(requireAuth, validateExpenseChange, changeExpense)
  .delete(requireAuth, deleteExpense);

export default expensesRouter;
