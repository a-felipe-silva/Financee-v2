import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize } from "sequelize-typescript";
import { Options } from "sequelize";
import config from "./data/database/config";

const sequelize = new Sequelize(config.db as Options);

export const migrator = new Umzug({
  migrations: {
    glob: ["data/migrations/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    tableName: "migrations",
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;
