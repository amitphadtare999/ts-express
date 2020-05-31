import { Request, Response, NextFunction } from "express";
import { controller, get, use } from "./decorators";

const sessionAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Forbidden");
};

@controller("")
export class RootController {
  @get("/")
  getRoot(req: Request, res: Response): void {
    if (req.session && req.session.loggedIn) {
      res.send(`
            <div>User logged in</div>
            <a href="/auth/logout">Logout</a>
          `);
    } else {
      res.redirect("/auth/login");
    }
  }

  @get("/protected")
  @use(sessionAuth)
  getProtected(req: Request, res: Response) {
    res.send("This is protected data");
  }
}
