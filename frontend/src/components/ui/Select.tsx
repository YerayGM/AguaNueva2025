import React, { forwardRef } from 'react'

interface Option {
  label: string
  value: string | number
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string
  error?: string
  helpText?: string
  options: Option[]
  fullWidth?: boolean
  onChange?: (value: string) => void
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { 
      label, 
      error, 
      helpText, 
      options, 
      className = '', 
      fullWidth = true,
      onChange,
      ...rest 
    }, 
    ref
  ) => {
    const selectClasses = `
      px-3 py-2 bg-white dark:bg-slate-800 border 
      ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700' : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500 focus:border-emerald-500'}
      rounded-md shadow-sm focus:outline-none focus:ring-2 w-full text-slate-900 dark:text-white
    `
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value)
      }
    }
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {label}
          </label>
        )}
        
        <select
          ref={ref}
          className={selectClasses}
          onChange={handleChange}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
        
        {helpText && !error && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{helpText}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select