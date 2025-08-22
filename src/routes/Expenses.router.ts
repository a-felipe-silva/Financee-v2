import express from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { listExpenses } from "../controllers/Expenses.controller";

const expensesRouter = express.Router();

/**
 * @openapi
 * /auth:
 *  get:
 *    description: Test the authentication.
 *    responses:
 *      200:
 *        description: User is authenticated.
 */
expensesRouter.route("/").get(requireAuth, listExpenses);

export default expensesRouter;
