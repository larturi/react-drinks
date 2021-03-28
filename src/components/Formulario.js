import React, { useContext, useState } from 'react';

import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

export const Formulario = ({ setCargando }) => {

    const { categorias } = useContext(CategoriasContext);  
    const { buscarRecetas, setConsultar } = useContext(RecetasContext);  

    const [busqueda, setBusqueda] = useState({
        ingrediente: '',
        categoria: ''
    });

    const obtenerDatosReceta = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    };

    return (
        <form
            className="col-12"
            onSubmit={ e => {
                e.preventDefault();

                if (busqueda.ingrediente.trim() === '' || busqueda.categoria.trim() === '') {
                    return;
                }

                setCargando(true);

                buscarRecetas(busqueda);
                setConsultar(true);

                setTimeout(() => {
                    setCargando(false);
                }, 500);

            }}
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por categoria o ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        name="ingrediente"
                        className="form-control mb-3"
                        type="text"
                        placeholder="Buscar por ingrediente"
                        onChange={obtenerDatosReceta}
                    />
                </div>

                <div className="col-md-4">
                    <select
                        className="form-control mb-3"
                        name="categoria"
                        onChange={obtenerDatosReceta}
                    >
                        <option value="">-- Selecciona Categoría --</option>
                        {
                            categorias.map( categoria => (
                                <option 
                                    key={categoria.strCategory}
                                    value={categoria.strCategory}
                                >
                                    {categoria.strCategory}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-primary btn-block"
                        value="Buscar Bebidas"
                    />
                </div>

            </div>

        </form>
    )
}
