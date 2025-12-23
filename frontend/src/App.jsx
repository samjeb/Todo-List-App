import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);


  const fetchTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  const addTodo = async () => {
    if (!title.trim()) return;

    const res = await api.post("/todos", { title });
    setTodos([...todos, res.data]);
    setTitle("");
  };


  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

return (
  <div className="app">
    <h2>Todo App</h2>

    <div className="input-group">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTodo}>Add</button>
    </div>

    <ul>
      {todos.map(todo => (
        <li key={todo._id}>
          {todo.title}
          <button onClick={() => deleteTodo(todo._id)}>✕</button>
        </li>
      ))}
    </ul>
  </div>
);

}

export default App;
