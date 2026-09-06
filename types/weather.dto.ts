export interface WeatherResponseDTO {
    city: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
}