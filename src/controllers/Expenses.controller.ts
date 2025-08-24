import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Expense } from "../data/models/Expense";
import { ExpenseCategory } from "../data/models/ExpenseCategory";
import { InferAttributes, Op, WhereOptions } from "sequelize";

function parseDate(value: unknown): Date | null {
  if (!value) return null;
  const date = new Date(value as string);
  return isNaN(date.getTime()) ? null : date;
}

export async function listExpenses(req: Request, res: Response) {
  const { startDate, endDate } = req.query;
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if ((startDate && !start) || (endDate && !end)) {
    return res
      .status(400)
      .json({ error: "Invalid date format. Use YYYY-MM-DD or ISO 8601." });
  }

  if (start && end && start > end) {
    return res
      .status(400)
      .json({ error: "startDate cannot be after endDate." });
  }

  const where: WhereOptions = { userId: req.user?.id };
  if (start && end) {
    where.date = { [Op.between]: [start, end] };
  } else if (start) {
    where.date = { [Op.eq]: start };
  } else if (end) {
    where.date = { [Op.eq]: end };
  }

  try {
    const expenses = await Expense.findAll({
      where,
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
          name: e.category?.name,
        },
      })),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
