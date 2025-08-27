import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTodo, deleteTodo } from "../../api/todo";

export default function DeleteTodo() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // för att redirecta efter delete

  useEffect(() => {
    getTodo(id)
      .then(setTodo)
      .catch((err) => setMessage("Kunde inte hämta todo"));
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteTodo(id);
      setMessage(`Todo "${todo.title}" borttagen!`);
      // Redirect efter några sekunder, t.ex. tillbaka till listan
      setTimeout(() => navigate("/todos"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("Något gick fel vid borttagning");
    }
  };

  if (!todo) return <p>Laddar...</p>;

  return (
    <div>
      <h2>{todo.title}</h2>
      <p>Status: {todo.completed ? "Klar" : "Ej klar"}</p>
      <button onClick={handleDelete}>Ta bort</button>
      {message && <p>{message}</p>}
    </div>
  );
}
