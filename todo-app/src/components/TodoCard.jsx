import { useState } from "react";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";

export default function TodoCard({ todo, onToggle, onEdit, onDelete , refresh, setRefresh}) {
  const { id, title, description, due_date, priority, status } = todo;

  // Bestäm färg baserat på priority
  const bgColor = priority === "High"
  ? "bg-red-200 dark:bg-red-800"
  : priority === "Medium"
    ? "bg-yellow-200 dark:bg-yellow-800"
    : priority === "Low"
      ? "bg-green-200 dark:bg-green-800"
      : "bg-green-100 dark:bg-green-700";

  return (
    <div
      className={`flex items-start justify-between p-4 rounded-lg ${bgColor} relative group`}
    >
      {/* Left: Checkbox */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={status === "completed"}
          onChange={() => onToggle(id)}
          className="sr-only peer"
        />
        <div className="w-5 h-5 rounded-full border border-gray-400 peer-checked:bg-blue-500 bg-black peer-checked:border-blue-600 transition-colors mr-2"></div>
      </label>

      {/* Middle: Title & Description */}
      <div className="flex-1">
        <h3 className={`font-semibold text-gray-900 dark:text-gray-100 ${
    status === "completed" ? "line-through text-gray-500 dark:text-gray-400" : ""
  }`}>{title}</h3>
        {description && (
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{description}</p>
        )}
        
      </div>
      <div className="flex-1 self-start ml-auto absolute right-3">
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Due: {new Date(due_date).toLocaleDateString()}
        </p>
      </div>

      {/* Right: Buttons (visas på hover) */}
      <div className="opacity-0 group-hover:opacity-100 absolute bottom-2 right-2 flex space-x-2 transition-opacity z-50">
        <EditTodo id={id} refresh={refresh} setRefresh={setRefresh}/>
        <DeleteTodo id={id} refresh={refresh} setRefresh={setRefresh}/>
      </div>
    </div>
  );
}
