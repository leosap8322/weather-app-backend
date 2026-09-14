import express from "express";
import {
    createFavoriteController, 
    deleteFavoriteController, 
    getFavoritesController, 
    importFavoritesController
} from "../controllers/favorites.controller";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/", 
    authMiddleware, 
    createFavoriteController
);
router.get("/", 
    authMiddleware, 
    getFavoritesController
);
router.delete(
    "/:favoriteId", 
    authMiddleware, 
    deleteFavoriteController
);
router.post(
    "/import",
    authMiddleware,
    importFavoritesController
);

export default router;