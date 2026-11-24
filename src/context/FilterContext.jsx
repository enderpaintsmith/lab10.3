import { createContext, useState } from "react";

// Create the Filter Context
export const FilterContext = createContext();

// Create the Filter Provider
export function FilterProvider({ children }) {

    //store the current filter
    const [filter, setFilter] = useState('all');

    return (
        <FilterContext.Provider value ={{ filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    );
}
