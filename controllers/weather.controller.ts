import express from "express";
import { searchWeather } from "../services/weather-search.service";

export const getWeatherDataController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const city = req.city;
    
    try {
        const weather = await searchWeather(req.userId, city);

        res.status(200).json(weather);
    } catch (error) {
        next(error);
    }
};