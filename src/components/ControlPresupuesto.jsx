import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => total + gasto.cantidad, 0);

    const neuvoPorcentaje = ((presupuesto - (presupuesto - totalGastado)) / presupuesto * 100).toFixed(2);

    setDisponible(presupuesto - totalGastado);
    setGastado(totalGastado);

    setTimeout(() => {
      setPorcentaje(neuvoPorcentaje);
    }, 750);

  }, [gastos]);

  const formatearMoneda = (valor) => {
    return valor.toLocaleString('es-PE', {
      style: 'currency',
      currency: 'PEN',  
    });
  }

  const handleResetApp = () => {
    const resultado = confirm('¿Estás seguro de resetear la app?');
    if (resultado) {
      setPresupuesto(0);
      setGastos([]);
      setIsValidPresupuesto(false);
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
            trailColor: '#f5f5f5',
            textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
          })}
          value={porcentaje}
          text={`${porcentaje}% gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button type="button" className="reset-app" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatearMoneda(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatearMoneda(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearMoneda(gastado)}
        </p>
      </div>
    </div>
  )
}
export default ControlPresupuesto