import { string } from "zod";
import { createFavorite, deleteFavorite, getFavorites, importFavorites } from "../services/favorites.service";
import express from "express";

export const createFavoriteController = async (
    req: express.Request, 
    res: express.Response,
    next: express.NextFunction
) => {
    const userId = req.userId;
    const { city } = req.body;

    if (!city || typeof city !== "string") {
        res.status(400).json({
            error: "City parameter is required and must be a string"
        });
        return;
    }

    try {
        const favorite = await createFavorite(userId, city);

        res.status(201).json({
            message: "Favorite city added",
            favorite
        });
    } catch (error) {
        next(error);
    }
}

export const getFavoritesController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const userId = req.userId;

    try {
        const favorites = await getFavorites(userId);
        res.status(200).json({ favorites });
    } catch (error) {
        next(error);
    }
}

export const deleteFavoriteController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const userId = req.userId;
    const favoriteId = Number(req.params.favoriteId);

    if (!Number.isInteger(favoriteId) || favoriteId <= 0) {
            res.status(400).json({
                error: "Favorite ID must be a positive integer"
            });
            
        return;
    }

    try{
        const favorite = await deleteFavorite(favoriteId, userId);

        if (!favorite) {
            res.status(404).json({
                error: "Favorite city not found"
            });
            return;
        }
        res.status(200).json({
            message: "Favorite city deleted"
        });
    } catch (error) {
        next(error);
    }
}

export const importFavoritesController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const { cities } = req.body;
    if (
        !Array.isArray(cities) ||
        cities.length === 0 ||
        cities.some(item => typeof item !== "string")
    ) {
        res.status(400).json({
            error: "cities must be a non-empty array"
        });
        return;
    }

    try {
        const favorites = await importFavorites(req.userId, cities);

        res.status(201).json({
            message: "Favorites imported successfully",
            favorites
        });
    } catch (error) {
        next(error);
    }
}