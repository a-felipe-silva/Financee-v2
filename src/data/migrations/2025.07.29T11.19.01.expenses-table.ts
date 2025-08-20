import { Sequelize } from "sequelize";
import { Migration } from "../../umzug";
import { DataType } from "sequelize-typescript";

export const up: Migration = async (params: { context: Sequelize }) => {
  await params.context.getQueryInterface().createTable("expense_category", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      autoIncrementIdentity: true,
    },
    userId: {
      type: DataType.UUID,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    name: DataType.STRING(100),
    createdAt: {
      type: DataType.DATE,
      defaultValue: DataType.NOW,
    },
    updatedAt: {
      type: DataType.DATE,
      defaultValue: DataType.NOW,
    },
  });

  await params.context.getQueryInterface().createTable(
    "expense",
    {
      id: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataType.UUID,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
      categoryId: {
        type: DataType.INTEGER,
        references: {
          model: "expense_category",
          key: "id",
        },
      },
      description: DataType.STRING(300),
      amount: {
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
      },
      date: {
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
      },
      createdAt: {
        type: DataType.DATE,
        defaultValue: DataType.NOW,
      },
      updatedAt: {
        type: DataType.DATE,
        defaultValue: DataType.NOW,
      },
    },
    {
      logging: console.log,
    }
  );
};

export const down: Migration = async (params: { context: Sequelize }) => {
  await params.context.getQueryInterface().dropTable("expense", {
    logging: console.log,
  });

  await params.context.getQueryInterface().dropTable("expense_category", {
    logging: console.log,
  });
};
