import React, { useState, useEffect, useRef } from 'react';

const TaskForm = ({ onSave, editingTask, onCancel, priorityLevels = [], categoryOptions = [] }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority || 'Medium');
      setDueDate(editingTask.dueDate || '');
      setCategories(editingTask.categories || []);
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDueDate('');
      setCategories([]);
    }
    setError('');
  }, [editingTask]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    }
    if (catOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [catOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    onSave({
      ...editingTask,
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      categories,
    });
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
    setCategories([]);
  };

  const handleCategoryToggle = (cat) => {
    setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  return (
    <form className="task-form animated-fadein" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={e => { setTitle(e.target.value); setError(''); }}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="form-row">
        <label>Priority: </label>
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          {priorityLevels.map(lvl => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label>Due Date: </label>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      </div>
      <div className="form-row category-dropdown-row" ref={catRef}>
        <label>Categories: </label>
        <div className="category-dropdown">
          <div className="dropdown-selected" onClick={() => setCatOpen(o => !o)}>
            {categories.length ? categories.join(', ') : 'Select categories'}
            <span className="dropdown-arrow">▼</span>
          </div>
          {catOpen && (
            <div className="dropdown-list animated-dropdown">
              {categoryOptions.map(cat => (
                <label key={cat} className="dropdown-item">
                  <input
                    type="checkbox"
                    checked={categories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="form-actions">
        <button type="submit">{editingTask ? 'Update' : 'Add'} Task</button>
        {editingTask && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default TaskForm; 