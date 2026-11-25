import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggleButton() {

    // Access current theme and toggle function
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>
    );
}