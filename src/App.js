import React, {useEffect, useState} from 'react';



// Componentes 
import Header from './componentes/Header';
import Loader from './componentes/Loader';
import Todo from './componentes/Todo';


// Estilos
import "./estilos/App.css"


const App = ()=> {

  // STATES
    const [todoList, setTodoList] = useState([])
    const [filtro, setFiltro] = useState(null)
    const [buttonComplete, setButtonComplete] = useState(0)
    const [buttonUnComplete, setButtonUnComplete] = useState(0)

  // EFFECTS

  useEffect(()=>{

    const handleTodoList = async () =>{

      const response = await fetch ("https://jsonplaceholder.typicode.com/todos")
      const result = await response.json();
      const resultTodoList = result.slice (0, 20);
      setTodoList(resultTodoList)
      setFiltro(resultTodoList)
    }
    
    handleTodoList()
    
  }, []);

useEffect(()=>{

  const contadorTareas = ()=>{
    const complete = todoList.filter( x => x.completed === true)
    setButtonComplete(complete.length)

    const unComplete = todoList.filter( x => x.completed === false)
    setButtonUnComplete(unComplete.length)
  }

  contadorTareas()

})



  const handleFilter = (valor)=>{

    if(valor === null){
      setFiltro(todoList)
      
    }
    else if(valor === true){
      setFiltro(todoList.filter( filtrados => filtrados.completed === true
        ))
        
    }
    else if(valor === false){
      setFiltro(todoList.filter(filtrados => filtrados.completed === false))
        
    }

    
  }





  // Funciones

  const handleCompleteTodo = (id)=>{
    
    setTodoList(todoList.map(todo => todo.id === id ? {...todo, completed: !todo.completed}: todo))
    setFiltro(filtro.map(todo => todo.id === id ? {...todo, completed: !todo.completed}: todo))

  }



  return (

    <div className="App">

      <Header handleFilter={handleFilter} filtro={todoList.length} cantidadCompletadas={buttonComplete} cantidadNoCompletadads={buttonUnComplete}/>

    <div className="todo-container">
      {
        filtro && filtro.length > 0 ? (filtro.map(( singleTodo )=>{
          return(

           <Todo 
           key={singleTodo.id} 
           title={singleTodo.title}
           status={singleTodo.completed}
           handleCompleteTodo={handleCompleteTodo}
           id={singleTodo.id}
           
           />

          )
        })) : (<Loader />)
      }
      </div>


    </div>
  );

}

export default App;
