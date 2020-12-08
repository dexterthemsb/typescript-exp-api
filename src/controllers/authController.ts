import { Router } from "express";

import { login, register } from "../services/authService";

// declare the router
const router = Router();

// routes
router.post("/register", (req, res) => register(req, res));
router.post("/login", (req, res) => login(req, res));

// export
export default router;
