import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    const [ idreceta, setIdReceta ] = useState(null);
    const [ recetainfo, setReceta ] = useState({});

    useEffect(() => {
        const getReceta = async () => {
            if (!idreceta) return null;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`

            const resultado = await axios.get(url);

            setReceta(resultado.data.drinks[0]);
            
        };
        getReceta();
    }, [idreceta])

    return (
        <ModalContext.Provider
            value={{
                recetainfo,
                setIdReceta,
                setReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;