import React, { useState } from 'react'
import { Tabs, Tab } from '@mui/material';
import '../App.css';


export const FilterTodo = ({ renderedTodoList }) => {

  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedValue(newValue);
    renderedTodoList(event.target.innerText.toLowerCase());
  };

  return (
    <>
      <Tabs value={selectedValue} onChange={handleChange} centered>
        <Tab label="All" className = 'emoContainer'sx={{color: '#ffffff4d', }}/>
        <Tab label="Pending"  sx={{color: '#ffffff4d'}} />
        <Tab label="Completed" sx={{color: '#ffffff4d'}}/>
      </Tabs>
    </>
  )
}

