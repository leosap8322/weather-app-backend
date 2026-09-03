import { getWeatherData } from "../services/weather.service";
import express from "express";

export const getWeatherDataController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const city = req.query.city;
    
    if (typeof city !== "string" || !city.trim()) {
        res.status(400).json({
            error: "City parameter is required and must be a non-empty string"
        });
        return;
    }

    const trimmedCity = city.trim();

    try {
        const weather = await getWeatherData(trimmedCity);

        res.status(200).json(weather);
    } catch (error) {
        next(error);
    }
};