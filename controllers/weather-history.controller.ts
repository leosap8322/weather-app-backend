import express from "express";
import { getUserWeatherHistory } from "../services/weather-history.service";

export const getWeatherHistoryController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const userId = req.userId;

    try {
        const history = await getUserWeatherHistory(userId);

        res.status(200).json(history);
    } catch (error) {
        next(error);
    }
};