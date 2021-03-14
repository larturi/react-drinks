import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

export const Receta = ({ receta }) => {

    const [ modalStyle ] = useState(getModalStyle);
    const [ open, setOpen ] = useState(false);

    const classes = useStyles();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
 
    const { recetainfo, setIdReceta, setReceta } = useContext(ModalContext);

    const mostrarIngredientes = (recetainfo) => {

        let ingredientes = [];

        for (let i = 1; i < 16; i++) {
            if (recetainfo[`strIngredient${i}`]) {
                ingredientes.push(
                    <li>{recetainfo[`strIngredient${i}`]} {recetainfo[`strMeasure${i}`]}</li>
                )
            }
        }

        return ingredientes;
    };

    return (
        <div className="col-md-4 mb-3">
           <div className="card">
               <div className="card-header">
                   <h3 className="text-center">{receta.strDrink}</h3>
               </div>

               <img className="card-img-top" src={receta.strDrinkThumb} alt={receta.strDrink}/>

               <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >
                        Ver receta
                    </button>

                    <Modal
                        open={open}
                        onClose={ () => {
                            setIdReceta(null);
                            setReceta({});
                            handleClose();
                        }}
                    >
                        <div 
                          style={modalStyle}
                          className={classes.paper}>
                              <h2>{ recetainfo.strDrink }</h2>

                              <h3 className="mt-4">Instrucciones</h3>
                              <p>
                                  { recetainfo.strInstructions }
                              </p>

                              <img 
                                className="img-fluid my-4" 
                                src={ recetainfo.strDrinkThumb } 
                                alt="Imagen receta bebida"
                              />

                              <h3>Ingredientes:</h3>
                              <ul>
                                  <li>
                                      { mostrarIngredientes(recetainfo) }
                                  </li>
                              </ul>
                        </div>
                    </Modal>
               </div>
           </div>
        </div>
    )
}
