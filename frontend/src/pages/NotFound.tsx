import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">404</h1>
      <p className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">Página no encontrada</p>
      <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-md">
        La página que estás buscando no existe o ha sido movida.
      </p>
      <Link to="/">
        <Button
          variant="primary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          }
        >
          Volver al inicio
        </Button>
      </Link>
    </div>
  )
}

export default NotFound