import React from 'react';

const TaskFilter = ({ filter, counts, onFilterChange }) => {
  return (
    <div className="task-filter">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => onFilterChange('all')}
      >
        All ({counts.all})
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => onFilterChange('completed')}
      >
        Completed ({counts.completed})
      </button>
      <button
        className={filter === 'pending' ? 'active' : ''}
        onClick={() => onFilterChange('pending')}
      >
        Pending ({counts.pending})
      </button>
    </div>
  );
};

export default TaskFilter; 