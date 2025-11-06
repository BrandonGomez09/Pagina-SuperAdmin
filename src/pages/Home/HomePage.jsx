import React from 'react';
import './HomePage.css';
import CocinaItem from '../../components/CocinaItem/CocinaItem';
import SolicitudItem from '../../components/SolicitudItem/SolicitudItem';

// --- DATOS DE SOLICITUDES PENDIENTES (CON TODOS LOS CAMPOS) ---
const mockRequests = [
  { 
    id: 1, 
    // Responsable
    nombres: 'María',
    primerApellido: 'González',
    segundoApellido: 'Pérez',
    correoResponsable: 'maria.gonzalez@email.com',
    telefonoResponsable: '961-001-0001',
    // Cocina
    kitchenName: 'Cocina Comunitaria "El Sazón de María"', 
    descripcion: 'Queremos iniciar una cocina en el patio de la iglesia local para dar de comer a niños.',
    telefonoCocina: '961-001-0002',
    emailCocina: 'sazon.maria@cocina.com',
    // Ubicación
    direccion: 'Av. Central 123',
    barrio: 'Colonia Centro',
    estado: 'Chiapas',
    municipio: 'Tuxtla Gutiérrez',
    codigoPostal: '29000'
  },
  { 
    id: 2, 
    // Responsable
    nombres: 'Juan',
    primerApellido: 'Pérez',
    segundoApellido: 'López',
    correoResponsable: 'juan.perez@email.com',
    telefonoResponsable: '961-002-0002',
    // Cocina
    kitchenName: 'Comedor "Luz y Esperanza"', 
    descripcion: 'Somos un grupo de vecinos que busca apoyo para formalizar nuestro comedor.',
    telefonoCocina: '961-002-0003',
    emailCocina: 'luz.esperanza@comedor.org',
    // Ubicación
    direccion: 'Calle Falsa 456',
    barrio: 'San Roque',
    estado: 'Chiapas',
    municipio: 'Tuxtla Gutiérrez',
    codigoPostal: '29040'
  },
];

// --- DATOS DE COCINAS YA REGISTRADAS (CON TODOS LOS CAMPOS) ---
const cocinasRegistradas = [
  {
    id: 1,
    // Responsable
    nombres: 'Pedro',
    primerApellido: 'Ramírez',
    segundoApellido: 'Alcázar',
    correoResponsable: 'pedro.ramirez@email.com',
    telefonoResponsable: '961-111-1111',
    // Cocina
    nombre: 'Cocina Comunitaria "El Sazón del Barrio"',
    descripcion: 'Ofrecemos comidas calientes a todos los vecinos. Especialidad en guisos tradicionales de la región.',
    telefono: '961-123-4567',
    email: 'sazon@barrio.com',
    // Ubicación
    direccion: 'Calle Principal 789',
    barrio: 'Las Palmas',
    estado: 'Chiapas',
    municipio: 'Berriozábal',
    codigoPostal: '29170'
  },
];
// ------------------------------------

const HomePage = () => {
  const handleAccept = (id) => {
    console.log(`Solicitud ACEPTADA: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Solicitud RECHAZADA: ${id}`);
  };

  return (
    <>
      {/* === SECCIÓN 1: SOLICITUDES PENDIENTES === */}
      <section className="requests-section">
        <h2 className="requests-title">Solicitudes de cocinas</h2>
        <div className="requests-container">
          {mockRequests.map((request) => (
            <SolicitudItem 
              key={request.id}
              request={request}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      </section>

      {/* === SECCIÓN 2: COCINAS REGISTRADAS === */}
      <section className="requests-section">
        <h2 className="requests-title">
          Cocinas Registradas 
          <span className="item-counter">({cocinasRegistradas.length})</span>
        </h2>
        
        <div className="requests-container">
          {cocinasRegistradas.map((cocina) => (
            // Le pasamos el objeto 'cocina' completo
            <CocinaItem key={cocina.id} cocina={cocina} />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;  