import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = ( props ) => {

    const [busqueda, buscarRecetas] = useState({
        ingrediente: '',
        categoria: ''
    });

    const [recetas, setRecetas] = useState([]);

    const [consultar, setConsultar] = useState(false);

    const { ingrediente, categoria } = busqueda;

    useEffect(() => {
        if (consultar) {
            const getRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`;
                const resultado = await axios.get(url);

                setRecetas(resultado.data.drinks);
            };
            getRecetas();
        }
        
    }, [busqueda]);

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                setConsultar
            }}
        >
            { props.children  }
        </RecetasContext.Provider>
    )

};

export default RecetasProvider;