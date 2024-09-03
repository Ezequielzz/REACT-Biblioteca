'use client';


import { useState, useEffect } from 'react';


export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');


  useEffect(() => {
    fetchTodos();
  }, []);


  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data.data);
  };


  const addTodo = async () => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTodo }),
    });
    const data = await response.json();
    setTodos([...todos, data.data]);
    setNewTodo('');
  };


  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const toggleComplete = async (id, completed) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !completed }),
    });
    const data = await response.json();
    setTodos(todos.map(todo =>
      todo._id === id ? { ...todo, completed: data.data.completed } : todo
    ));
  };


  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Adicionar Tarefa</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              onClick={() => toggleComplete(todo._id, todo.completed)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor:'pointer' }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
