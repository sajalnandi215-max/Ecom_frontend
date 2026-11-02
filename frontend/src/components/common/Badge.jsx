import React from 'react';

export default function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors';
  
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[11px]',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-3.5 py-1.5 text-sm',
  };

  const variantClasses = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    primary: 'bg-blue-50 text-blue-700 border border-blue-200',
    navy: 'bg-slate-900 text-white',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',
    outline: 'bg-transparent text-slate-600 border border-slate-300',
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size] || sizeClasses.sm} ${variantClasses[variant] || variantClasses.default} ${className}`}>
      {children}
    </span>
  );
}
