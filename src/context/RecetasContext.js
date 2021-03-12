import React, { createContext, useState } from 'react';

export const RecetasContext = createContext();

const RecetasProvider = ( props ) => {

    const [busqueda, buscarRecetas] = useState({
        ingrediente: '',
        categoria: ''
    });

    const [recetas, setRecetas] = useState([]);

    return (
        <RecetasContext.Provider
            value={{
                buscarRecetas
            }}
        >
            { props.children  }
        </RecetasContext.Provider>
    )

};

export default RecetasProvider;