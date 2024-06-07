import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { TbEdit } from 'react-icons/tb'

// Định nghĩa giao diện cho các props
interface TodoProps {
  task: {
    id: string;
    task: string;
    isCompleted: boolean;
  };
  toggleCompleted: (id: string) => void;
  editTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  // isUpdating: boolean;
}

export const Todo: React.FC<TodoProps> = ({ task, toggleCompleted, editTodo, deleteTodo }) => {
  return (
    <div className='Todo'>
      <p onClick={() => toggleCompleted(task.id)} className={`todoItem ${task.isCompleted ? 'completed' : ""}`}
        style={{ paddingLeft: "0.75rem" }}>{task.task}</p>
      <div className="btn-container">
        <div><TbEdit onClick={() => 
         !task.isCompleted && editTodo(task.id)} 
          style={{ display: task.isCompleted ? 'none' :'' }}/>
        </div>
        <div><AiFillDelete className='edit-icon' onClick={(e) => deleteTodo(task.id)} /></div>
      </div>
    </div>
  )
}

