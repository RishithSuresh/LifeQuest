import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'ghost' | 'elevated';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantClasses = {
      default: 'bg-slate-900 border border-slate-700 backdrop-blur-sm',
      ghost: 'bg-transparent',
      elevated: 'bg-slate-800 border border-slate-600 shadow-lg shadow-black/50',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-xl p-6 transition-all duration-200',
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
