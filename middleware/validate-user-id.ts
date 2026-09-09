import express from "express";

export const validateUserId = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const userId = Number(req.query.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            error: "userId must be a positive integer"
        });
    }

    req.userId = userId;

    next();
};