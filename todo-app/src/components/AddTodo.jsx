import { useState } from "react";
import * as todoApi from "../../api/todo";

export default function AddTodo({refresh, setRefresh}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !priority) {
      setMessage("Fyll i både title och priority");
      return;
    }

    try {
      await fetch(`http://localhost:5162/api/todo/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          due_date: dueDate,
          priority: priority,
          status: null,
          created_at: new Date().toISOString()
        })
      });
      setRefresh(refresh + 1);
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
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          placeholder="Due Date"
        />
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Välj prioritet</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit">Lägg till</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
