import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  BarChart3,
  GitBranch,
  TrendingDown,
  DollarSign,
  FileText,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Cpu,
  Layers,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    path: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
    badge: 'Overview',
    description: 'Executive project overview & dataset status',
  },
  {
    path: '/dataset',
    label: 'Dataset Overview',
    icon: Database,
    badge: '76K rows',
    description: 'Retail inventory & demand variables',
  },
  {
    path: '/eda',
    label: 'Exploratory Analysis',
    icon: BarChart3,
    badge: 'Visuals',
    description: 'Distributions, correlations & trends',
  },
  {
    path: '/methodology',
    label: 'DML Methodology',
    icon: GitBranch,
    badge: 'Framework',
    description: 'Chernozhukov et al. 8-stage workflow',
  },
  {
    path: '/causal-analysis',
    label: 'Causal Effect Analysis',
    icon: TrendingDown,
    badge: 'θ = -1.42',
    description: 'Residuals, elasticity & inference',
  },
  {
    path: '/pricing',
    label: 'Dynamic Pricing',
    icon: DollarSign,
    badge: 'Interactive',
    description: 'Counterfactual revenue simulation',
  },
  {
    path: '/documentation',
    label: 'Project Documentation',
    icon: FileText,
    badge: 'Docs',
    description: 'Research report & roadmap',
  },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <NavLink to="/" onClick={onClose} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white font-heading">
                  EconoCausal
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded">
                  DML
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate max-w-[170px]">
                Dynamic Pricing with DML
              </p>
            </div>
          </NavLink>
        </div>

        {/* Research Pipeline Pill */}
        <div className="px-5 py-3 bg-slate-800/60 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">Research Pipeline</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            Phase 1 • Demo
          </span>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Core Modules
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded transition-colors ${
                          isActive
                            ? 'bg-blue-700 text-blue-100'
                            : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer Academic Reference */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-blue-400 font-semibold mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>Double ML Framework</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Based on Chernozhukov et al. (2018) Frisch-Waugh-Lovell orthogonal estimation.
            </p>
            <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
              <span>Frontend: React + Vite</span>
              <span className="text-emerald-400 font-mono">v1.0.0</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
