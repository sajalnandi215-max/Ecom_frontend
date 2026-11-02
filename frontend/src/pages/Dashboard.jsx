import React from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  Layers,
  Store,
  CheckCircle2,
  TrendingDown,
  GitBranch,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Activity,
  FileText,
  BarChart2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Badge from '../components/common/Badge';
import DisclaimerBanner from '../components/common/DisclaimerBanner';
import Tooltip from '../components/common/Tooltip';
import { DATASET_STATS, RECENT_ACTIVITIES } from '../data/mockData';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      <DisclaimerBanner
        title="Illustrative Research Prototype"
        description="All causal coefficients, statistical values, and simulated outcomes shown across EconoCausal are illustrative sample figures for visual demonstration of the DML frontend architecture."
      />

      {/* Hero / Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-6 sm:p-8 md:p-10 shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Double Machine Learning for Econometrics</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight text-white mb-3">
            EconoCausal: Causal AI for Dynamic Retail Pricing
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            An advanced econometric analytics platform applying <strong>Double Machine Learning (DML)</strong> to estimate true, unconfounded price elasticities of demand and power counterfactual pricing simulations.
          </p>

          {/* Quick Action CTA buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/methodology"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-600/30"
            >
              <GitBranch className="w-4 h-4" />
              <span>Explore DML Methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-all"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Run Pricing Simulation</span>
            </Link>
            <Link
              to="/dataset"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/5 text-slate-300 text-xs sm:text-sm font-medium transition-colors"
            >
              <Database className="w-4 h-4" />
              <span>View Dataset (76K Records)</span>
            </Link>
          </div>
        </div>

        {/* Decorative background geometry */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="2" strokeDasharray="8 8" />
            <circle cx="200" cy="200" r="120" stroke="white" strokeWidth="2" />
            <circle cx="200" cy="200" r="60" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>

      {/* Dataset Statistics Cards (Exact 4 prompt metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Records"
          value={DATASET_STATS.totalRecords.toLocaleString()}
          subvalue="Daily store-product panel (2023-2025)"
          icon={Database}
          highlight={true}
          tooltip="Total historical observations aggregated daily across stores and products."
          badge="Balanced Panel"
          badgeVariant="primary"
        />
        <MetricCard
          title="Total Features"
          value={DATASET_STATS.totalFeatures}
          subvalue="After preprocessing & engineering"
          icon={Layers}
          tooltip="Treatment, outcome, fixed effects, temporal, and macroeconomic confounders."
          badge="19 Covariates"
          badgeVariant="default"
        />
        <MetricCard
          title="Store-Product Combos"
          value={DATASET_STATS.storeProductCombos}
          subvalue="10 Stores × 10 Product SKUs"
          icon={Store}
          tooltip="Cross-sectional panel units observed continuously over time."
          badge="100 Units"
          badgeVariant="default"
        />
        <MetricCard
          title="Missing Values"
          value={DATASET_STATS.missingValues}
          subvalue="Cleaned & validated dataset"
          icon={CheckCircle2}
          tooltip="Rigorous imputation and verification confirmed zero null values."
          badge="100% Complete"
          badgeVariant="success"
        />
      </div>

      {/* Research Objective Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-blue-600">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Core Research Mandate</span>
        </div>
        <blockquote className="border-l-4 border-blue-600 pl-4 py-1 text-slate-800 font-medium text-base sm:text-lg leading-relaxed italic bg-blue-50/30 rounded-r-xl">
          "To investigate how changes in product pricing influence retail sales using Double Machine Learning while accounting for relevant confounding variables."
        </blockquote>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-900 block mb-1">Target Treatment (T)</span>
            Unit selling price adjusted for retail markdown promotions across categories.
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-900 block mb-1">Target Outcome (Y)</span>
            Daily consumer units sold, measuring direct consumer demand elasticity.
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-900 block mb-1">Confounding Vector (X)</span>
            Competitor pricing, promotion banners, weather shocks, seasonality, and fixed effects.
          </div>
        </div>
      </div>

      {/* Project Workflow Visualization */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              Project Workflow & Analytical Pipeline
            </h2>
            <p className="text-xs text-slate-500">
              End-to-end econometric pipeline from raw data to counterfactual dynamic pricing
            </p>
          </div>
          <Badge variant="primary">Stage: DML Cross-Fitting</Badge>
        </div>

        {/* Workflow Steps Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            {
              step: '01',
              title: 'Data Ingestion',
              desc: '76,000 retail records loaded and quality checked',
              status: 'Completed',
              statusColor: 'emerald',
            },
            {
              step: '02',
              title: 'Preprocessing',
              desc: 'Feature engineering: 19 clean covariates created',
              status: 'Completed',
              statusColor: 'emerald',
            },
            {
              step: '03',
              title: 'Outcome Model',
              desc: 'Estimating E[Y|X] via LightGBM (R² = 0.82)',
              status: 'Completed',
              statusColor: 'emerald',
            },
            {
              step: '04',
              title: 'Treatment Model',
              desc: 'Estimating E[T|X] via Random Forest (MAE = $2.15)',
              status: 'Completed',
              statusColor: 'emerald',
            },
            {
              step: '05',
              title: 'Orthogonal DML',
              desc: 'Residual regression isolating causal effect θ',
              status: 'Simulated',
              statusColor: 'blue',
            },
            {
              step: '06',
              title: 'Dynamic Pricing',
              desc: 'Counterfactual revenue simulation & optimization',
              status: 'Active',
              statusColor: 'blue',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {item.step}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.statusColor === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                  />
                </div>
                <h4 className="font-bold text-slate-900 text-xs mb-1">{item.title}</h4>
                <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] font-semibold text-slate-600">
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dataset & DML Implementation Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dataset Processing Status */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Dataset Processing Status</h3>
                  <p className="text-xs text-slate-500">Retail Inventory & Demand Dataset</p>
                </div>
              </div>
              <Badge variant="success">Validated</Badge>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Raw Records Processed</span>
                <span className="font-mono font-bold text-slate-900">76,000 / 76,000 (100%)</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Missing Value Imputation</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 0 Missing (Complete)
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Fixed Effects Categorization</span>
                <span className="font-medium text-slate-800">10 Stores, 10 SKUs, 5 Regions</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">Exogenous Confounders Verified</span>
                <span className="font-medium text-slate-800">Weather, Promotions, Competitor Prices</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Data Quality Score: 99.8%</span>
            <Link
              to="/dataset"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Explore Data Dictionary</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* DML Implementation Status */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">DML Implementation Status</h3>
                  <p className="text-xs text-slate-500">Double Machine Learning Architecture</p>
                </div>
              </div>
              <Badge variant="primary">5-Fold Cross-Fitting</Badge>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Outcome Model E[Y|X]</span>
                <span className="font-mono font-medium text-slate-900">LightGBM (R² = 0.824)</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Treatment Model E[T|X]</span>
                <span className="font-mono font-medium text-slate-900">Random Forest (MAE = $2.15)</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Frisch-Waugh-Lovell Orthogonalization</span>
                <span className="font-semibold text-blue-600">Neyman Orthogonal Score</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">Causal Estimation Status</span>
                <span className="text-amber-600 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Sample Parameters Loaded
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Confidence Level: 95% CI</span>
            <Link
              to="/causal-analysis"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View Causal Effect Results</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Project Activities */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-700" />
            <h3 className="font-bold text-slate-900 text-sm">Recent Project Activities</h3>
          </div>
          <span className="text-xs text-slate-400">Chronological Audit Log</span>
        </div>

        <div className="divide-y divide-slate-100">
          {RECENT_ACTIVITIES.map((activity) => (
            <div key={activity.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {activity.title}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">{activity.description}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 sm:self-center pl-5 sm:pl-0">
                <Badge variant={activity.status === 'Completed' ? 'success' : 'primary'}>
                  {activity.status}
                </Badge>
                <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
