import React from 'react';
import CocinaItem from '../../components/CocinaItem/CocinaItem';
import './CocinasPage.css'; // Estilos para esta página

// --- DATOS DE EJEMPLO ---
// En el futuro, esto vendrá de tu base de datos o API.
const cocinasRegistradas = [
  {
    id: 1,
    nombre: 'Cocina Comunitaria "El Sazón del Barrio"',
    descripcion:
      'Ofrecemos comidas calientes a todos los vecinos. Especialidad en guisos tradicionales de la región.',
    telefono: '961-123-4567',
    email: 'sazon@barrio.com',
  },
  {
    id: 2,
    nombre: 'Comedor "La Esperanza"',
    descripcion:
      'Un lugar para compartir y disfrutar de alimentos nutritivos en comunidad.',
    telefono: '961-765-4321',
    email: 'info@laesperanza.org',
  },
  {
    id: 3,
    nombre: 'Cocina "Corazón Contento"',
    descripcion: 'Desayunos y comidas para estudiantes y personas mayores.',
    telefono: '961-555-8899',
    email: 'contacto@corazoncontento.mx',
  },
];
// -------------------------

const CocinasPage = () => {
  return (
    <div className="list-section">
      <h2 className="list-title">Cocinas Comunitarias Registradas</h2>
      <div className="list-container">
        
        {/* Aquí "mapeamos" los datos. Por cada cocina en el arreglo, 
          creamos un componente <CocinaItem> 
        */}
        {cocinasRegistradas.map((cocina) => (
          <CocinaItem key={cocina.id} cocina={cocina} />
        ))}
      </div>
    </div>
  );
};

export default CocinasPage;