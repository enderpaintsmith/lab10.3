import { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';

export default function TodoItem({ todo }) {
    const { toggleTodo, deleteTodo, editTodo } = useContext(TodoContext);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.text);

    const handleSave = () => {
        const trimmedText = text.trim();

        if (!trimmedText) return;

        editTodo(todo.id, trimmedText);
        setIsEditing(false);
    };

    return (
        <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />

            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => {
                        setText(todo.text);
                        setIsEditing(false);
                    }}>Cancel</button>
                </>
            ) : (
                <>
                    <span>{todo.text}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </>
            )}
        </div>
    );
}