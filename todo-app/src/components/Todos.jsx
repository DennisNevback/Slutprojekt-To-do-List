import { useState, useEffect } from 'react'
import * as todoApi from "../../api/todo.js"

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoApi.getAllTodo()
      .then((data) => setTodos(data))  // sparar todos i state
      .catch((err) => console.error(err));
  }, []);


  return (
    <div>
      <h2>Todos:</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title} - {todo.description}</li> // eller vilken property du har
        ))}
      </ul>
    </div>
  );
}

export default Todos
