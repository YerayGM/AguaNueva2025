import React from 'react'

type BadgeVariant = 'blue' | 'green' | 'red' | 'yellow' | 'gray' | 'amber'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gray'
}) => {
  const variantClasses = {
    gray: 'bg-gray-700 text-gray-200',
    blue: 'bg-blue-900 text-blue-300',
    green: 'bg-green-900 text-green-300',
    red: 'bg-red-900 text-red-300',
    yellow: 'bg-amber-900 text-amber-300'
  }
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}

export default Badge