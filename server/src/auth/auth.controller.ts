import express from "express";
import debug from "debug";
import authService from "./auth.service";

const log: debug.IDebugger = debug("app:auth-controller");

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
