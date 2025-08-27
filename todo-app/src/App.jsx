import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Todo from "./components/Todo";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo"
import DeleteTodo from "./components/DeleteTodo"
import EditTodo from "./components/EditTodo"

export default function App() {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/todos">Alla Todos</Link>
      </nav>

      <Routes>
        <Route path="/todos" element={<Todos />} />
        <Route path="/todos/:id" element={<Todo />} />
        <Route path="/todos/add" element={<AddTodo />} />
        <Route path="/todos/delete/:id" element={<DeleteTodo />} />
        <Route path="/todos/edit/:id" element={<EditTodo />} />
      </Routes>
    </Router>
  );
}
