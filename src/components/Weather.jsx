import { useContext } from "react";
import { useState } from "react";
import ThemeContext from "../context/ThemeContext";
import StatCard from "./StatCard";

function Weather({ weather }) {
  const iconMap = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "⛅",
    "02n": "⛅",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌦️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };

  function toTime(unix, tz) {
    const d = new Date((unix + tz) * 1000);
    let h = d.getUTCHours(),
      m = d.getUTCMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
  }

  const { theme, ToggleTheme } = useContext(ThemeContext);

  return (
    <div className="bg-white text-black dark:bg-gradient-to-br from-blue-900 to-blue-950 dark:text-white border border-white/20 rounded-2xl p-6">
      {/* City & Date */}
      <div className="mb-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold dark:text-white">
            {weather.name}, {weather.sys.country}
          </h1>
          <button
            className="px-2 py-2 bg-white dark:bg-gradient-to-br from-blue-900 to-blue-950 dark:text-white text-blue-700 font-medium rounded-xl hover:bg-blue-50 transition border-2"
            onClick={ToggleTheme}
          >
            {theme==="light"?"dark-mode":"light-mode"}
          </button>
        </div>
        <p className="dark:text-white text-sm">
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      {/* Temp + Icon */}
      <div className="flex items-center gap-4 mb-2">
        <span className="text-6xl font-semibold dark:text-white">
          {Math.round(weather.main.temp)}°C
        </span>
        <span className="text-5xl">
          {iconMap[weather.weather[0].icon] || "🌡️"}
        </span>
      </div>

      {/* H/L + Description */}
      <p className="dark:text-white text-sm mb-1">
        max: {Math.round(weather.main.temp_max)}° · min:{" "}
        {Math.round(weather.main.temp_min)}°
      </p>
      <p className="dark:text-white capitalize mb-6">
        {weather.weather[0].description}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          label="Feels like"
          value={`${Math.round(weather.main.feels_like)}°C`}
        />
        <StatCard label="Humidity" value={`${weather.main.humidity}%`} />
        <StatCard
          label="Wind"
          value={`${Math.round(weather.wind.speed)} m/s`}
        />
        <StatCard
          label="Visibility"
          value={`${(weather.visibility / 1000).toFixed(1)} km`}
        />
        <StatCard label="Pressure" value={`${weather.main.pressure} hPa`} />
        <StatCard label="Clouds" value={`${weather.clouds.all}%`} />
        <StatCard
          label="Sunrise"
          value={toTime(weather.sys.sunrise, weather.timezone)}
        />
        <StatCard
          label="Sunset"
          value={toTime(weather.sys.sunset, weather.timezone)}
        />
        <StatCard label="Ground lvl" value={`${weather.main.grnd_level} hPa`} />
      </div>
    </div>
  );
}

export default Weather;
