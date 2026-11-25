
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import './App.css';

import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import ThemeToggleButton from './components/ThemeToggleButtton';

function App() {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`app ${theme}`}>
            <h1>My Todo List</h1>

            <ThemeToggleButton />

            <TodoInput />

            <FilterButtons />

            <TodoList />
        </div>
    );
}

export default App;
