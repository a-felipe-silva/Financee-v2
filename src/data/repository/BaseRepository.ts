import { Sequelize } from "sequelize-typescript";
import config from "../database/config";

export default class BaseRepository {
  sequelizeClient: Sequelize;

  constructor() {
    this.sequelizeClient = new Sequelize({
      dialect: config.db.dialect,
      host: config.db.host,
      port: config.db.port,
      database: config.db.database,
      username: config.db.username,
      password: config.db.password,
      models: [__dirname + "/src/data/models"],
      modelMatch: (filename, member) => {
        return filename.toLowerCase() === member.toLocaleLowerCase();
      },
    });
  }
}
