import React, { useEffect, useState } from 'react';
import { getDatosPersonales } from '../../services/datosPersonales';

const DatosPersonalesList: React.FC = () => {
  const [datosPersonales, setDatosPersonales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDatosPersonales();
      setDatosPersonales(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Datos Personales</h1>
      <ul>
        {datosPersonales.map((dato: any) => (
          <li key={dato.dni}>{dato.nombre} {dato.apellidos}</li>
        ))}
      </ul>
    </div>
  );
};

export default DatosPersonalesList;