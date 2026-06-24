import { useEffect, useState } from "react";
import { indiaRegions } from "../data/indiaRegions.js";
import { fetchCurrentWeather } from "../services/weatherApi.js";
import { useSuperStore } from "../store/useSuperStore.js";

export default function WeatherWidget({ compact = false }) {
  const weatherRegion = useSuperStore((state) => state.weatherRegion);
  const setWeatherRegion = useSuperStore((state) => state.setWeatherRegion);
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("loading");
  const selectedRegion =
    indiaRegions.find((region) => region.name === weatherRegion) ||
    indiaRegions.find((region) => region.name === "Delhi");

  useEffect(() => {
    let active = true;

    async function loadWeather() {
      setStatus("loading");
      try {
        const result = await fetchCurrentWeather(selectedRegion);
        if (active) {
          setWeather(result);
          setStatus("ready");
        }
      } catch {
        if (active) {
          setStatus("error");
        }
      }
    }

    loadWeather();

    return () => {
      active = false;
    };
  }, [selectedRegion]);

  const now = new Date();
  const dateLabel = now.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  const timeLabel = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className={`weather-card ${compact ? "weather-card--compact" : ""}`}>
      <div className="weather-card__bar">
        <span>{dateLabel}</span>
        <span>{timeLabel}</span>
      </div>
      <label className="weather-card__selector">
        <span>India state</span>
        <select
          value={selectedRegion.name}
          onChange={(event) => setWeatherRegion(event.target.value)}
        >
          {indiaRegions.map((region) => (
            <option key={region.name} value={region.name}>
              {region.name}
            </option>
          ))}
        </select>
      </label>
      <div className="weather-card__body">
        {status === "loading" && <p className="muted">Loading weather...</p>}
        {status === "error" && <p className="muted">Weather is unavailable.</p>}
        {weather && (
          <>
            <div className="weather-card__condition">
              <span className="weather-card__icon">WX</span>
              <p>{weather.condition}</p>
            </div>
            <div className="weather-card__temperature">
              <strong>{weather.temperature}&deg;C</strong>
              <span>{weather.city}</span>
            </div>
            <div className="weather-card__stats">
              <span>{weather.wind} km/h<br />Wind</span>
              <span>{weather.pressure} mbar<br />Pressure</span>
              <span>{weather.humidity}%<br />Humidity</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
