import { useEffect, useState } from "react";

export default function FetchUserTodo({ id }) {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5162/api/todo/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setTodo)
      .catch(console.error);
  }, [id]);

  if (!todo) return <p>Laddar...</p>;

  return (
    <div>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
    </div>
  );
}
