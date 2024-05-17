import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { TbEdit } from 'react-icons/tb'

export const Todo = ({ task, toggleCompleted, editTodo, deleteTodo }) => {
  return (
    <div className='Todo'>
      <input type="checkbox"
      onClick={() => toggleCompleted(task.id)}
      className={`todoItem ${task.isCompleted ? 'completed' : ""}`} />
      <p className={`todoItem ${task.isCompleted ? 'completed' : ""}`}>{task.task}</p>
      <div className="btn-container">
        <div><TbEdit onClick={(e) => editTodo(task.id)} /></div>
        <div><AiFillDelete className='edit-icon' onClick={(e) => deleteTodo(task.id)} /></div>
      </div>
    </div>
  )
}

