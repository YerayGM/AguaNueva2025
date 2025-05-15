import React, { memo } from 'react';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  icon?: string;
  placeholder?: string;
  error?: string;
  options?: { value: string | number; label: string }[];
  rows?: number;
  min?: number;
  max?: number;
  pattern?: string;
  autoComplete?: string;
  className?: string;
  // Para campos select con valor personalizado
  customOnChange?: (value: string | number) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  icon,
  placeholder,
  error,
  options,
  rows = 3,
  min,
  max,
  pattern,
  autoComplete,
  className = '',
  customOnChange,
}) => {
  const baseInputClasses = "w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300";
  const inputClasses = `${baseInputClasses} ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} ${disabled ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : 'bg-white dark:bg-gray-800'} ${className}`;
  
  // Manejador personalizado para select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (customOnChange) {
      customOnChange(e.target.value);
    } else {
      onChange(e);
    }
  };
  
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
      >
        {icon && <i className={`${icon} mr-2 text-primary dark:text-blue-400`}></i>}
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={rows}
          className={inputClasses}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      ) : type === 'select' ? (
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className={`${icon} text-gray-400`}></i>
            </div>
          )}
          <select
            id={id}
            name={name}
            value={value}
            onChange={customOnChange ? handleSelectChange : onChange}
            onBlur={onBlur}
            className={`${inputClasses} ${icon ? 'pl-10' : ''}`}
            required={required}
            disabled={disabled}
          >
            <option value="">Seleccione una opción</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <i className="fi fi-rr-angle-small-down text-gray-400"></i>
          </div>
        </div>
      ) : (
        <div className="relative">
          {icon && type !== 'date' && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className={`${icon} text-gray-400`}></i>
            </div>
          )}
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`${inputClasses} ${icon && type !== 'date' ? 'pl-10' : ''}`}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            pattern={pattern}
            autoComplete={autoComplete}
          />
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <i className="fi fi-rr-exclamation-circle mr-1"></i>
          {error}
        </p>
      )}
    </div>
  );
};

// Memoizar el componente para evitar renderizados innecesarios
export default memo(FormField);