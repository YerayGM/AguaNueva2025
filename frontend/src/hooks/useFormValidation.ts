import { useState, useCallback, useMemo } from 'react';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    isEmail?: boolean;
    isNumber?: boolean;
    isDate?: boolean;
    custom?: (value: any, formData?: any) => boolean;
    message?: string;
  };
}

interface ValidationErrors {
  [key: string]: string;
}

const useFormValidation = <T extends Record<string, any>>(
  initialState: T,
  validationRules: ValidationRules
) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validar un campo específico
  const validateField = useCallback((name: string, value: any): string => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && (value === undefined || value === null || value === '')) {
      return rules.message || 'Este campo es obligatorio';
    }

    if (value !== undefined && value !== null && value !== '') {
      if (rules.minLength && String(value).length < rules.minLength) {
        return rules.message || `Debe tener al menos ${rules.minLength} caracteres`;
      }

      if (rules.maxLength && String(value).length > rules.maxLength) {
        return rules.message || `No debe exceder ${rules.maxLength} caracteres`;
      }

      if (rules.pattern && !rules.pattern.test(String(value))) {
        return rules.message || 'Formato inválido';
      }

      if (rules.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) {
        return rules.message || 'Email inválido';
      }

      if (rules.isNumber && isNaN(Number(value))) {
        return rules.message || 'Debe ser un número';
      }

      if (rules.isDate) {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return rules.message || 'Fecha inválida';
        }
      }

      if (rules.custom && !rules.custom(value, formData)) {
        return rules.message || 'Valor inválido';
      }
    }

    return '';
  }, [validationRules, formData]);

  // Validar todo el formulario
  const validateForm = useCallback(() => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      // Solo validar si el campo existe en formData
      if (fieldName in formData) {
        const error = validateField(fieldName, formData[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField, validationRules]);

  // Manejar cambios en los campos
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    let parsedValue: any = value;
    
    // Convertir valores según el tipo de input
    if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    } else if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    }
    
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  }, []);

  // Manejar evento onBlur
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Marcar campo como tocado
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validar al perder el foco
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  // Resetear formulario
  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialState]);

  // Establecer valor de un campo
  const setFieldValue = useCallback((name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Establecer valores del formulario
  const setFormValues = useCallback((values: Partial<T>) => {
    setFormData(prev => ({ ...prev, ...values }));
  }, []);

  // Verificar si el formulario es válido
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFieldValue,
    setFormValues
  };
};

export default useFormValidation;