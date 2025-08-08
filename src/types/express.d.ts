import { Users } from "../data/models/Users";

declare global {
  namespace Express {
    export interface Request {
      user?: Users;
    }
  }
}
