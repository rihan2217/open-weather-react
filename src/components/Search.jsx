
import { useState } from "react";

function Search({setSearch}) {

    
  const [city, setCity] = useState("Delhi");

  function handleSearch() {
    if (city.trim()) {
      setSearch(city.trim());
      setCity("");
    }
  }


  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        className="px-5 py-2 bg-white dark:bg-gradient-to-br from-blue-900 to-blue-950 dark:text-white text-blue-700 font-medium rounded-xl hover:bg-blue-50 transition"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
