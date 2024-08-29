import React, { useState, useEffect } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo';
import axios from 'axios';
import { EditTodoForm } from './EditTodoForm';
import { v4 as uuidv4 } from 'uuid';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/livros');
      setTodos(response.data);
    } catch (error) {
      console.error("Erro ao buscar os livros:", error);
    }
  }

  const addTodo = async (novoLivro) => {
    try {
      const response = await axios.post('http://localhost:3000/livros', {
        titulo: novoLivro.titulo,
        autor: novoLivro.autor,
        ano: novoLivro.ano,
        categoria: novoLivro.categoria
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar o livro:", error);
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/livros/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
    }
  }

  const editTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
  }

  const editTask = async (task, id) => {
    try {
      const response = await axios.put(`http://localhost:3000/livros/${id}`, { task });
      setTodos(todos.map(todo => todo.id === id ? { ...response.data, isEditing: !todo.isEditing } : todo));
    } catch (error) {
      console.error("Erro ao editar o livro:", error);
    }
  }

  return (
    <div className='TodoWrapper'>
      <h1>Seus Livros!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) => (
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={index} />
        ) : (
          <Todo task={todo} key={index}
            deleteTodo={deleteTodo} editTodo={editTodo} />
        )
      ))}
    </div>
  )
}
