import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
    try {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    } catch (error) {
        // Handle parsing error, e.g., if stored data is not valid JSON
        console.error("Error parsing 'todos' from localStorage:", error);
        return [];
    }
};


const saveToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};



const initialState = {
    todos: loadFromLocalStorage()
}
export const todoSlice = createSlice(
    {
        name: 'todo',
        initialState,
        reducers: {
            addTodo: (state, action) => {
                const todo = {
                    id: nanoid(),
                    todo: action.payload,
                    completed: false
                }
                state.todos.push(todo)
                saveToLocalStorage(state.todos)

            },
            deleteTodo: (state, action) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload)
                saveToLocalStorage(state.todos)
            },


            updatedTodo: (state, action) => {
                state.todos = state.todos.map((prev) =>
                    prev.id === action.payload.id ? { ...prev, todo: action.payload.todo } : prev
                );

                saveToLocalStorage(state.todos);
            },
            toggleComplete: (state, action) => {
                state.todos = state.todos.map((prev) => prev.id === action.payload ? { ...prev, completed: !prev.completed } : prev)
                saveToLocalStorage(state.todos)
            },
            // loadFromLocalStorage: () => {
            //     const todos = localStorage.getItem('todos');
            //     return todos ? JSON.parse(todos) : [];
            // }

        }
    }
);

export const { addTodo, deleteTodo, updatedTodo, toggleComplete } = todoSlice.actions;

export default todoSlice.reducer