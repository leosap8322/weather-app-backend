import express from "express";
import { getWeatherDataController } from "../controllers/weather.controller"; 

export const weatherRouter = express.Router();

weatherRouter.get("/", getWeatherDataController);

export default weatherRouter;