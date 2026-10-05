import { Response, Router } from "express";
import { getAccountBalance } from "./account.controller";
import { authMiddleware } from "../../shared/middlewares/auth";
const router = Router();

router.get("/:userId", (res: Response) => {
  res.status(200).json({ message: "Account route" });
});
router.get("/:accountId/balance", authMiddleware, getAccountBalance);

export default router;
