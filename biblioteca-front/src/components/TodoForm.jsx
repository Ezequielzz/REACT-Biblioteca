import React, { useState } from 'react'

export const TodoForm = ({ addTodo }) => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [genero, setGenero] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    // Enviar os dados no formato esperado pela API
    addTodo({ titulo, autor, ano, genero });

    // Limpar os campos do formulário
    setTitulo("");
    setAutor("");
    setAno("");
    setGenero("");
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
        value={genero}
        placeholder='Gênero do livro'
        onChange={(e) => setGenero(e.target.value)}
      />
      <br />
      <button type='submit' className='todo-btn'>Adicionar Livro</button>
    </form>
  )
}
