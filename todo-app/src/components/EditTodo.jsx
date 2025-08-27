import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTodo, updateTodo } from "../../api/todo";

export default function EditTodo() {
  const { id: idString } = useParams();
  const id = Number(idString); // konvertera direkt till nummer
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [user_id, setUser_id] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDue_date] = useState("");
  const [priority, setPriority] = useState("");
  const [status, SetStatus] = useState("");
  const [created_at, SetCreated_at] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getTodo(id)
      .then((data) => {
        setTodo(data);
        setUser_id(data.user_id);
        setTitle(data.title);
        setDescription(data.description);
        setDue_date(data.due_date);
        setPriority(data.priority);
        SetStatus(data.status);
        SetCreated_at(data.created_at);
      })
      .catch((err) => setMessage("Kunde inte hämta todo"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTodo(id, { title, user_id });
      setMessage("Todo uppdaterad!");
      setTimeout(() => navigate("/todos"), 1000); // Redirect tillbaka
    } catch (err) {
      console.error(err);
      setMessage("Något gick fel vid uppdatering");
    }
  };

  if (!todo) return <p>Laddar...</p>;

  return (
    <div>
      <h2>Redigera Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>
          Klar:
          <input
            type="Number"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
          />
        </label>
        <button type="submit">Spara</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
