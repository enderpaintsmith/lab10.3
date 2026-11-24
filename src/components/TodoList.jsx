
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { FilterContext } from '../context/FilterContext';
import TodoItem from './TodoItem';

export default function TodoList() {

    // Access todos from TodoContext
    const { todos } = useContext(TodoContext);

    // Access the current filter
    const { filter } = useContext(FilterContext);

    // Filter todos based on the selected filter
    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') {
            return !todo.completed;
        }

        if (filter === 'completed') {
            return todo.completed;
        }

        return true;
    });

    return (
        <div>
            {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
}
