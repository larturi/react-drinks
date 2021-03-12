import React, { createContext, useState, useEffect } from 'react';

import axios from 'axios';

export const CategoriasContext = createContext();

const CategoriasProvider = ( props ) => {

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const getCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const resultado = await axios.get(url);
            setCategorias(resultado.data.drinks);
        };
        getCategorias();
    }, [])    

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            { props.children  }
        </CategoriasContext.Provider>
    )

};

export default CategoriasProvider;