
import "dotenv/config";
import "./db/pool";
import express from "express";
import favoritesRouter from "./routes/favorites.routes";
import weatherRouter from "./routes/weather.routes";
import { weatherHistoryRouter } from "./routes/weather-history.routes";
import { errorHandler } from "./middleware/error-handler";
import { authRouter } from "./routes/auth.routes";

const app = express();

const logger = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logger);
app.use(express.json());

app.use("/api/favorites", favoritesRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/history", weatherHistoryRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler)

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});