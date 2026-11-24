import { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';

export default function TodoInput() {

//Access addTodo from TodoContext (allows access to addTodo())
const { addTodo } = useContext(TodoContext);

// Store the user's input
const [text, setText] = useState('');

// Handle form submisions
const handleSubmit = (event) => {
    event.preventDefault();

    // Remove unnecessary whitespace from text input
    const trimmedText = text.trim();

    // Disallow empty todos
    if (!trimmedText) return;

    addTodo(trimmedText);
    setText('');
};

return (
    <form onSubmit={(handleSubmit)}>
        <input
        type="text"
        // React controls the input value through state & 
        // that state is updated anytime the user types
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a new task..."
        />
        <button type="submit"> Add Todo</button>
    </form>
);
}
