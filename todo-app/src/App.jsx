import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Todo from "./components/Todo";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo"
import DeleteTodo from "./components/DeleteTodo"
import EditTodo from "./components/EditTodo"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/todos/:id" element={<Todo />} />
        <Route path="/todos/add" element={<AddTodo />} />
        <Route path="/todos/delete/:id" element={<DeleteTodo />} />
        <Route path="/todos/edit/:id" element={<EditTodo />} />
      </Routes>
    </Router>
  );
}
