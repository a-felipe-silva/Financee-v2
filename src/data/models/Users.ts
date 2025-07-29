import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  DataType,
  CreatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  updatedAt: false,
})
export class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: CreationOptional<string>;

  @Column(DataType.STRING(100))
  declare name: string;

  @Column(DataType.STRING(320))
  declare email: string;

  @Column(DataType.STRING(255))
  declare passwordHash: string;

  @CreatedAt
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  declare createdAt: CreationOptional<Date>;
}
