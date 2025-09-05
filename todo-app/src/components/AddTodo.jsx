import { useState } from "react";
import * as todoApi from "../../api/todo";

export default function AddTodo({refresh, setRefresh}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !priority) {
      setMessage("Choose at a minimum a title and priority");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5162/api/todo/`, {
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

      if (!res.ok) {
        console.log("aydyayda")
        console.log(res)
        setMessage("Kunde inte lägga till todo...");
        return; // stoppar här
      }
      setRefresh(refresh + 1);
      setMessage("Todo added!");
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setMessage("Något gick fel...");
      
    }
  };

  return (
    <div className="p-4">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          New Todo
        </button>
      ) : (
        <div className="mt-4 p-4 border rounded-lg shadow bg-grey max-w-md">
          <h2 className="text-lg font-semibold mb-2">Lägg till ny Todo</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border rounded px-2 py-1"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border rounded px-2 py-1"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border rounded px-2 py-1 bg-black appearance-none"
            >
              <option value="">Choose priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add
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
          {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        </div>
      )}
    </div>
  );
}
