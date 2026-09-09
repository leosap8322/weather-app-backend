import express from "express";
import { registerController } from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.post(
    "/register",
    registerController
);