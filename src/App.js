import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import { getUsername, removeUsername } from './utils/localStorage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { getTasks, setTasks } from './utils/localStorage';
import './styles/App.css';

const PRIORITY_LEVELS = ['Low', 'Medium', 'High'];
const CATEGORY_OPTIONS = ['Work', 'Personal', 'Urgent', 'Other'];

const App = () => {
  const [username, setUsername] = useState('');
  const [tasks, setTasksState] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    setUsername(getUsername());
  }, []);

  useEffect(() => {
    if (username) {
      setTasksState(getTasks(username));
    } else {
      setTasksState([]);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      setTasks(username, tasks);
    }
  }, [tasks, username]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const handleLogin = (name) => {
    setUsername(name);
    setTasksState(getTasks(name));
  };

  const handleLogout = () => {
    removeUsername();
    setUsername('');
    setTasksState([]);
  };

  const handleAddOrEditTask = (task) => {
    if (task.id) {
      setTasksState(prev => prev.map(t => t.id === task.id ? { ...t, ...task } : t));
      setEditingTask(null);
    } else {
      const newTask = {
        id: Date.now().toString(),
        title: task.title,
        description: task.description,
        completed: false,
        createdAt: new Date().toISOString(),
        priority: task.priority || 'Medium',
        dueDate: task.dueDate || '',
        categories: task.categories || [],
      };
      setTasksState(prev => [newTask, ...prev]);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasksState(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleToggle = (id) => {
    setTasksState(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleFilterChange = (f) => {
    setFilter(f);
  };

  const handleCategoryFilter = (cat) => {
    setCategoryFilter(cat);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'pending' && task.completed) return false;
    if (categoryFilter !== 'All' && (!task.categories || !task.categories.includes(categoryFilter))) return false;
    if (search && !(`${task.title} ${task.description}`.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const counts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={`app-container${darkMode ? ' dark' : ''}`}>
      <header>
        <h1>Personal Task Tracker</h1>
        <div className="user-info">
          <span>Welcome, {username}!</span>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => setDarkMode(dm => !dm)}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </div>
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="category-filter">
        <label>Category: </label>
        <select value={categoryFilter} onChange={e => handleCategoryFilter(e.target.value)}>
          <option value="All">All</option>
          {CATEGORY_OPTIONS.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <TaskForm
        onSave={handleAddOrEditTask}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
        priorityLevels={PRIORITY_LEVELS}
        categoryOptions={CATEGORY_OPTIONS}
      />
      <TaskFilter filter={filter} counts={counts} onFilterChange={handleFilterChange} />
      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
        priorityLevels={PRIORITY_LEVELS}
        categoryOptions={CATEGORY_OPTIONS}
      />
    </div>
  );
};

export default App;
