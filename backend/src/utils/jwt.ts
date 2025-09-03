import jwt, { JwtPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    email: string;
    v: number;
  }
}

interface PayloadParams {
  email: string;
  id: string;
}

const JWT_SECRET =
  process.env.JWT_SECRET ??
  (() => {
    throw new Error("JWT_SECRET is not set.");
  })();

export function generateJwt(payload: PayloadParams): string {
  return jwt.sign({ email: payload.email, v: 1 }, JWT_SECRET, {
    expiresIn: "10W",
    subject: payload.id,
  });
}

export function verifyJwt(jwtToken: string): JwtPayload {
  const payload = <JwtPayload>(
    jwt.verify(jwtToken, JWT_SECRET, { complete: false })
  );

  if (typeof payload === "string") {
    throw new Error("Unexpected string payload");
  }

  return payload;
}
