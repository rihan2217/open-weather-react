import { useEffect } from "react";
import { useState } from "react";

import { createContext } from "react";


 const ThemeContext = createContext();


export function Theme({children}){

    const [theme, setTheme] = useState("light")

     function ToggleTheme(){
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

    useEffect(()=>{
    if(theme === "dark"){
      document.documentElement.classList.add("dark");
    }
    else{
      document.documentElement.classList.remove("dark");
    }
  },[theme]);

    return(
        <ThemeContext.Provider value={{theme , ToggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;