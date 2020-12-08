import { Router } from "express";
import { validateJWT } from "../middlewares/authentication";

import { getUserData } from "../services/userService";

// declare the router
const router = Router();

// routes
router.get("/user/:userID", validateJWT, (req, res) => getUserData(req, res));

// export
export default router;
