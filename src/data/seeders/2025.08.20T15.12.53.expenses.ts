import { QueryTypes } from "sequelize";
import { Seeder } from "../../seeder";

const emails = [
  "alice.johnson@example.com",
  "bob.smith@example.com",
  "carla.mendes@example.com",
  "daniel.oliveira@example.com",
  "emily.thompson@example.com",
];

export const up: Seeder = async ({ context }) => {
  const queryInterface = context.getQueryInterface();

  const usersResult = await queryInterface.sequelize.query(
    `SELECT id, email FROM users WHERE email in (:emails)`,
    {
      type: QueryTypes.SELECT,
      replacements: { emails: emails },
    }
  );

  if (!usersResult || usersResult.length < emails.length) {
    throw Error("Run users seeders first before expense seeders.");
  }

  const users = (usersResult as any[]).map((u) => ({
    id: u.id,
    email: u.email,
  }));

  const categories = [
    { name: "Groceries" },
    { name: "Transportation" },
    { name: "Restaurants" },
    { name: "Utilities" },
    { name: "Entertainment" },
  ];

  const categoryRows = users.flatMap(({ id }) => {
    return categories.map(({ name }) => ({
      userId: id,
      name: name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  });

  queryInterface.bulkInsert("expense_category", categoryRows);

  const userIds = users.map(({ id }) => id);

  const insertedCategories = await queryInterface.sequelize.query(
    `SELECT id, "userId", name FROM expense_category WHERE "userId" IN (:userIds)`,
    {
      type: QueryTypes.SELECT,
      replacements: { userIds: userIds },
    }
  );

  function getCategoryId(userId: string, name: string) {
    const category = (insertedCategories as any[]).find(
      (c) => c.userId === userId && c.name === name
    );

    if (!category) {
      throw Error(`Category ${name} was not seeded.`);
    }

    return category.id;
  }

  const expenses = users.flatMap(({ id }) => {
    return [
      {
        userId: id,
        category: "Groceries",
        description: "Weekly grocery shopping",
        amount: "95.00",
        date: "2025-08-01",
      },
      {
        userId: id,
        category: "Transportation",
        description: "Train tickets",
        amount: "30.00",
        date: "2025-08-03",
      },
      {
        userId: id,
        category: "Restaurants",
        description: "Brunch with family",
        amount: "48.00",
        date: "2025-08-04",
      },
      {
        userId: id,
        category: "Utilities",
        description: "Water bill",
        amount: "25.00",
        date: "2025-08-05",
      },
      {
        userId: id,
        category: "Entertainment",
        description: "Streaming subscription",
        amount: "15.99",
        date: "2025-08-06",
      },
    ];
  });

  await queryInterface.bulkInsert(
    "expense",
    expenses.map((e) => ({
      id: crypto.randomUUID(),
      userId: e.userId,
      categoryId: getCategoryId(e.userId, e.category),
      description: e.description,
      amount: e.amount,
      date: new Date(e.date),
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
  );
};

export const down: Seeder = async ({ context }) => {
  const queryInterface = context.getQueryInterface();

  const usersResult = await queryInterface.sequelize.query(
    `SELECT id, email FROM users WHERE email in (:emails)`,
    {
      type: QueryTypes.SELECT,
      replacements: { emails: emails },
    }
  );

  if (!usersResult || usersResult.length < emails.length) {
    throw Error("Run users seeders first before expense seeders.");
  }

  const userIds = (usersResult as any[]).map((u) => u.id);

  await queryInterface.bulkDelete("expense", { userId: userIds });
  await queryInterface.bulkDelete("expense_category", { userId: userIds });
};
