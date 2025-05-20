import React from 'react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  className = '',
  leftIcon,
  rightIcon,
  fullWidth = true,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 11)}`
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className={`relative rounded-md shadow-sm ${error ? 'ring-1 ring-red-500' : ''}`}>
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
              {leftIcon}
            </span>
          </div>
        )}
        
        <input
          id={inputId}
          className={`
            rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
            text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
            focus:border-teal-500 dark:focus:border-teal-400 focus:ring-1 focus:ring-teal-500/50
            block w-full sm:text-sm transition-colors
            ${leftIcon ? 'pl-10' : 'pl-3'} 
            ${rightIcon ? 'pr-10' : 'pr-3'}
            ${error ? 'border-red-300 dark:border-red-800 focus:border-red-500 focus:ring-red-500/50' : ''}
            py-2
            ${className}
          `}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  )
}

export default Input