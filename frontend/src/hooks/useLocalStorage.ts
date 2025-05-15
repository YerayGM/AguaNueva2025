import { useState, useEffect } from 'react';

/**
 * Hook personalizado para trabajar con localStorage
 * @param key - Clave para almacenar en localStorage
 * @param initialValue - Valor inicial si no existe en localStorage
 * @returns [storedValue, setValue] - Valor almacenado y función para actualizarlo
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para almacenar nuestro valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Obtener de localStorage por key
      const item = window.localStorage.getItem(key);
      // Analizar JSON almacenado o devolver initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay error, devolver initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar localStorage y estado
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que value sea una función para seguir el mismo patrón que useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Guardar estado
      setStoredValue(valueToStore);
      
      // Guardar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Escuchar cambios en otros tabs/ventanas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    // Añadir event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Limpiar event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;