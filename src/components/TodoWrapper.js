import React, { useState } from 'react'
import { Todo } from './Todo';
import { v4 as uuidv4 } from 'uuid'
import { EditForm } from './EditForm';
import { FilterTodo } from './FilterTodo';
import FormTodo from './FormTodo';

uuidv4();

export const TodoWrapper = () => {

  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const addTodo = (todo) => {
    setTodos([...todos, { id: uuidv4(), task: todo, isCompleted: false, isEdited: false, status: 'pending', filterStatus: 'all' }]);
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEdited: !todo.isEdited } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEdited: !todo.isEdited } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted, status: 'completed' } : todo)))
  }

  const filterTodo = (text) => {
    setFilterStatus(text)
  }

  const renderedTodoList = todos.filter(todo => todo.status === filterStatus || filterStatus === 'all')

  return (
    <div className="TodoWrapper">
      <h1>Wellcome Todo List </h1>
      <FormTodo addTodo={addTodo} />

      {todos.length === 0 ? "" : <FilterTodo renderedTodoList={filterTodo} />}
      {renderedTodoList.map((todo) => (todo.isEdited ?
        (<EditForm editTodo={editTask} task={todo} />)
        : (
          <Todo task={todo} key={todo.id} toggleCompleted={toggleCompleted} editTodo={editTodo} deleteTodo={deleteTodo} />
        )
      ))}

    </div>

  )
}

