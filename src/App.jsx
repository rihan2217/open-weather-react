import { useEffect, useState } from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";
import bgimg from "./assets/photo-1513002749550-c59d786b8e6c.avif"
import {Theme} from "./context/ThemeContext";


function App() {
  const apikey = "9927a0fbd736effda0df2d1b5071b441";

  const [search, setSearch] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) return;

    async function fetchWeather() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apikey}&units=metric`
        );
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [search]);
  return (
    <Theme>    
      <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" 
    style={{backgroundImage:`url(${bgimg})`}}>
      <div className="w-full max-w-md p-4 rounded dark:bg-gradient-to-br from-blue-900 to-blue-950 bg-blue-400">

        {/* Search */}
        <Search setSearch={setSearch}/>

        {/* Error */}
        {error && (
          <div className="bg-red-400/30 border border-red-300/40 text-white text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-white/70 text-center py-8">Fetching weather...</div>
        )}

        {/* Weather Card */}
        {weather && !loading && (
          <Weather weather={weather}/>
        )}
      </div>
    </div>
    </Theme>

  );
}

export default App;