import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { Expense } from "../data/models/Expense";
import { ExpenseCategory } from "../data/models/ExpenseCategory";
import { Op, WhereOptions } from "sequelize";

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

export async function createExpense(req: Request, res: Response) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const data = matchedData(req);

  if (!req.user) {
    res.status(401).json({ error: "User is not authenticated." });
    return;
  }

  try {
    const newExpense = await Expense.create({
      description: data.description,
      amount: data.amount,
      date: data.date,
      categoryId: data?.categoryId,
      userId: req.user.id,
    });

    res.status(201).json({
      id: newExpense.id,
      description: newExpense.description,
      amount: newExpense.amount,
      date: newExpense.date,
      categoryId: newExpense.categoryId,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function changeExpense(req: Request, res: Response) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const data = matchedData(req);

  try {
    const expenseId = req.params.id;

    const expense = await Expense.findOne({ where: { id: expenseId } });

    if (!expense) {
      res.status(404).json({ error: "Expense does not exist." });
      return;
    }

    if (data.description) expense.description = data.description;

    if (data.amount) expense.amount = data.amount;

    if (data.date) expense.date = data.date;

    if (data.categoryId !== undefined) expense.categoryId = data.categoryId;

    console.log(data.categoryId);

    await expense.save();

    res.status(200).json({
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      categoryId: expense.categoryId,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteExpense(req: Request, res: Response) {
  try {
    const expenseId = req.params.id;

    const expense = await Expense.findOne({ where: { id: expenseId } });

    if (!expense) {
      res.status(404).json({ error: "Expense does not exist." });
      return;
    }

    await expense.destroy();

    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function listCategories(req: Request, res: Response) {
  try {
    const categories = await ExpenseCategory.findAll({
      where: {
        userId: req.user?.id,
      },
    });

    res.status(200).json(
      categories.map((c) => ({
        id: c.id,
        name: c.name,
      }))
    );
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
