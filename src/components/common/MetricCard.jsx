import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import Tooltip from './Tooltip';

export default function MetricCard({
  title,
  value,
  subvalue,
  icon: Icon,
  trend,
  trendLabel,
  tooltip,
  badge,
  badgeVariant = 'default',
  highlight = false,
  className = '',
}) {
  return (
    <div
      className={`bg-white rounded-2xl border p-5 transition-all duration-200 card-hover ${
        highlight
          ? 'border-blue-200 shadow-md shadow-blue-500/5 ring-1 ring-blue-500/10'
          : 'border-slate-200/80 shadow-xs'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <span>{title}</span>
          {tooltip && <Tooltip text={tooltip} term={title} />}
        </div>
        {Icon && (
          <div
            className={`p-2 rounded-xl shrink-0 ${
              highlight
                ? 'bg-blue-50 text-blue-600'
                : 'bg-slate-50 text-slate-600 border border-slate-100'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2 mt-1">
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </div>
        {badge && (
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
              badgeVariant === 'success'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : badgeVariant === 'primary'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : badgeVariant === 'warning'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      {(subvalue || trend !== undefined) && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          {subvalue && <span className="truncate">{subvalue}</span>}
          {trend !== undefined && (
            <div
              className={`flex items-center gap-0.5 font-medium shrink-0 ml-auto ${
                trend > 0
                  ? 'text-emerald-600'
                  : trend < 0
                  ? 'text-rose-600'
                  : 'text-slate-500'
              }`}
            >
              {trend > 0 ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : trend < 0 ? (
                <ArrowDownRight className="w-3.5 h-3.5" />
              ) : (
                <Minus className="w-3.5 h-3.5" />
              )}
              <span>{trendLabel || `${Math.abs(trend)}%`}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
