import express from "express";
import { loginUser, registerUser } from "../services/auth.service";
import { deleteSession } from "../services/session.service";

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

export const loginController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const { email, password } = req.body;

    try {
        const sessionId = await loginUser(email, password);

        res.cookie("sessionId", sessionId, {
            httpOnly: true
        });

        res.status(200).json({
            message: "Login successful"
        });
        
    } catch (error) {
        next(error);
    }
    
};

export const logoutController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
        return res.status(400).json({
            message: "No session found"
        })
    }

    try {
        await deleteSession(sessionId);

        res.clearCookie("sessionId");
        
        res.status(200).json({
            message: "Logout successful"
        })
    }
    catch (error) {
        next(error);
    }
    
};