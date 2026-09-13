import express from "express";
import { findSessionById } from "../repositories/session.repository";

export const authMiddleware = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const session = await findSessionById(sessionId);

    if (!session) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    req.userId = session.user_id;

    next();
};