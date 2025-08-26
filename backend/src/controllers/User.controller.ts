import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { matchedData, validationResult } from "express-validator";
import { Users } from "../data/models/Users";
import { generateJwt } from "../utils/jwt";

export async function registerUser(req: Request, res: Response) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const data = matchedData(req);

  const existingUserWithEmail = await Users.findOne({
    where: {
      email: data.email,
    },
  });

  if (existingUserWithEmail) {
    res.status(401).json({ error: "Invalid credentials." });
    return;
  }

  const passwordHash: string = await bcrypt.hash(data.password, 10);

  const newUser = await Users.create({
    email: data.email,
    name: data.name,
    passwordHash: passwordHash,
  });

  const JWT = generateJwt({ email: newUser.email, id: newUser.id });

  res.status(201).json({ token: JWT });
}

export async function loginUser(req: Request, res: Response) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const data = matchedData(req);

  const existingUserWithEmail = await Users.findOne({
    where: {
      email: data.email,
    },
  });

  if (!existingUserWithEmail) {
    res.status(401).json({ error: "Invalid credentials." });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    existingUserWithEmail.passwordHash
  );
  if (!isPasswordCorrect) {
    res.status(401).json({ error: "Invalid credentials." });
    return;
  }

  const JWT = generateJwt({
    email: existingUserWithEmail.email,
    id: existingUserWithEmail.id,
  });

  res.status(200).json({ token: JWT });
}
