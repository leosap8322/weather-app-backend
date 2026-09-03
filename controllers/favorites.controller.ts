import { createFavorite } from "../services/favorites.service";
import express from "express";

export const createFavoriteController = (
    req: express.Request, 
    res: express.Response
) => {
    const { city } = req.body;

    if (!city || typeof city !== "string") {
        res.status(400).json({
            error: "City parameter is required and must be a string"
        });
        return;
    }

    const favorite = createFavorite(city);

    res.status(201).json({
        message: "Favorite city added",
        favorite
    });
}