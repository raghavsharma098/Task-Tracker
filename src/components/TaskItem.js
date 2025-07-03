import React from 'react';

const priorityColors = {
  Low: '#81c784',
  Medium: '#ffd54f',
  High: '#e57373',
};

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <div className={`task-item${task.completed ? ' completed' : ''}`} style={{ transition: 'background 0.3s, opacity 0.3s' }}>
      <div className="task-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <div className="task-info">
          <div className="task-title-row">
            <span className="task-title">{task.title}</span>
            <span className="priority-badge" style={{ background: priorityColors[task.priority] || '#bdbdbd' }}>{task.priority}</span>
          </div>
          {task.description && <div className="task-desc">{task.description}</div>}
          <div className="task-meta">
            <span>{new Date(task.createdAt).toLocaleString()}</span>
            {task.dueDate && <span className="due-date">Due: {task.dueDate}</span>}
            <span className={`status ${task.completed ? 'done' : 'pending'}`}>{task.completed ? 'Completed' : 'Pending'}</span>
          </div>
          {task.categories && task.categories.length > 0 && (
            <div className="task-categories">
              {task.categories.map(cat => (
                <span key={cat} className="category-badge">{cat}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)} className="delete">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem; 