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
  AutoIncrement,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import { Users } from "./Users";

@Table({
  tableName: "expense_category",
  createdAt: true,
  updatedAt: true,
})
export class ExpenseCategory extends Model<
  InferAttributes<ExpenseCategory>,
  InferCreationAttributes<ExpenseCategory>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column(DataType.UUID)
  declare userId: string;

  @BelongsTo(() => Users, "userId")
  declare user: NonAttribute<Users>;

  @Column(DataType.STRING(100))
  declare name: string;

  @CreatedAt
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  declare updatedAt: CreationOptional<Date>;
}
