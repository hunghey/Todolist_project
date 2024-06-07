import React, { useState } from 'react'
import { Todo } from './Todo';
import { v4 as uuidv4 } from 'uuid'
import { EditForm } from './EditForm';
import { FilterTodo } from './FilterTodo';
import FormTodo from './FormTodo';
import { Modal, Box } from '@mui/material';

uuidv4();

interface TodoItem {
  id: string;
  task: string;
  isCompleted: boolean;
  status: string;
  filterStatus: string;
}

export const TodoWrapper: React.FC = () => {

  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<TodoItem | null>(null);

  const addTodo = (todo: string) => {
    if (isUpdating) return;
    setTodos([...todos, { id: uuidv4(), task: todo, isCompleted: false, status: 'pending', filterStatus: 'all' }]);
  };

  const handleEditClick = (task: TodoItem) => {
    setEditTask(task);
    setIsUpdating(true);
  };

  const updateTask = (task: string, id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task} : todo
      )
    );
    setIsUpdating(false); // Kết thúc quá trình cập nhật
    setEditTask(null);
  };


  const deleteTodo = (id: string) => {
    if (isUpdating) return; 
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id: string) => {
    if (isUpdating) return; 
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted, status: 'completed' } : todo)))
  }

  const filterTodo = (text: string) => {
    setFilterStatus(text)
  }

  const renderedTodoList = todos.filter(todo => todo.status === filterStatus || filterStatus === 'all')

  return (
    <div className="TodoWrapper">
      <h1>Wellcome Todo List </h1>
      <FormTodo addTodo={addTodo} />

      {todos.length === 0 ? "" : <FilterTodo renderedTodoList={filterTodo} />}
       {renderedTodoList.map((todo) => (
        <Todo
          task={todo}
          key={todo.id}
          toggleCompleted={toggleCompleted}
          editTodo={() => handleEditClick(todo)}
          deleteTodo={deleteTodo}
        />
      ))}

      {editTask && (
        <Modal open={isUpdating} onClose={() => setIsUpdating(false)}>
          <Box sx={{ ...modalStyle }}>
            <EditForm editTodo={updateTask} task={editTask} />
          </Box>
        </Modal>
      )}
    </div>

  )
}
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
