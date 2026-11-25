# lab10.3
# React Todo App — Context API

## Overview

For this lab, I built a Todo application using React and the Context API. The goal was to manage application state across multiple components without having to pass props through every component.

The application allows users to create and manage tasks, filter them by completion status, and switch between light and dark themes. Todo items and  selected theme are saved in localStorage, so the application remembers the user's settings after a page refresh.

## Features

The application supports creating, editing, deleting, and marking individual tasks as completed. Users can filter their todos to display all tasks, active tasks, or completed tasks. There is also a Clear Completed button, which removes all completed tasks at once.

The application includes a light and dark theme toggle. Both the todo list and selected theme persist through localStorage, so saved information remains available after refreshing the page.

## How It Works

### Context API

I separated the application's shared state into three context providers.

**TodoContext** manages the todo list and the functions used to add, edit, delete, toggle, and clear tasks.

**FilterContext** manages the current filter selection and allows the TodoList component to display the filtered tasks.

**ThemeContext** manages the application's light and dark themes and provides the function used to switch between.

The context providers are nested in `main.jsx`, which makes their state and functions available to the components through `useContext`.

### State Management and React Hooks

I used several different React hooks to manage state and improve how the application handles updates.

`useState` stores the component state, including: todo list, current filter, theme, and input values.

`useContext` allows components to access shared state and functions without having to pass props through multiple components.

`useEffect` saves any changes to localStorage whenever the todo list or theme changes.

`useCallback` memoizes functions in TodoContext so they can be reused between renders when dependencies have not changed. 

`useMemo` memoizes the context provider's value so it does not need to be recreated/react doesn't rerender unnecessarily.

For todo updates, I used methods like `map()` and `filter()` to create updated arrays instead of directly modifying the existing state. I also made use of the spread operator to preserve existing todo properties when updating individual tasks.

### Local Storage

The application uses localStorage to save the todo list as JSON and remember the user's selected theme, even after refreshing or closing the page.

When the application starts, it checks localStorage for saved data and uses it to initialize the state. If no saved todos exist, it will start with an empty array.

## Project Structure

```text
src/
├── components/
│   ├── FilterButtons.jsx
│   ├── ThemeToggleButtton.jsx
│   ├── TodoInput.jsx
│   ├── TodoItem.jsx
│   └── TodoList.jsx
│
├── context/
│   ├── FilterContext.jsx
│   ├── ThemeContext.jsx
│   └── TodoContext.jsx
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Technologies Used

React, JavaScript, Vite, Context API, React Hooks, CSS, and localStorage.

## Running the Project Locally

Clone the repository and navigate into the project directory.

Install the dependencies:

npm install      # Install dependencies
npm run dev      # Start the development server
npm run build    # Create a production build

## What I Learned

This lab gave me more practice working with React's Context API and managing shared state across multiple components.

I was able to gain better understanding of when to use contexts instead of passing props, how to organize state into separate providers, and how React hooks like `useEffect`, `useCallback`, and `useMemo` work together.

I also practiced updating state without directly modifying existing data by using map(), filter(), and the spread operator, as well as using localStorage to save application data.

My main takeaway from this lab was gaining a better understanding of how to structure a React application so that multiple components can access and update shared state without having to pass props between them.