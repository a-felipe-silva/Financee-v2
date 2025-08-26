import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from "sequelize";
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import { Users } from "./Users";
import { ExpenseCategory } from "./ExpenseCategory";

@Table({
  tableName: "expense",
  createdAt: true,
  updatedAt: true,
})
export class Expense extends Model<
  InferAttributes<Expense>,
  InferCreationAttributes<Expense>
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: CreationOptional<string>;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column(DataType.UUID)
  declare userId: string;

  @BelongsTo(() => Users, "userId")
  declare user: NonAttribute<Users>;

  @ForeignKey(() => ExpenseCategory)
  @AllowNull
  @Column(DataType.INTEGER)
  declare categoryId: CreationOptional<number | null>;

  @BelongsTo(() => ExpenseCategory, "categoryId")
  declare category: NonAttribute<ExpenseCategory>;

  @Column(DataType.STRING(300))
  declare description: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  declare amount: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare date: Date;

  @CreatedAt
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  declare updatedAt: CreationOptional<Date>;
}
