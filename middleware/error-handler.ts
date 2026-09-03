import express from "express";
import { AppError } from "../errors/AppError";

export const errorHandler = (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
};