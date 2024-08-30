import React, {useState} from 'react'

export const EditTodoForm = ({editTodo, task}) => {
    const [titulo, setTitulo] = useState(task.titulo);
    const [autor, setAutor] = useState(task.autor);
    const [ano, setAno] = useState(task.ano);
    const [genero, setGenero] = useState(task.genero);

    const handleSubmit = e => {
        e.preventDefault();

        editTodo({titulo, autor, ano, genero}, task._id);
    }

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
        <input
        type="text"
        className='todo-input'
        value={titulo}
        placeholder='Atualize o título' 
        onChange={(e) => setTitulo(e.target.value)}
        />
        <input
        type="text"
        className='todo-input'
        value={autor}
        placeholder='Atualize o autor' 
        onChange={(e) => setAutor(e.target.value)}
        />
        <input
        type="text"
        className='todo-input'
        value={ano}
        placeholder='Atualize o ano' 
        onChange={(e) => setAno(e.target.value)}
        />
        <input
        type="text"
        className='todo-input'
        value={genero}
        placeholder='Atualize a Gênero' 
        onChange={(e) => setGenero(e.target.value)}
        /><br/>

        <button type='submit' className='todo-btn'>Editar Livro</button>
    </form>
  )
}
