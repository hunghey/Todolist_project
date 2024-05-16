import React, { useState } from 'react'

export const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        addTodo(value)
        setValue('')
    }
    return (

        <form className='TodoForm' onSubmit={handleSubmit}>
            <input className='todo-input'
                placeholder='enter input'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className='todo-btn' >Add</button>
        </form>

    )
}
