import jwt from "jsonwebtoken";

interface PayloadParams {
  email: string;
  id: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "";

if (JWT_SECRET === "") {
  throw new Error("JWT_SECRET is not set.");
}

export function generateJwt(payload: PayloadParams): string {
  return jwt.sign({ email: payload.email, v: 1 }, JWT_SECRET, {
    expiresIn: "1h",
    subject: payload.id,
  });
}
