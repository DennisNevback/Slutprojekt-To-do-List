import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from '@heroicons/react/24/solid';

export default function DeleteTodo({ id, refresh, setRefresh }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5162/api/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      if (!res.ok) {
        console.error("Något gick fel vid delete");
        return;
      }

      setRefresh(r => r + 1);
      setShowConfirm(false); // stäng popup
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="relative">
  <button
    onClick={() => setShowConfirm(true)}
    className="p-0 m-0 border-0 bg-transparent focus:outline-none scale-75 z-40"
  >
    <TrashIcon className="w-5 h-5 text-red-600 hover:text-red-800" />
  </button>

  {showConfirm && (
    <div
      className="absolute z-50 left-0 -top-8 bg-white dark:bg-black p-4 rounded-lg shadow-lg"
      style={{
        minWidth: "200px",
        width: "100%", // fyll hela containerns bredd
          }}
        onMouseLeave={() => setShowConfirm(false)}
    >
      <p className="mb-2">Are you sure you want to delete this todo?</p>
      <div className="flex justify-between gap-2">
        <button
          onClick={() => setShowConfirm(false)}
          className="px-2 py-1 bg-black rounded hover:bg-gray-400 text-white"
        >
          No
        </button>
        <button
          onClick={handleDelete}
          className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Yes
        </button>
  </div>
</div>
  )}
</div>


  );
}
