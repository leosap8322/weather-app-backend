import { AppError } from "../errors/AppError";
import { WeatherResponseDTO } from "../types/weather.dto";
import { openWeatherResponseSchema } from "../types/openweather-response";

export const getWeatherData = async (city: string): Promise<WeatherResponseDTO> => {
    const API_KEY = process.env.WEATHER_API_KEY;

    if (!API_KEY) {
        throw new AppError("Weather API key is not set in environment variables", 500);
    }

    const throwApiError = async (response: Response) => {
        const errorData = await response.json();
        throw new AppError(errorData.message || "Error fetching weather data", response.status);
    };

    const trimmedCity = city.trim();
    const encodedCity = encodeURIComponent(trimmedCity);

  try {  
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`,
            {
                signal: AbortSignal.timeout(5000)
            }
    );  

    if (!response.ok) {
        await throwApiError(response);
    };

    const data = await response.json();

    const parsedData = openWeatherResponseSchema.parse(data);

    const weather: WeatherResponseDTO = {
        city: parsedData.name,
        temperature: parsedData.main.temp,
        description: parsedData.weather[0].description,
        humidity: parsedData.main.humidity,
        windSpeed: parsedData.wind.speed,
        icon: parsedData.weather[0].icon,
        feelsLike: parsedData.main.feels_like,
    };

    return weather;
    } 
    catch (error) { 
        if (error instanceof Error && error.name === "TimeoutError") {
            throw new AppError(
                "Weather service timeout",
                504
            );
        }  
        throw error;     
    }
}