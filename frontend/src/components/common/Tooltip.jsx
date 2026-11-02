import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function Tooltip({ text, term, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <span className="relative inline-flex items-center group">
      {children ? (
        <span
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="cursor-help inline-flex items-center"
        >
          {children}
        </span>
      ) : (
        <button
          type="button"
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          onClick={() => setVisible(!visible)}
          className="ml-1 text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
          aria-label={term || 'Information'}
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      )}

      {visible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-slate-900 text-slate-100 text-xs rounded-lg shadow-xl pointer-events-none transition-all duration-150 animate-in fade-in slide-in-from-bottom-1">
          {term && <div className="font-semibold text-blue-300 mb-0.5">{term}</div>}
          <div className="leading-relaxed text-slate-200">{text}</div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </span>
  );
}
