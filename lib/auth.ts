import { jwtVerify } from "jose";

interface JwtPayload {
  [key: string]: unknown;
}

export async function verifyAuth(
  token: string | null
): Promise<JwtPayload | null> {
  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as JwtPayload;
  } catch {
    return null;
  }
}
