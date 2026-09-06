import { getWeatherData } from "../services/weather.service";
import express from "express";

export const getWeatherDataController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const city = req.city;
    
    try {
        const weather = await getWeatherData(city);

        res.status(200).json(weather);
    } catch (error) {
        next(error);
    }
};