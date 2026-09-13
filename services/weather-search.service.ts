import { createUserWeatherHistory } from "./weather-history.service";
import { getWeatherData } from "./weather.service";


export const searchWeather = async (userId: number, city: string) => {
    const weather = await getWeatherData(city);
    try{
        await createUserWeatherHistory(userId, city);
    } catch (error) {
        console.error("Error creating weather history:", error);
    }
    return weather;
}