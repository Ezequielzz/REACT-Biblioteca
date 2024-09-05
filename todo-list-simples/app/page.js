'use client';

import { useState, useEffect } from 'react'; // Importa hooks do React: useState para gerenciar o estado e useEffect para efeitos colaterais

// Função principal do componente, que representa a página To-Do List
export default function Home() {
  // useState para armazenar a lista de todos e o valor da nova tarefa a ser adicionada
  const [todos, setTodos] = useState([]); // Inicialmente, a lista de todos é um array vazio
  const [newTodo, setNewTodo] = useState(''); // Inicialmente, o campo de nova tarefa é uma string vazia

  // useEffect para executar o fetchTodos (carregar as tarefas) assim que o componente é montado
  useEffect(() => {
    fetchTodos(); // Carrega as tarefas assim que o componente é renderizado
  }, []); // O array vazio como segundo argumento garante que o fetch seja feito apenas na primeira renderização

  // Função assíncrona para buscar as tarefas na API
  const fetchTodos = async () => {
    const response = await fetch('/api/todos'); // Faz uma requisição GET para a API
    const data = await response.json(); // Converte a resposta para JSON
    setTodos(data.data); // Atualiza o estado com os dados recebidos (lista de todos)
  };

  // Função assíncrona para adicionar uma nova tarefa à lista
  const addTodo = async () => {
    const response = await fetch('/api/todos', {
      method: 'POST', // Requisição do tipo POST para adicionar uma nova tarefa
      headers: {
        'Content-Type': 'application/json', // Define o tipo do corpo da requisição como JSON
      },
      body: JSON.stringify({ title: newTodo }), // O corpo da requisição contém o título da nova tarefa
    });
    const data = await response.json(); // Converte a resposta para JSON
    setTodos([...todos, data.data]); // Adiciona a nova tarefa ao final da lista de todos
    setNewTodo(''); // Limpa o campo de input após a adição
  };

  // Função assíncrona para excluir uma tarefa pelo ID
  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE', // Requisição do tipo DELETE para remover a tarefa
    });
    setTodos(todos.filter((todo) => todo._id !== id)); // Atualiza o estado, removendo a tarefa excluída da lista
  };

  // Função assíncrona para alternar o estado de completado de uma tarefa (true ou false)
  const toggleComplete = async (id, completed) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT', // Requisição do tipo PUT para atualizar a tarefa
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !completed }), // Altera o campo 'completed' para o valor oposto
    });
    const data = await response.json(); // Converte a resposta para JSON
    setTodos(todos.map(todo =>
      todo._id === id ? { ...todo, completed: data.data.completed } : todo // Atualiza o estado da tarefa específica na lista
    ));
  };

  // O JSX define a interface do componente
  return (
    <div>
      <h1>To-Do List</h1>
      {/* Input para adicionar uma nova tarefa */ }
      <input
        type="text"
        value={newTodo} // O valor do input é controlado pelo estado newTodo
        onChange={(e) => setNewTodo(e.target.value)} // Atualiza o estado com o valor digitado
      />
      {/* Botão para adicionar a nova tarefa */}
      <button onClick={addTodo}>Adicionar Tarefa</button>

      {/* Lista de tarefas */}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}> {/* Cada tarefa precisa de uma chave única */}
            <span
              onClick={() => toggleComplete(todo._id, todo.completed)} // Ao clicar no título da tarefa, ela alterna o status de completado
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }} // Tarefas completas têm texto riscado
            >
              {todo.title} {/* Exibe o título da tarefa */}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Excluir</button> {/* Botão para excluir a tarefa */}
          </li>
        ))}
      </ul>
    </div>
  );
}
