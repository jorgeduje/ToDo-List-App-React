import React from 'react'


// Estilos 
import "../estilos/Todo.css"

const Todo = ({ title, status, handleCompleteTodo, id }) => {
    return (
        <div className="todo-card">
            <div className="todo-title">
                <h4>{title}</h4>
            </div>

            <div className="todo-actions">
                <button className={status ? "completed" : "reset"} onClick={() => handleCompleteTodo(id)}>{status? "completada" : "no completada"}</button>
            </div>
        
        </div>
    )
}

export default Todo