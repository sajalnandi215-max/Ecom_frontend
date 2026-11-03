import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  Sparkles,
  ChevronRight,
  Shield,
  FileSpreadsheet,
  CheckCircle2,
  Info,
} from 'lucide-react';
import Badge from '../common/Badge';

const ROUTE_TITLES = {
  '/': { title: 'Research Overview & Dashboard', breadcrumb: 'Dashboard' },
  '/dataset': { title: 'Dataset Overview & Data Dictionary', breadcrumb: 'Dataset Overview' },
  '/eda': { title: 'Exploratory Data Analysis (EDA)', breadcrumb: 'Exploratory Analysis' },
  '/methodology': { title: 'Double Machine Learning Methodology', breadcrumb: 'DML Methodology' },
  '/causal-analysis': { title: 'Causal Effect Analysis & Elasticity', breadcrumb: 'Causal Analysis' },
  '/pricing': { title: 'Dynamic Pricing Simulation Engine', breadcrumb: 'Dynamic Pricing' },
  '/documentation': { title: 'Project Documentation & Technical Report', breadcrumb: 'Documentation' },
};

export default function Header({ onToggleSidebar }) {
  const location = useLocation();
  const currentRoute = ROUTE_TITLES[location.pathname] || {
    title: 'EconoCausal Dashboard',
    breadcrumb: 'Dashboard',
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Breadcrumbs / Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            {/* Breadcrumb path */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-0.5">
              <Link to="/" className="hover:text-blue-600 transition-colors font-medium">
                EconoCausal
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="text-slate-700 font-semibold truncate">
                {currentRoute.breadcrumb}
              </span>
            </div>
            {/* Page title */}
            <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate tracking-tight font-heading m-0">
              {currentRoute.title}
            </h1>
          </div>
        </div>

        {/* Right Actions & Status Badges */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="font-semibold text-slate-700">DML Pipeline:</span>
            <span className="text-slate-500">Illustrative Mode</span>
          </div>

          {/* Quick link button to Dynamic Pricing */}
          <Link
            to="/pricing"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 rounded-xl text-xs font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Simulate Pricing</span>
          </Link>

          {/* Researcher Profile Placeholder */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              EC
            </div>
            <div className="hidden xl:block text-left text-xs">
              <div className="font-semibold text-slate-900 leading-tight">Research Lab</div>
              <div className="text-[11px] text-slate-500 leading-tight">Econometrics & DML</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
