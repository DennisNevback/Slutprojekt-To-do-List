import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateTodo } from "../../api/todo";
import { ArrowLeftEndOnRectangleIcon  } from '@heroicons/react/24/solid';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <button className="bg-transparent p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 absolute right-5 top-5" onClick={handleLogout}>
      <ArrowLeftEndOnRectangleIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
    </button>
  );
}
