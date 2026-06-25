const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
const fallbackCity = "Delhi";

export async function fetchCurrentWeather(region) {
  const city = region?.name || fallbackCity;

  if (!weatherApiKey) {
    throw new Error("Missing OpenWeatherMap API key.");
  }

  const params = new URLSearchParams({
    q: city,
    units: "metric",
    appid: weatherApiKey,
  });

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${params}`);

  if (!response.ok) {
    throw new Error("Unable to load weather.");
  }

  const data = await response.json();

  return {
    city: data.name || city,
    temperature: Math.round(data.main.temp),
    humidity: data.main.humidity,
    pressure: Math.round(data.main.pressure),
    wind: data.wind.speed,
    condition: data.weather?.[0]?.main || "Changing weather",
    icon: data.weather?.[0]?.icon || null,
  };
}
