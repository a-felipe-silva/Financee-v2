import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Expense } from "../data/models/Expense";
import { ExpenseCategory } from "../data/models/ExpenseCategory";

export async function listExpenses(req: Request, res: Response) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const expenses = await Expense.findAll({
    where: {
      userId: req.user?.id,
    },
    include: [ExpenseCategory],
  });

  res.status(200).json({
    expenses: expenses.map((e) => ({
      id: e.id,
      description: e.description,
      amount: e.amount,
      date: e.date,
      category: {
        id: e.categoryId,
        name: e.category.name,
      },
    })),
  });
}
