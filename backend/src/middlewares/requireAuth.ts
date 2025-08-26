import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";
import { Users } from "../data/models/Users";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const jwtToken = authHeader.split(" ")[1];
    const jwtPayload = verifyJwt(jwtToken);

    const userId = jwtPayload.sub;
    const userWithId = await Users.findOne({
      where: {
        id: userId,
      },
    });

    if (!userWithId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    //Store authenticated user for use on controllers.
    req.user = userWithId;

    next();
  } catch (e) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
};
