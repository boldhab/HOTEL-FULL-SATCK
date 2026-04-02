import React from 'react';
import { cn } from '../utils/cn';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  className,
  contentClassName,
}) => {
  return (
    <div className={cn('bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col', className)}>
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-bold text-slate-900">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      
      <div className={cn('flex-1 px-6 py-6', contentClassName)}>
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-50 mt-auto">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
