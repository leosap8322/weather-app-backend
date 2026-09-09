import { getWeatherHistory } from "../repositories/weather-history.repository.js";

export const getUserWeatherHistory = async (userId: number) => {
    const history = await getWeatherHistory(userId);

    return history;
};