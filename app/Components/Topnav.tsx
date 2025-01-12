'use client'
import React, { useState } from "react";


export const Topnav= ()=>{

      const [isDarkMode, setIsDarkMode] = useState(false);


    const handleTheme = ()=>{

        !isDarkMode
          ? document.body.setAttribute("class", "dark")
          : document.body.removeAttribute("class")

        setIsDarkMode((isDark)=> !isDark)
        
}


    return (
      <div className="flex box-border p-4 justify-between items-center fixed top-0 left-0  z-50">
        <strong className="flex flex-col gap-2">
          <h1 className="text-2xl">TextCanvas</h1>
            <span className="w-46 border-2 "></span>
        </strong>
        <button
          className=" fixed top-4 z-50 right-10 box-border p-2 text-white dark:bg-gray-800 rounded-full shadow-md"
          onClick={() => handleTheme()}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>
      </div>
    );
}