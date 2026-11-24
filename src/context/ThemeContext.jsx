import { createContext, useState, useEffect } from 'react';

//Create the Theme Context
export const ThemeContext = createContext();

// create the Theme Provider
export function ThemeProvider({ children }) {

    // Load the saved theme or default to light
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    // Save the theme whenever it changes
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);
    // Toggle between light and dark theme
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}