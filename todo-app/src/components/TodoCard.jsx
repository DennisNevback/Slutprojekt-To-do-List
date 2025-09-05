import { useState } from "react";
import DeleteTodo from "./DeleteTodo";

export default function TodoCard({ todo, onToggle, onEdit, onDelete , refresh, setRefresh}) {
  const { id, title, description, due_date, priority, status } = todo;

  // Bestäm färg baserat på priority
  const bgColor = priority === "high"
    ? "bg-red-200 dark:bg-red-800"
    : priority === "medium"
      ? "bg-yellow-200 dark:bg-yellow-800"
      : "bg-green-200 dark:bg-green-800";

  return (
    <div
      className={`flex items-start justify-between p-4 rounded-lg ${bgColor} relative group`}
    >
      {/* Left: Checkbox */}
      <input
        type="checkbox"
        checked={status === "completed"}
        onChange={() => onToggle(id)}
        className="mr-4 mt-1 w-5 h-5 accent-blue-500 dark:accent-blue-400"
      />

      {/* Middle: Title & Description */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        {description && (
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{description}</p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Due: {new Date(due_date).toLocaleDateString()}
        </p>
      </div>

      {/* Right: Buttons (visas på hover) */}
      <div className="opacity-0 group-hover:opacity-100 flex space-x-2 ml-4 transition-opacity">
        <button
          onClick={() => onEdit(id)}
          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          Edit
        </button>
        <DeleteTodo id={id} refresh={refresh} setRefresh={setRefresh}/>
      </div>
    </div>
  );
}
