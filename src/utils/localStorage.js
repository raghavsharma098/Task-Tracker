
export const getTasks = (username) => {
  if (!username) return [];
  const tasks = localStorage.getItem(`tasks_${username}`);
  return tasks ? JSON.parse(tasks) : [];
};

export const setTasks = (username, tasks) => {
  if (!username) return;
  localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
};

export const getUsername = () => {
  return localStorage.getItem('username') || '';
};

export const setUsername = (username) => {
  localStorage.setItem('username', username);
};

export const removeUsername = () => {
  localStorage.removeItem('username');
}; 