import React, { useState } from 'react';

const InputCreate = ({ onTaskCreated }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleInputChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlApi = 'http://localhost:3000/create'; 
    const payload = { title: taskTitle };

    try {
      const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newTask = await response.json();
        onTaskCreated(newTask);
        setTaskTitle(''); 
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskTitle}
        onChange={handleInputChange}
        placeholder="Add a new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default InputCreate;
