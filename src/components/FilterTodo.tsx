import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

// Định nghĩa giao diện cho các props
interface FilterTodoProps {
  renderedTodoList: (status: string) => void;
}

export const FilterTodo: React.FC<FilterTodoProps> = ({ renderedTodoList }) => {
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedValue(newValue);
    const target = event.target as HTMLElement;
    renderedTodoList(target.innerText.toLowerCase());
  };

  return (
    <>
      <Tabs
        value={selectedValue}
        onChange={handleChange}
        centered
        sx={{ paddingTop: "1rem" }}
      >
        <Tab label="All" className="emoContainer" sx={{ color: "#ffffff4d" }} />
        <Tab label="Pending" sx={{ color: "#ffffff4d" }} />
        <Tab label="Completed" sx={{ color: "#ffffff4d" }} />
      </Tabs>
    </>
  );
};
