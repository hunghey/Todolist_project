const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    filterStatus: {
      type: DataTypes.STRING,
      defaultValue: "all",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Todo;
