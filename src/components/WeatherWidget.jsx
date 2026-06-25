import { useEffect, useRef, useState } from "react";
import { indiaRegions } from "../data/indiaRegions.js";
import { fetchCurrentWeather } from "../services/weatherApi.js";
import { useSuperStore } from "../store/useSuperStore.js";

const CACHE_KEY_PREFIX = "super-app-weather-";
const CACHE_TTL_MS = 10 * 60 * 1000;

function getWeatherCache(city) {
  try {
    const raw = localStorage.getItem(`${CACHE_KEY_PREFIX}${city}`);

    if (!raw) {
      return null;
    }

    const { data, timestamp } = JSON.parse(raw);

    if (!data || Date.now() - timestamp > CACHE_TTL_MS) {
      return null;
    }

    return { data, timestamp };
  } catch {
    return null;
  }
}

function setWeatherCache(city, data) {
  const timestamp = Date.now();
  localStorage.setItem(
    `${CACHE_KEY_PREFIX}${city}`,
    JSON.stringify({ data, timestamp })
  );
  return timestamp;
}

export default function WeatherWidget({ compact = false }) {
  const weatherRegion = useSuperStore((state) => state.weatherRegion);
  const setWeatherRegion = useSuperStore((state) => state.setWeatherRegion);
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("loading");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const loadOptionsRef = useRef({ forceRefresh: false });
  const selectedRegion =
    indiaRegions.find((region) => region.name === weatherRegion) ||
    indiaRegions.find((region) => region.name === "Delhi");

  useEffect(() => {
    let active = true;
    const city = selectedRegion.name;
    const forceRefresh = loadOptionsRef.current.forceRefresh;
    loadOptionsRef.current.forceRefresh = false;

    async function loadWeather() {
      if (!forceRefresh) {
        const cached = getWeatherCache(city);

        if (cached && active) {
          setWeather(cached.data);
          setLastUpdated(cached.timestamp);
          setStatus("ready");
          return;
        }
      }

      setStatus("loading");

      try {
        const result = await fetchCurrentWeather(selectedRegion);
        const timestamp = setWeatherCache(city, result);

        if (active) {
          setWeather(result);
          setLastUpdated(timestamp);
          setStatus("ready");
        }
      } catch {
        if (active) {
          setWeather(null);
          setLastUpdated(null);
          setStatus("error");
        }
      }
    }

    loadWeather();

    return () => {
      active = false;
    };
  }, [selectedRegion, retryCount]);

  function handleRetry() {
    loadOptionsRef.current.forceRefresh = true;
    setRetryCount((current) => current + 1);
  }

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
  const lastUpdatedLabel = lastUpdated
    ? new Date(lastUpdated).toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

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
        {status === "loading" && (
          <p className="muted" role="status" aria-live="polite">
            Loading weather...
          </p>
        )}
        {status === "error" && (
          <>
            <p className="muted">Weather is unavailable.</p>
            <button type="button" onClick={handleRetry}>
              Retry
            </button>
          </>
        )}
        {weather && (
          <>
            <div className="weather-card__condition">
              <span className="weather-card__icon">
                {weather.icon ? (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.condition}
                  />
                ) : (
                  "WX"
                )}
              </span>
              <p>{weather.condition}</p>
            </div>
            <div className="weather-card__temperature">
              <strong>{weather.temperature}&deg;C</strong>
              <span>{weather.city}</span>
            </div>
            <div className="weather-card__stats">
              <span>{weather.wind} m/s<br />Wind</span>
              <span>{weather.pressure} mbar<br />Pressure</span>
              <span>{weather.humidity}%<br />Humidity</span>
            </div>
            {lastUpdatedLabel && (
              <p className="muted">Last updated: {lastUpdatedLabel}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
