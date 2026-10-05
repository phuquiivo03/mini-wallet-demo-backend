import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  return res.json({
    status: "true",
    message: "Server is live!",
  });
});

export default router;
