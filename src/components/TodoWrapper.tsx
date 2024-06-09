import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../todoService";
import { EditForm } from "./EditForm";
import { FilterTodo } from "./FilterTodo";
import FormTodo from "./FormTodo";
import { Modal, Box } from "@mui/material";

interface TodoItem {
  id: string;
  task: string;
  isCompleted: boolean;
  filterStatus: string;
}

export const TodoWrapper: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<TodoItem | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (todo: string) => {
    if (isUpdating) return;
    try {
      const newTodo = await addTodo(todo);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleEditClick = (task: TodoItem) => {
    setEditTask(task);
    setIsUpdating(true);
  };

  const updateTask = async (task: string, id: string) => {
    try {
      const updatedTodo = await updateTodo(id, { task });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      setIsUpdating(false);
      setEditTask(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (isUpdating) return;
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleCompleted = async (id: string) => {
    if (isUpdating) return;
    const todoToToggle = todos.find((todo) => todo.id === id);
    if (!todoToToggle) return;
    try {
      const updatedTodo = await updateTodo(id, {
        isCompleted: !todoToToggle.isCompleted,
      });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const filterTodo = (text: string) => {
    setFilterStatus(text);
  };

  const renderedTodoList = todos.filter(
    (todo) =>
      filterStatus === "all" ||
      (filterStatus === "completed" && todo.isCompleted) ||
      (filterStatus === "pending" && !todo.isCompleted)
  );

  return (
    <div className="TodoWrapper">
      <h1>Wellcome Todo List </h1>
      <FormTodo addTodo={handleAddTodo} />

      {todos.length === 0 ? "" : <FilterTodo renderedTodoList={filterTodo} />}
      {renderedTodoList.map((todo) => (
        <Todo
          task={todo}
          key={todo.id}
          toggleCompleted={toggleCompleted}
          editTodo={() => handleEditClick(todo)}
          deleteTodo={handleDeleteTodo}
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
  );
};
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
