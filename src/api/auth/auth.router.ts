import { Router } from "express";
import { LoginUserDTO, SigninUserDTO } from "./auth.dto";
import { login, signin } from "./auth.controller";
import { validate } from "../../utils/validation.middleware";

const router = Router();

router.post("/signin", validate(SigninUserDTO), signin);
router.post("/login", validate(LoginUserDTO), login);

export default router;

