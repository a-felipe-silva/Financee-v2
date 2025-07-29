import type { Migration } from "../../umzug";
import { DataType, type Sequelize } from "sequelize-typescript";

export const up: Migration = async (params: { context: Sequelize }) => {
  await params.context.getQueryInterface().createTable(
    "users",
    {
      id: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: DataType.STRING(100),
      email: {
        type: DataType.STRING(320),
        unique: true,
      },
      passwordHash: DataType.STRING(255),
      createdAt: {
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
      },
    },
    {
      logging: console.log,
    }
  );
};

export const down: Migration = async (params: { context: Sequelize }) => {
  params.context.getQueryInterface().dropTable("users", {
    logging: console.log,
  });
};
