import React, { useState } from 'react';

import { Formulario } from './components/Formulario';
import { Header } from './components/Header';
import { Recetas } from './components/Recetas';
import { Spinner } from './components/Spinner/Spinner';

import CategoriasProvider from './context/CategoriasContext';
import ModalProvider from './context/ModalContext';
import RecetasProvider from './context/RecetasContext';

function App() {

  const [cargando, setCargando] = useState(false);


  return (
    <CategoriasProvider>
      <RecetasProvider>
        <ModalProvider>

            <Header />

            <div className="container mt-5">
              <div className="row">
                  <Formulario 
                    setCargando={ setCargando }
                  />
              </div>

              { cargando ? <Spinner /> : null }

              <Recetas />
            </div>

        </ModalProvider>
      </RecetasProvider>
    </CategoriasProvider>
  );
}

export default App;
