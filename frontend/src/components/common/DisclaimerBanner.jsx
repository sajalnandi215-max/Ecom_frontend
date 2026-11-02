import React, { useState } from 'react';
import { AlertCircle, Info, X } from 'lucide-react';

export default function DisclaimerBanner({ title = 'Illustrative Sample Data – Actual DML Results Pending', description, dismissible = false }) {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-3.5 mb-6 text-amber-900 shadow-xs flex items-start gap-3">
      <div className="p-1 bg-amber-100 rounded-lg text-amber-800 shrink-0 mt-0.5">
        <AlertCircle className="w-4 h-4" />
      </div>
      <div className="flex-1 text-xs sm:text-sm">
        <div className="font-semibold text-amber-950 flex items-center gap-2">
          <span>{title}</span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-200/70 text-amber-900 rounded">
            Prototype Notice
          </span>
        </div>
        <p className="mt-0.5 text-amber-800/90 leading-relaxed text-xs">
          {description || (
            <>
              All figures, causal estimates, residuals, and revenue curves displayed across this interface are simulated for demonstration and interface evaluation purposes. They do not constitute empirical academic claims or real production recommendations.
            </>
          )}
        </p>
      </div>
      {dismissible && (
        <button
          onClick={() => setClosed(true)}
          className="text-amber-600 hover:text-amber-800 p-1 rounded hover:bg-amber-100 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
