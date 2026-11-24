import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { TodoProvider } from './context/TodoContext.jsx';
import { FilterProvider } from './context/FilterContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoProvider>
      <FilterProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </FilterProvider>
      </TodoProvider>
  </StrictMode>,
);
