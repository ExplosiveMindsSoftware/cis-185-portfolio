import { useState, useEffect } from 'react'
import './App.css'


function TaskInput({onAddTask}) {
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if(text.trim === " ") return;

    onAddTask(text);
    setText('');
  
  }

  return (
    <form onSubmit = {handleSubmit} className = "task-input">
      <input
        type = "text"
        value = {text}
        onChange = {(e) => setText (e.target.value)}
        placeholder = "What's on the list?"
      />
      <button type = "submit">Add Task</button>
    </form>
  )
}


function TaskList ({tasks, onToggleComplete, onDelete}) {
  if (tasks.length === 0) {
    return <p>No tasks found</p>
  }

  return (
    <ul className = "task-list">
      {tasks.map((task) => (
        <TaskItem
          key = {task.id}
          task = {task}
          onToggleComplete = {onToggleComplete}
          onDelete = {onDelete}
        />
      ))}
    </ul>
  )
  
}

function TaskItem ({task, onToggleComplete, onDelete}) {
  return (
    <li className = "task-item">
      <label>
        <input
          type = "checkbox"
          checked = {task.completed}
          onChange = {() => onToggleComplete(task.id)}
        />
        <span className = {task.completed ? 'completed' : ''}>{task.text}</span>
        <button onClick = {() => onDelete (task.id)}>Delete</button>
      </label>
    </li>
  )

}

function FilterButtons ({currentFilter, onChangeFilter}) {
  return (
    <div className = "filter-buttons">
      <button
        className = {currentFilter === 'all' ? 'active' : ''}
        onClick = {() => onChangeFilter('all')}>All</button>

      <button
        className = {currentFilter === 'active' ? 'active' : ''}
        onClick = {() => onChangeFilter('active')}>Active</button>
  
      <button
        className = {currentFilter === 'completed' ? 'active' : ''}
        onClick = {() => onChangeFilter('completed')}>Completed</button>
    </div>
  )

}

function App(){
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(), // Unique ID using timestamp
      text: text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  // Handler: Toggle Complete
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Handler: Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filtering Logic
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  // Calculate remaining active tasks
  const activeCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      
      <TaskInput onAddTask={addTask} />
      
      <FilterButtons currentFilter={filter} setFilter={setFilter} />
      
      <div className="stats">
        {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
      </div>

      <TaskList 
        tasks={filteredTasks} 
        onToggleComplete={toggleTask} 
        onDelete={deleteTask} 
      />
    </div>
  );

}

export default App;