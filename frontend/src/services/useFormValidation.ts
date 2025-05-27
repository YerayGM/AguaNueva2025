// Crear useFormValidation.ts
import { useState, useCallback } from 'react'

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: unknown) => string | null
}

interface ValidationRules {
  [key: string]: ValidationRule
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = useCallback((data: Record<string, unknown>) => {
    const newErrors: Record<string, string> = {}

    Object.keys(rules).forEach(field => {
      const rule = rules[field]
      const value = data[field]

      if (rule.required && (!value || value === '')) {
        newErrors[field] = 'Este campo es obligatorio'
        return
      }

      if (value && rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
        newErrors[field] = `Mínimo ${rule.minLength} caracteres`
        return
      }

      if (value && rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
        newErrors[field] = `Máximo ${rule.maxLength} caracteres`
        return
      }

      if (value && rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
        newErrors[field] = 'Formato inválido'
        return
      }

      if (value && rule.custom) {
        const customError = rule.custom(value)
        if (customError) {
          newErrors[field] = customError
          return
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [rules])

  return { errors, validate, setErrors }
}