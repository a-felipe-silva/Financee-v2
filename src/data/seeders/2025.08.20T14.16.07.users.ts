import { Sequelize } from "sequelize";
import { Seeder } from "../../seeder";
import bcrypt from "bcrypt";

const users = [
  { name: "Alice Johnson", email: "alice.johnson@example.com" },
  { name: "Bob Smith", email: "bob.smith@example.com" },
  { name: "Carla Mendes", email: "carla.mendes@example.com" },
  { name: "Daniel Oliveira", email: "daniel.oliveira@example.com" },
  { name: "Emily Thompson", email: "emily.thompson@example.com" },
  { name: "Felipe Costa", email: "felipe.costa@example.com" },
  { name: "Grace Lee", email: "grace.lee@example.com" },
  { name: "Hugo Martins", email: "hugo.martins@example.com" },
  { name: "Isabella Rossi", email: "isabella.rossi@example.com" },
  { name: "Jack Wilson", email: "jack.wilson@example.com" },
];

export const up: Seeder = async (params: { context: Sequelize }) => {
  const password = await bcrypt.hash("Password@123", 10);

  await params.context.getQueryInterface().bulkInsert(
    "users",
    users.map((u) => ({
      id: crypto.randomUUID(),
      name: u.name,
      email: u.email,
      passwordHash: password,
      createdAt: new Date(),
    }))
  );
};

export const down: Seeder = async (params: { context: Sequelize }) => {
  const emails = users.map((u) => u.email);

  await params.context
    .getQueryInterface()
    .bulkDelete("users", { email: emails });
};
