import { useState, useEffect } from 'react';
import TodoCard from "../components/TodoCard"


export default function HomeTest() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5162/api/todo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setTodos)
      .catch(console.error);
  }, []);

  // Apply dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id, updates) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const sortedTodos = [...todos].sort((a, b) => {
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  // Sortera först på priority
  if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  }

  // Sortera sen på due_date
  return new Date(a.due_date) - new Date(b.due_date);
});



  const incompleteTodos = sortedTodos.filter(todo => !todo.status);
  const completedTodos = sortedTodos.filter(todo => todo.status);

  return (
    <div className="min-h-screen w-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8 w-screen">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Todo List</h1>
          <p className="text-muted-foreground">Organize your tasks efficiently</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6 items-start">
          {/* Left Side - Tasks (spans 2 columns) */}
          <div className="col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Tasks ({incompleteTodos.length})</h2>
            <div className="grid grid-cols-2 gap-3">
              {incompleteTodos.length > 0 ? (
                incompleteTodos.map((todo, index) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onEdit={editTodo}
                    onDelete={deleteTodo}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-12 text-muted-foreground">
                  <div className="text-6xl mb-4">📝</div>
                  <p>No tasks here</p>
                </div>
              )}
            </div>
            <div className="max-w-sm">
              <p>Add todo here</p>
            </div>
          </div>

          {/* Right Column - Completed todos (darker) */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Completed ({completedTodos.length})</h2>
            <div className="bg-muted/20 rounded-xl p-4 border border-border/50">
              <div className="space-y-3">
                {completedTodos.length > 0 ? (
                  completedTodos.map((todo, index) => (
                    <TodoCard
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onEdit={editTodo}
                      onDelete={deleteTodo}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="text-6xl mb-4">🎉</div>
                    <p>No completed tasks yet</p>
                    <p className="text-sm mt-2">Complete some tasks to see them here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-muted-foreground text-sm">
          <p>Click the circle to mark tasks as complete • Hover to edit or delete tasks</p>
        </div>
      </div>
    </div>
  );
}