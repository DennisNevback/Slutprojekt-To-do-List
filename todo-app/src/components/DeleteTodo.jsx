import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTodo, deleteTodo } from "../../api/todo";

import { TrashIcon } from '@heroicons/react/24/solid';

export default function DeleteTodo({ id, refresh, setRefresh }) {
  const [todo, setTodo] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // för att redirecta efter delete


  const handleDelete = async (e) => {
    try {
      const res = await fetch(`http://localhost:5162/api/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      console.log("Res:", res);
      console.log("Delete response status:", res.status);

      if (!res.ok) {
        console.error("Något gick fel vid delete");
        return;
      }

      setRefresh(r => r + 1);
    }

    catch (e) { 
      console.log(e);
    };
  }


  return (
    <div>
      <button onClick={handleDelete} className="p-0 m-0 border-0 bg-transparent focus:outline-none">
        <TrashIcon 
          className="w-5 h-5 text-red-600 hover:text-red-800" 
        />
      </button>
    </div>
  );
}
