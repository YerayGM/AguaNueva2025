import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { 
      label, 
      error, 
      helpText, 
      className = '', 
      fullWidth = true, 
      leftIcon, 
      rightIcon,
      ...rest 
    }, 
    ref
  ) => {
    const inputClasses = `
      px-3 py-2 bg-white dark:bg-slate-800 border 
      ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700' : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500 focus:border-emerald-500'}
      rounded-md shadow-sm focus:outline-none focus:ring-2 w-full text-slate-900 dark:text-white
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon ? 'pr-10' : ''}
    `
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClasses}
            {...rest}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        
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

Input.displayName = 'Input'

export default Input