import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
//useEffect notes todos which have changed & saves new array to LS

// Create the context App
export const TodoContext = createContext();

// Create the provider component
export function TodoProvider({ children }) {

// Load saved todos from localStorage when the app starts
const [todos, setTodos] = useState(() => {
    // grab todos from localstorage
    const savedTodos = localStorage.getItem('todos');
    // if anything saved return json objects list
    // or return an empty list 
    return savedTodos ? JSON.parse(savedTodos) : [];
});

    // Add a new todo
useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);

    const addTodo = useCallback((text) => {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
        };
        // Take data form todos and create newtodo
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    }, []);

    // Toggle a todo between completed and active
    // useCallback with dependency array to update state
    const toggleTodo = useCallback((id) => {
        setTodos((prevTodos) =>
        // Update todos with a new array with .map()
        prevTodos.map((todo) =>
            
            todo.id === id
            ? {...todo, completed: !todo.completed }
            : todo
)
    );
}, []);

                // Ternary operator: if IDs match, update the todo
                // If not (:), return the original todo unchanged
                // Spread operator copies properties of the existing todo
                // Instead of modifying the existing array directly,
                // we create a new array with the updated todo
                // and pass that new array to setTodos().

    // Delete a todo
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // Edit the text of an existing todo
    const editTodo = (id, newText) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, text: newText }
                    : todo
            )
        );
    };
    // Clear ALL completed todos
    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };

    return (
        <TodoContext.Provider
            value={{ todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted }}
        >
            {children}
        </TodoContext.Provider>
    );
}