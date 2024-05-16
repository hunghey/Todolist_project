import React, { useState } from 'react'
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { v4 as uuidv4 } from 'uuid'
import { EditForm } from './EditForm';
uuidv4();

export const TodoWrapper = () => {

  const [todos, setTodos] = useState([

  ]);

  const addTodo = (todo) => {
    setTodos([...todos, { id: uuidv4(), task: todo, isCompleted: false, isEdited: false }]);
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
    setTodos(todos.map(todo => (todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo)))
  }
  return (
    <div className="TodoWrapper">
      <h1>Wellcome Todo List </h1>
      <TodoForm addTodo={addTodo} />

      {todos.map((todo) => (todo.isEdited ?
      (<EditForm editTodo={editTask} task={todo}/> )
      :(
        <Todo task={todo} key={todo.id} toggleCompleted={toggleCompleted} editTodo={editTodo} deleteTodo={deleteTodo} />
      )))}

    </div>

  )
}

