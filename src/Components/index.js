import { useState } from "react";

const TodoForm = () => {
    const [todos, setTodos] = useState([]);
    const addTodo = (todo) => {
        setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
    };
    console.log(todos)
    addTodo({ todo: 'name' })


    return <div></div>;
};

export default TodoForm;
