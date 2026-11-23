import { createContext, useState, useEffect } from 'react';
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

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
        };
        // Take data form todos and create newtodo
        setTodos([...todos, newTodo]);
    };

    // Toggle a todo between completed and active
    const toggleTodo = (id) => {
        // Update todos with a new array
        setTodos(
            // map() updates array with updated todos, keeping others the same
            todos.map((todo) =>
                // Ternary operator: if IDs match, update the todo
                // If not (:), return the original todo unchanged
                // Spread operator copies properties of the existing todo
                // Instead of modifying the existing array directly,
                // we create a new array with the updated todo
                // and pass that new array to setTodos().
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

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
    // Clear all completed todos
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