const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("./models/database");
const Todo = require("./models/todo");

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000", // Thay thế bằng URL của ứng dụng React của bạn
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Đồng bộ hóa các model với cơ sở dữ liệu
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized.");
  })
  .catch((err) => {
    console.error("Error synchronizing the database:", err);
  });
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/todos", async (req, res) => {
  const { task } = req.body;
  const newTodo = {
    id: uuidv4(),
    task,
    isCompleted: false,
    status: "pending",
    filterStatus: "all",
  };

  try {
    const todo = await Todo.create(newTodo);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { task, isCompleted, filterStatus } = req.body;
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      if (task !== undefined) todo.task = task;
      if (isCompleted !== todo.isCompleted) todo.isCompleted = isCompleted;
      if (filterStatus !== todo.filterStatus) todo.filterStatus = filterStatus;
      await todo.save();
      res.json(todo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      await todo.destroy();
      res.json({ message: "Delete todo successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.error("Error delete todo", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
