import express from "express";
import { registerUser } from "../services/auth.service";

export const registerController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const { email, password } = req.body;

    try {
        const user = await registerUser(email, password);

        const { password_hash, ...safeUser } = user;

        res.status(201).json(safeUser);
    } catch (error) {
        next(error);
    }
};