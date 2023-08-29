import express from "express";
import usersService from "../users/users.service";
import * as argon2 from "argon2";
import authService from "./auth.service";
import { PermissionFlag, SignInDto } from "./auth.types";

class AuthMiddleware {
  async verifyUserPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user: any = await usersService.getUserByEmailWithPassword(
        req.body.email
      );
      if (user) {
        const passwordHash = user.password;
        if (await argon2.verify(passwordHash, req.body.password)) {
          req.body = {
            _id: user._id,
            email: user.email,
            permissionFlags: user.permissionFlags,
          };
          return next();
        } else {
          // Incorrect password
          res.status(400).send({ errors: ["Invalid email and/or password"] });
        }
      } else {
        // Incorrect email
        res.status(400).send({ errors: ["Invalid email and/or password"] });
      }
      // }
      // // Giving the same message in both cases
      // // helps protect against cracking attempts:
      // res.status(400).send({ errors: ["Invalid email and/or password"] });
      //}
    } catch (error) {
      res.status(400).send({ errors: ["Invalid email and/or password"] });
    }
  }

  verifyJWT(
    req: express.Request & { user: SignInDto },
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.headers["authorization"]) {
      try {
        const authorization = req.headers["authorization"].split(" ");
        if (authorization[0] !== "Bearer") {
          return res.status(401).send();
        } else {
          const token = authService.verifyJWT(authorization[1]);
          req.user = token.user;
          next();
        }
      } catch (err) {
        return res.status(403).send();
      }
    } else {
      return res.status(401).send();
    }
  }

  async verifyIsAdmin(
    req: express.Request & { user: SignInDto },
    res: express.Response,
    next: express.NextFunction
  ) {
    //@ts-ignore
    const userPermissionFlags = parseInt(req.user.permissionFlags);
    if (userPermissionFlags & PermissionFlag.ADMIN_PERMISSION) {
      return next();
    } else {
      return res.status(403).send();
    }
  }

  onlySameUserOrAdminCanDoThisAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    //@ts-ignore
    if (req.params && req.params.id && req.params.id === req.user._id) {
      return next();
    } else {
      //@ts-ignore
      const userPermissionFlags = parseInt(req.user.permissionFlags);
      if (userPermissionFlags & PermissionFlag.ADMIN_PERMISSION) {
        return next();
      } else {
        return res.status(403).send();
      }
    }
  }
}

export default new AuthMiddleware();
