import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import { TodoContext } from '../context/TodoContext'
export default function FilterButtons() {

    // Access the current filter and its setter
    const { filter, setFilter } = useContext(FilterContext);

    const { clearCompleted } = useContext(TodoContext);

    return (
        <div>
            <button onClick={() => setFilter('all')}>
                All
            </button>

            <button onClick={() => setFilter('active')}>
                Active
            </button>

            <button onClick={() => setFilter('completed')}>
                Completed
            </button>
            <button onClick={clearCompleted}>
                Clear Completed
            </button>
        </div>
    );
}
