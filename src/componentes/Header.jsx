import React from "react";

// Estilos

import "../estilos/Header.css"

const Header = ({handleFilter, filtro, cantidadCompletadas, cantidadNoCompletadads} ) => {

    return(
        <header className="Header">
            <div>
                <h2 className="logo">ToDo List</h2>
            </div>
            <div className="contenedor-botones">
                <button onClick={()=>handleFilter(null)}>Todos {filtro}</button>
                <button onClick={()=>handleFilter(true)}>Completas {cantidadCompletadas}</button>
                <button onClick={()=>handleFilter(false)}>Incompletas {cantidadNoCompletadads}</button>
            </div>
        </header>
    )


}

export default Header;