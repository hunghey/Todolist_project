import React, { useState } from 'react'

export const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState('')
    const [errorMessage, setErrorMessage] = useState(null);

    const handleAdd = e => {
        e.preventDefault()
        if (!value.trim()) { 
            setErrorMessage('Please enter a valid todo item.');
            return;
        }
        addTodo(value)
        setValue('')
    }

    const handleChange = (event) => {
        setValue(event.target.value);
        setErrorMessage(null); // Clear error message on input change
    };
    return (
        <form className='TodoForm' onSubmit={handleAdd}>
            <input className='todo-input'
                placeholder='Enter your task'
                value={value}
                onChange={handleChange}
            />
            <button className='todo-btn' >Add</button>
            {errorMessage && <p style={{ color: '#c13a3a' }}>{errorMessage}</p>}
        </form>
    )
}
