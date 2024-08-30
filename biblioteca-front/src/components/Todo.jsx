import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task, deleteTodo, editTodo}) => {
  return (
    <div className='Todo'>
      <h5>
        {task.titulo}
      </h5> <br/>
      <p>
       Autor: {task.autor}
      </p>  
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task._id)}/>
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task._id)}/>
      </div>
    </div>
  )
}
