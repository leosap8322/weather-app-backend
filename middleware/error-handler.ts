import express from "express";
import { AppError } from "../errors/AppError";
import { z } from "zod";

export const errorHandler = (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (error instanceof z.ZodError) {
        res.status(502).json({
            message: "Invalid response from weather service"
        });
        return;
    }

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            message: error.message 
        });
        return;
    }

    res.status(500).json({
         message: "Internal Server Error" 
        });   
};