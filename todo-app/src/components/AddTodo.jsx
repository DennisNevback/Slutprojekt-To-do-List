import { useState } from "react";
import * as todoApi from "../../api/todo";



//Funkar bar som en egen sida just nu - skriv om till komponent.
export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [user_id, setUser_id] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !user_id) {
      setMessage("Fyll i både title och user_id");
      return;
    }

    try {
      const newTodo = await todoApi.addTodo({ title, user_id, completed: false });
      setMessage(`Todo "${newTodo.title}" skapad!`);
      setTitle("");
      setUser_id("");
    } catch (err) {
      console.error(err);
      setMessage("Något gick fel...");
    }
  };

  return (
    <div>
      <h2>Lägg till ny Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titel"
        />
        <input
          type="number"
          value={user_id}
          onChange={(e) => setUser_id(e.target.value)}
          placeholder="user_id"
        />
        <button type="submit">Lägg till</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
