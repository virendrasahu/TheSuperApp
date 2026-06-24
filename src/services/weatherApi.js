const fallbackCoordinates = {
  latitude: 28.6139,
  longitude: 77.209,
  label: "New Delhi",
};

const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Slight rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Slight snow",
  80: "Rain showers",
  95: "Thunderstorm",
};

export async function fetchCurrentWeather(coordinates = fallbackCoordinates) {
  const params = new URLSearchParams({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    current:
      "temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,weather_code",
    timezone: "auto",
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

  if (!response.ok) {
    throw new Error("Unable to load weather.");
  }

  const data = await response.json();
  const current = data.current;

  return {
    city: coordinates.label || "Current location",
    temperature: Math.round(current.temperature_2m),
    humidity: current.relative_humidity_2m,
    pressure: Math.round(current.pressure_msl),
    wind: current.wind_speed_10m,
    condition: weatherCodes[current.weather_code] || "Changing weather",
    time: current.time,
  };
}

export function requestUserCoordinates() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(fallbackCoordinates);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          label: "Current location",
        }),
      () => resolve(fallbackCoordinates),
      { timeout: 6000, maximumAge: 300000 }
    );
  });
}
