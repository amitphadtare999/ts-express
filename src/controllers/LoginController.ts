import { Request, Response, NextFunction } from "express";
import { controller, get, post, bodyValidator } from "./decorators";

@controller("/auth")
class LoginController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`
              <form method="post">
                  <div>
                      <label>Email</label>
                      <input name="email" />
                  </div>
                  <div>
                      <label>Password</label>
                      <input name="password"  type="password"/>
                  </div>
                  <button>Submit</button>
              </form>
          `);
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (
      email &&
      password &&
      email == "amitphadtare@hotmail.com" &&
      password == "password123"
    ) {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Send valid credentials");
    }
  }

  @get("/logout")
  logout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect("/auth/login");
  }
}
