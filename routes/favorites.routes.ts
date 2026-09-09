import express from "express";
import { createFavoriteController } from "../controllers/favorites.controller";

const router = express.Router();

router.post("/", createFavoriteController);

export default router;