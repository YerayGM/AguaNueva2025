import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/Home'
import DatosPersonalesPage from './pages/DatosPersonales'
import ExpedientesPage from './pages/Expedientes'
import NuevoExpedientePage from './pages/NuevoExpediente'
import VerExpedientePage from './pages/VerExpediente'
import NotFoundPage from './pages/NotFound'
import EditarDatosPersonalesPage from './pages/EditarDatosPersonales'
import EditarExpedientePage from './pages/EditarExpediente'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="datos-personales">
          <Route index element={<DatosPersonalesPage />} />
          <Route path="nuevo" element={<EditarDatosPersonalesPage />} />
          <Route path="editar/:dni" element={<EditarDatosPersonalesPage />} />
          <Route path=":dni" element={<EditarDatosPersonalesPage mode="view" />} />
        </Route>
        <Route path="expedientes">
          <Route index element={<ExpedientesPage />} />
          <Route path="nuevo" element={<NuevoExpedientePage />} />
          <Route path="editar/:id" element={<EditarExpedientePage />} />
          <Route path=":id" element={<VerExpedientePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App