import { CustomExpress } from "../pkg/app/response";
import { Router, Response, Request, NextFunction } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const customExpress = new CustomExpress(req, res, next);
  return customExpress.response200({
    status: "true",
    message: "Server is live!",
  });
});

export default router;
