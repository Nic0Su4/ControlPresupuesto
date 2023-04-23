import React from 'react'
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  LeadingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatearFecha } from '../helpers'

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {

  const diccionarioIconos = {
    ahorro: IconoAhorro,
    casa: IconoCasa,
    comida: IconoComida,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
  }

  const formatearMoneda = (valor) => {
    return valor.toLocaleString('es-PE', {
      style: 'currency',
      currency: 'PEN',  
    });
  }

  const leadingActions = () =>(
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => eliminarGasto(gasto.id)}
        destructive={true}  
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>
            <img
              src={diccionarioIconos[gasto.categoria]}
              alt={gasto.categoria}

            />
            <div className='descripcion-gasto'>
              <p className='categoria'>{gasto.categoria}</p>
              <p className='nombre-gasto'>{gasto.nombre}</p>
              <p className='fecha-gasto'>Agregado el <span>{formatearFecha(gasto.fecha)}</span></p>
            </div>
          </div>
          <p className='cantidad-gasto'>{formatearMoneda(gasto.cantidad)}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto