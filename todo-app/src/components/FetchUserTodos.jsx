import { useState, useEffect } from "react";
import FetchUserTodo from "./FetchUserTodo";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5162/api/todo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setTodos)
      .catch(console.error);
  }, []);

  const handleClick = (id) => {
    setSelectedTodoId(id); // spara id för den todo som ska öppnas
  };

  const handleClose = () => {
    setSelectedTodoId(null); // stäng popup
  };

  return (
    <div>
      <h1>Alla Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}{" "}
            <button onClick={() => handleClick(todo.id)}>Öppna</button>
          </li>
        ))}
      </ul>

      {/* Visa popup endast om en todo är vald */}
      {selectedTodoId && (
        <div className="modal">
          <button onClick={handleClose}>Stäng</button>
          <FetchUserTodo id={selectedTodoId} />
        </div>
      )}
    </div>
  );
}
