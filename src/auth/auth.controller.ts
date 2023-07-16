import express from "express";
import debug from "debug";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import authService from "./auth.service";

const log: debug.IDebugger = debug("app:auth-controller");

/**
 * This value is automatically populated from .env, a file which you will have
 * to create for yourself at the root of the project.
 *
 * See .env.example in the repo for the required format.
 */
// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;
const tokenExpirationInSeconds = 36000;

class AuthController {
  async createJWT(req: express.Request, res: express.Response) {
    try {
      const { token, hash } = authService.createJWT(req.body);
      return res.status(201).send({ accessToken: token, refreshToken: hash });
    } catch (err) {
      log("createJWT error: %O", err);
      return res.status(500).send();
    }
  }
}

export default new AuthController();
