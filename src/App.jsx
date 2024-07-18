import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InputCreate from './components/InputCreate';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>
            <h1>Task List</h1>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
          </div>
        </Route>
        <Route path="/create">
          <InputCreate onTaskCreated={handleTaskCreated} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
