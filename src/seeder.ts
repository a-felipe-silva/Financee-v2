import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize } from "sequelize-typescript";
import { Options } from "sequelize";
import config from "./data/database/config";

const sequelize = new Sequelize(config.db as Options);

export const seeder = new Umzug({
  migrations: {
    glob: ["data/seeders/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    tableName: "seeds",
  }),
  logger: console,
});

export type Seeder = typeof seeder._types.migration;
