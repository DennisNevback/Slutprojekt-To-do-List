const API_BASE = "http://localhost:5162/api";

export const getTodo = async (id) => {
  const response = await fetch(`${API_BASE}/todo/${id}`);
  if (!response.ok) {
    throw new Error("Could not find todo");
  }
  return response.json();
};

export const getAllTodo = async () => {
  const response = await fetch(`${API_BASE}/todo`);
  if (!response.ok) {
    throw new Error("Could not find todos");
  }
  return response.json();
};

export const addTodo = async (todo) => {
  const response = await fetch(`${API_BASE}/todo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Could not add todo");
  }

  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_BASE}/todo/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    throw new Error("Could not find todo");
  }

  try {
    return await response.json();
  } catch {
    return null; 
  }
};

export const updateTodo = async (id, todo) => {
  const response = await fetch(`${API_BASE}/todo/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  });

  if (!response.ok) {
    throw new Error("Could not find update todo");
  }

  try {
    return await response.json();
  } catch {
    return null; 
  }
};