import { AppError } from "../errors/AppError";


export const getWeatherData = async (city: string) => {
    const API_KEY = process.env.WEATHER_API_KEY;

    if (!API_KEY) {
        throw new AppError("Weather API key is not set in environment variables", 500);
    }

    const throwApiError = async (response: Response) => {
        const errorData = await response.json();
        throw new AppError(errorData.message || "Error fetching weather data", response.status);
    }

    const trimmedCity = city.trim();
    const encodedCity = encodeURIComponent(trimmedCity);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`);

    if (!response.ok) {
        await throwApiError(response);
    }
    return response.json();
}