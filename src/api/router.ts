import { Router } from 'express';
import routerAuth from "./auth/auth.router";
import routerUser from "./user/user.router";

const router = Router();

router.use("/auth", routerAuth);
router.use("/user", routerUser);

export default router;