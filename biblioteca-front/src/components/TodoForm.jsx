import React, { useState } from 'react'

export const TodoForm = ({ addTodo }) => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    // Enviar os dados no formato esperado pela API
    addTodo({ titulo, autor, ano, categoria });

    // Limpar os campos do formulário
    setTitulo("");
    setAutor("");
    setAno("");
    setCategoria("");
  }

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <input
        type="text"
        className='todo-input'
        value={titulo}
        placeholder='Título do livro'
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        className='todo-input'
        value={autor}
        placeholder='Autor do livro'
        onChange={(e) => setAutor(e.target.value)}
      />
      <input
        type="text"
        className='todo-input'
        value={ano}
        placeholder='Ano de publicação'
        onChange={(e) => setAno(e.target.value)}
      />
      <input
        type="text"
        className='todo-input'
        value={categoria}
        placeholder='Categoria do livro'
        onChange={(e) => setCategoria(e.target.value)}
      />
      <button type='submit' className='todo-btn'>Adicionar Livro</button>
    </form>
  )
}
