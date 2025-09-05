import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateTodo } from "../../api/todo";

export default function EditTodo({ id, refresh, setRefresh }) {
  const token = localStorage.getItem("token");

  const [fetchedTodo, setFetchedTodo] = useState(null); // Håller den gamla datan
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [user_id, setUser_id] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const fetchTodo = async () => {
    try {
      const res = await fetch(`http://localhost:5162/api/todo/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Fel vid hämtning av todo", res.status);
        return null;
      }

      const todoData = await res.json();
      setFetchedTodo(todoData); // spara för placeholder
      return todoData;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    await fetch(`http://localhost:5162/api/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title || fetchedTodo.title, 
        description: description || fetchedTodo.description,
        due_date: dueDate || fetchedTodo.due_date,
        priority: priority || fetchedTodo.priority,
        status: status || fetchedTodo.status,
        created_at: created_at || fetchedTodo.created_at
      }),
    });

    setMessage("Todo uppdaterad!");
    setRefresh(r => r + 1); // triggar ny fetch i useEffect
    setShowForm(false);
  } catch (err) {
    console.error(err);
    setMessage("Något gick fel vid uppdatering");
  }
};


  return (
    <div className="relative inline-block">
  <button
  onClick={async () => {
    const todoData = await fetchTodo();
    if (todoData) {
      setTitle(todoData.title || "");
      setDescription(todoData.description || "");
      setDueDate(todoData.due_date ? todoData.due_date.split("T")[0] : "");
      setPriority(todoData.priority || "");
      setStatus(todoData.status || "");
      setCreated_at(todoData.created_at || "");
      setUser_id(todoData.user_id || "");
    }
    setShowForm(true);
  }}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
  Edit
</button>

  {showForm && (
    <div className="absolute left-0 mt-2 bg-white dark:bg-black p-4 rounded-lg shadow-lg z-50 min-w-[300px]">
      <h2 className="text-lg font-semibold mb-2">Redigera Todo</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={fetchedTodo?.title || ""}
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={fetchedTodo?.description || ""}
          className="border rounded px-2 py-1"
        />
        <input
          type="date"
          value={dueDate || (fetchedTodo?.due_date ? fetchedTodo.due_date.split("T")[0] : "")}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded px-2 py-1 bg-black"
        >
          <option value="">{fetchedTodo?.priority || "Choose priority"}</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <div className="flex gap-2 mt-2">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Save
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )}
</div>



  );
}
