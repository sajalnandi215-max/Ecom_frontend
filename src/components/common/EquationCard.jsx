import React from 'react';
import { BookOpen, HelpCircle } from 'lucide-react';
import Badge from './Badge';

export default function EquationCard({
  title,
  stepNumber,
  equation,
  variables = [],
  intuition,
  badgeText,
  badgeVariant = 'primary',
  className = '',
}) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs transition-all hover:border-slate-300 ${className}`}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          {stepNumber && (
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
              {stepNumber}
            </span>
          )}
          <h3 className="font-bold text-slate-900 text-base">{title}</h3>
        </div>
        {badgeText && <Badge variant={badgeVariant}>{badgeText}</Badge>}
      </div>

      {/* Styled Mathematical Block */}
      <div className="bg-slate-900 text-slate-100 rounded-xl px-5 py-4 my-3 font-mono text-center text-sm sm:text-base border border-slate-800 shadow-inner overflow-x-auto tracking-wide">
        <div className="text-blue-300 font-semibold">{equation}</div>
      </div>

      {intuition && (
        <div className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-xl p-3 my-3 leading-relaxed">
          <strong className="text-slate-800">Econometric Intuition:</strong> {intuition}
        </div>
      )}

      {variables.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Notation & Variables
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {variables.map((v, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-slate-50/70 p-2 rounded-lg border border-slate-100">
                <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded text-[11px] shrink-0">
                  {v.symbol}
                </span>
                <span className="text-slate-600 text-[11px] leading-tight">
                  <span className="font-medium text-slate-800">{v.name}:</span> {v.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
