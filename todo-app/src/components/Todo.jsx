import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getTodo } from "../../api/todo";

export default function TodoDetails() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    getTodo(id).then(setTodo).catch(console.error);
  }, [id]);

  if (!todo) return <p>Laddar...</p>;

  return (
    <div>
      <h2>{todo.title}</h2>
      <p>Status: {todo.completed ? "Klar" : "Ej klar"}</p>
    </div>
  );
}
