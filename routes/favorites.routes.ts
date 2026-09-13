import express from "express";
import {
    createFavoriteController, 
    deleteFavoriteController, 
    getFavoritesController 
} from "../controllers/favorites.controller";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/", authMiddleware, createFavoriteController);
router.get("/", authMiddleware, getFavoritesController);
router.delete("/:favoriteId", authMiddleware, deleteFavoriteController);

export default router;