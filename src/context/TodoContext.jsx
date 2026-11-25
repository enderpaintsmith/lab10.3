
import { createContext, useState, useEffect, useCallback, useMemo } from 'react';

// Create the Todo context
export const TodoContext = createContext();

// Create the provider component
export function TodoProvider({ children }) {

    // Load saved todos from localStorage when the app starts
    const [todos, setTodos] = useState(() => {
        // Grab todos from localStorage
        const savedTodos = localStorage.getItem('todos');

        // If anything is saved, return the JSON objects list
        // Otherwise, return an empty array
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    // useEffect watches for changes to todos
    // and saves the updated array to localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Add a new todo
    // useCallback memoizes the function between renders
    const addTodo = useCallback((text) => {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
        };

        // Use the previous state to create a new todos array
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    }, []);

    // Toggle a todo between completed and active
    // useCallback memoizes the function between renders
    const toggleTodo = useCallback((id) => {

        // Update todos with a new array using map()
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>

                // Ternary operator: if IDs match, update the todo
                // If not (:), return the original todo unchanged
                // Spread operator copies properties of the existing todo
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    }, []);

    // Delete a todo
    // filter() creates a new array without the matching ID
    const deleteTodo = useCallback((id) => {
        setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo.id !== id)
        );
    }, []);

    // Edit the text of an existing todo
    // map() updates the matching todo while keeping the others unchanged
    const editTodo = useCallback((id, newText) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, text: newText }
                    : todo
            )
        );
    }, []);

    // Clear ALL completed todos
    // filter() keeps only todos that are not completed
    const clearCompleted = useCallback(() => {
        setTodos((prevTodos) =>
            prevTodos.filter((todo) => !todo.completed)
        );
    }, []);

    // useMemo memoizes the Provider value object
    // It only creates a new value when its dependencies change
    const value = useMemo(() => ({
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearCompleted,
    }), [todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted]);

    // Provide todos and functions to child components
    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
}
