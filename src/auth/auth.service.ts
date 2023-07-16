import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Jwt, SignInDto } from "./auth.types";

const jwtSecret: string = process.env.JWT_SECRET!;
const tokenExpirationInSeconds = 36000;

class AuthService {
  createJWT(user: SignInDto) {
    const refreshId = user._id + jwtSecret;
    const salt = crypto.createSecretKey(crypto.randomBytes(16));
    const hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");
    const refreshKey = salt.export();
    const token = jwt.sign({ user, refreshKey }, jwtSecret, {
      expiresIn: tokenExpirationInSeconds,
    });

    return { token, hash };
  }

  verifyJWT(token: string) {
    return jwt.verify(token, jwtSecret) as Jwt;
  }
}

export default new AuthService();
