import { useState } from 'react'
import { createDatosExpediente } from '../services/datosExpedientesService'
import type { DatosExpediente } from '../types'
import Button from './ui/Button'

interface AddConceptoModalProps {
  expediente: DatosExpediente['EXPEDIENTE']
  onClose: () => void
  onConceptoAdded: () => void
}

const AddConceptoModal: React.FC<AddConceptoModalProps> = ({ expediente, onClose, onConceptoAdded }) => {
  const [form, setForm] = useState<Partial<DatosExpediente>>({
    EXPEDIENTE: expediente,
    HOJA: 1,
    ORDEN: 1,
    ID_MATERIA: 0,
    MULTIPLICADOR: 1,
    MINIMO: 0,
    MAXIMO: 0,
    CANTIDAD: 0,
    CANTIDAD_I: 0,
    DESDE: '',
    HASTA: '',
    CUATRI: 1,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await createDatosExpediente(form)
      onConceptoAdded()
      onClose()
    } catch {
      // Manejo de error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        {/* Aquí pon los campos necesarios para el concepto */}
        <input name="ID_MATERIA" value={form.ID_MATERIA} onChange={handleChange} />
        {/* ...el resto de campos... */}
        <Button type="submit" isLoading={isLoading}>Guardar</Button>
        <Button type="button" onClick={onClose}>Cancelar</Button>
      </form>
    </div>
  )
}

export default AddConceptoModal