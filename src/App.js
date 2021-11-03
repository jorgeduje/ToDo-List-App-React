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
    const [filtroComplete, setFiltroComplete] = useState([])
    const [filtroUnComplete, setFiltroUnComplete] = useState([])
    const [valor, setValor] = useState(undefined)
    const [buttonComplete, setButtonComplete] = useState(0)
    const [buttonUnComplete, setButtonUnComplete] = useState(0)

  // EFFECTS

  useEffect(()=>{

    const handleTodoList = async () =>{

      const response = await fetch ("https://jsonplaceholder.typicode.com/todos")
      const result = await response.json();
      const resultTodoList = result.slice (0, 20);
      setTodoList(resultTodoList)
      setValor("todo")
    }
    
    handleTodoList()
    
  }, []);

useEffect(()=>{

  const contadorTareas = ()=>{
    const complete = todoList.filter( x => x.completed === true)
    setButtonComplete(complete.length)
    setFiltroComplete(complete)

    const unComplete = todoList.filter( x => x.completed === false)
    setButtonUnComplete(unComplete.length)
    setFiltroUnComplete(unComplete)

  }

  contadorTareas()

})



  const handleFilter = (valor)=>{

    if(valor === null){
      
      setValor("todo")
      
    }
    else if(valor === true){
      setValor("complete")
    }
        
    
    else if(valor === false){
      setValor("uncomplete")
    }
    
  }


  const handleRenderTodos = ()=>{

    if(valor === "todo"){

      return(
        (todoList.map(( singleTodo )=>
          (

           <Todo 
           key={singleTodo.id} 
           title={singleTodo.title}
           status={singleTodo.completed}
           handleCompleteTodo={handleCompleteTodo}
           id={singleTodo.id}
           
           />

          )
        ))
      )

    }else if (valor === "complete"){

      return(
        (filtroComplete.map(( singleTodo )=>
          (

           <Todo 
           key={singleTodo.id} 
           title={singleTodo.title}
           status={singleTodo.completed}
           handleCompleteTodo={handleCompleteTodo}
           id={singleTodo.id}
           
           />

          )
        )) 
      )

    }else if(valor === "uncomplete"){

      return(
        (filtroUnComplete.map(( singleTodo )=>
          (

           <Todo 
           key={singleTodo.id} 
           title={singleTodo.title}
           status={singleTodo.completed}
           handleCompleteTodo={handleCompleteTodo}
           id={singleTodo.id}
           
           />

          )
        )) 
      )

    }

  }





  // Funciones

  const handleCompleteTodo = (id)=>{
    
    setTodoList(todoList.map(todo => todo.id === id ? {...todo, completed: !todo.completed}: todo))
   

  }



  return (

    <div className="App">

      <Header handleFilter={handleFilter} filtro={todoList.length} cantidadCompletadas={buttonComplete} cantidadNoCompletadads={buttonUnComplete}/>

    <div className="todo-container">
      {
        todoList && todoList.length > 0 ? handleRenderTodos() : (<Loader />)
      }
      </div>


    </div>
  );

}

export default App;
