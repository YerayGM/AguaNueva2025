import { useState } from 'react'
import Button from './ui/Button'

interface AddConceptoModalProps {
  expediente: string;
  onClose: () => void;
  onConceptoAdded: () => void;
}

const AddConceptoModal = ({ expediente, onClose, onConceptoAdded }: AddConceptoModalProps) => {
  const [form, setForm] = useState({
    EXPEDIENTE: expediente,
    CONCEPTO: '',
    MULTI_MINI: '',
    CANTIDAD: '',
    INF: '',
    DESDE: '',
    HASTA: '',
    CULTIVO: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Aquí llamas a tu servicio para crear el concepto
    // await createDatosExpediente(form)
    onConceptoAdded()
    onClose()
  }

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input name="CONCEPTO" value={form.CONCEPTO} onChange={handleChange} placeholder="Concepto" />
        <input name="MULTI_MINI" value={form.MULTI_MINI} onChange={handleChange} placeholder="Multi/Mini" />
        <input name="CANTIDAD" value={form.CANTIDAD} onChange={handleChange} placeholder="Cantidad" />
        <input name="INF" value={form.INF} onChange={handleChange} placeholder="Inf." />
        <input name="DESDE" value={form.DESDE} onChange={handleChange} placeholder="Desde" type="date" />
        <input name="HASTA" value={form.HASTA} onChange={handleChange} placeholder="Hasta" type="date" />
        <input name="CULTIVO" value={form.CULTIVO} onChange={handleChange} placeholder="Cultivo" />
        <Button type="submit">Guardar</Button>
        <Button type="button" onClick={onClose}>Cancelar</Button>
      </form>
    </div>
  )
}

export default AddConceptoModal