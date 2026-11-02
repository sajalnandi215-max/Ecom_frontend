import React, { useState } from 'react';
import {
  FileText,
  BookOpen,
  GitBranch,
  Database,
  Cpu,
  Layers,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Terminal,
} from 'lucide-react';
import Badge from '../components/common/Badge';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('overview');

  const SECTIONS = [
    { id: 'overview', title: '1. Project Overview & Abstract', icon: BookOpen },
    { id: 'objective', title: '2. Research Objective', icon: ShieldCheck },
    { id: 'dataset', title: '3. Dataset Specifications', icon: Database },
    { id: 'methodology', title: '4. DML Econometric Framework', icon: GitBranch },
    { id: 'techstack', title: '5. Technology Stack', icon: Cpu },
    { id: 'progress', title: '6. Development Progress', icon: CheckCircle2 },
    { id: 'roadmap', title: '7. Future Implementation Roadmap', icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      {/* Notice */}
      <DisclaimerBanner
        title="Technical Documentation & Research Specification"
        description="Official documentation for the EconoCausal research project. Contains econometric formulation, data dictionary standards, front-end architecture, and future Python backend integration roadmap."
      />

      {/* Hero Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <FileText className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              Research Whitepaper & Specification
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            EconoCausal: Dynamic Pricing Analysis Using Double Machine Learning
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            A comprehensive frontend research platform for causal inference, observational debiasing, and counterfactual price optimization in modern retail environments.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <span>Author: EconoCausal Research Team</span>
            <span>•</span>
            <span>Version: 1.0.0-rc2</span>
            <span>•</span>
            <span>Framework: Double Machine Learning (DML)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Sticky Sidebar Nav + Documentation Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1">
              Table of Contents
            </div>
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-left transition-all ${
                    activeSection === sec.id
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${activeSection === sec.id ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{sec.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Body */}
        <div className="lg:col-span-3 space-y-6">
          {/* Section 1: Project Overview */}
          <section
            id="overview"
            className={`bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs ${
              activeSection === 'overview' ? 'ring-2 ring-blue-500/20' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary">Section 1</Badge>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Project Overview & Executive Summary
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                In retail business intelligence, setting prices dynamically is one of the highest-leverage operational decisions. However, observational retail datasets are heavily confounded: retailers frequently lower prices (discount) precisely when overall demand is high (holidays, weekends, marketing blitzes), or raise prices on premium products during peak supply constraints.
              </p>
              <p>
                Standard predictive machine learning (e.g., predicting sales directly from price and features) optimizes correlation rather than causation. In doing so, it introduces severe <em>regularization bias</em> and fails to answer counterfactual questions like: <strong>"What will happen to demand if we increase price by 8% next Tuesday?"</strong>
              </p>
              <p>
                <strong>EconoCausal</strong> implements the <em>Double Machine Learning (DML)</em> framework established by Victor Chernozhukov, Denis Chetverikov, Mert Demirer, Esther Duflo, Christian Hansen, Whitney Newey, and James Robins (2018). DML combines modern machine learning with Neyman orthogonality to deliver unbiased causal price elasticities.
              </p>
            </div>
          </section>

          {/* Section 2: Research Objective */}
          <section
            id="objective"
            className={`bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs ${
              activeSection === 'objective' ? 'ring-2 ring-blue-500/20' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary">Section 2</Badge>
              <h2 className="text-lg font-bold text-slate-900 font-heading">Research Objective</h2>
            </div>
            <blockquote className="border-l-4 border-blue-600 pl-4 py-2 text-slate-800 font-medium text-sm leading-relaxed italic bg-blue-50/40 rounded-r-xl mb-4">
              "To investigate how changes in product pricing influence retail sales using Double Machine Learning while accounting for relevant confounding variables."
            </blockquote>
            <div className="text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
              <p className="font-semibold text-slate-900">Specific Empirical Hypotheses:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li>
                  <strong>H1 (Debiasing Hypothesis):</strong> Standard Ordinary Least Squares (OLS) underestimates consumer price elasticity due to omitted promotional and seasonal confounders.
                </li>
                <li>
                  <strong>H2 (Orthogonality Hypothesis):</strong> Conditioning on high-dimensional covariates X using cross-fitted non-parametric nuisance models E[Y|X] and E[T|X] yields a statistically significant causal treatment effect parameter θ.
                </li>
                <li>
                  <strong>H3 (Heterogeneity Hypothesis):</strong> Causal price elasticity varies significantly across retail merchandise categories (e.g., Groceries are significantly more elastic than Electronics).
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Dataset Description */}
          <section
            id="dataset"
            className={`bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs ${
              activeSection === 'dataset' ? 'ring-2 ring-blue-500/20' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary">Section 3</Badge>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Dataset Description & Specifications
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                The research dataset represents a multi-store, multi-product balanced retail panel spanning 760 daily periods (January 2023 to January 2025).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-500 block">Total Records</span>
                  <span className="font-bold text-slate-900 text-base">76,000</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-500 block">Features</span>
                  <span className="font-bold text-slate-900 text-base">19 Variables</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-500 block">Stores × SKUs</span>
                  <span className="font-bold text-slate-900 text-base">10 × 10 (100)</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-500 block">Missing Values</span>
                  <span className="font-bold text-emerald-600 text-base">0 (0.0%)</span>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Variables encompass operational factors (inventory on shelf, units ordered), market signals (competitor pricing, promotion banners, discount rates), environmental exogenous shocks (weather conditions, public health epidemic indices), and calendar fixed effects (day of week, month, year).
              </p>
            </div>
          </section>

          {/* Section 4: DML Methodology */}
          <section
            id="methodology"
            className={`bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs ${
              activeSection === 'methodology' ? 'ring-2 ring-blue-500/20' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary">Section 4</Badge>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Double Machine Learning (DML) Econometric Framework
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                The foundation rests on the <strong>Partially Linear Model (PLM)</strong>:
              </p>
              <div className="bg-slate-900 text-blue-300 p-3.5 rounded-xl font-mono text-center text-xs">
                Y = θ₀ · T + g₀(X) + U, &nbsp;&nbsp; E[U | T, X] = 0
              </div>
              <p>
                DML solves the regularization bias problem via two fundamental innovations:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600">
                <li>
                  <strong>Neyman Orthogonal Score Equations:</strong> By decomposing both Y and T with respect to X using independent ML models, the Frisch-Waugh-Lovell residuals ensure that small estimation errors in nuisance models do not contaminate the primary causal parameter θ.
                </li>
                <li>
                  <strong>K-Fold Cross-Fitting:</strong> The sample is randomly split into K=5 folds. Nuisance functions are trained on out-of-fold data and evaluated on the holdout fold, preventing overfitting bias.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 5: Technology Stack */}
          <section
            id="techstack"
            className={`bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs ${
              activeSection === 'techstack' ? 'ring-2 ring-blue-500/20' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary">Section 5</Badge>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Frontend Technology Stack & Architecture
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                <span className="font-bold text-slate-900 block mb-0.5">React.js & Vite</span>
                <span className="text-slate-600 text-[11px]">
                  Fast modern single-page application framework with sub-second HMR and production bundle optimization.
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                <span className="font-bold text-slate-900 block mb-0.5">Tailwind CSS (v4)</span>
                <span className="text-slate-600 text-[11px]">
                  Custom light design tokens, typography, soft border styling, and responsive layout primitives.
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                <span className="font-bold text-slate-900 block mb-0.5">Recharts</span>
                <span className="text-slate-600 text-[11px]">
                  Interactive SVG visualization engine for histograms, scatter plots, trend lines, and counterfactual curves.
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                <span className="font-bold text-slate-900 block mb-0.5">Lucide React & React Router</span>
                <span className="text-slate-600 text-[11px]">
                  Consistent modern iconography and client-side route handling across 7 analytical modules.
                </span>
              </div>
            </div>
          </section>

          {/* Section 6: Development Progress */}
          <section
            id="progress"
            className={`bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs ${
              activeSection === 'progress' ? 'ring-2 ring-blue-500/20' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="success">Section 6</Badge>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Development Progress & Milestone Status
              </h2>
            </div>
            <div className="space-y-2.5 text-xs">
              {[
                { title: 'Project Scaffolding & Design System', desc: 'React, Vite, Tailwind CSS with corporate light palette', done: true },
                { title: 'Dashboard Overview Page', desc: 'Dataset stats (76K, 19, 100, 0), research objective, activities', done: true },
                { title: 'Dataset Overview & Data Dictionary', desc: '19 variables categorized with pagination and live search', done: true },
                { title: 'Exploratory Data Analysis (EDA)', desc: '7 Recharts figures with business & causal explanations', done: true },
                { title: 'DML Methodology Page', desc: '3 components, 8 stages with mathematical equation cards', done: true },
                { title: 'Causal Effect Analysis Page', desc: 'θ = -1.42, 95% CI, residuals, model metrics, OLS comparison', done: true },
                { title: 'Dynamic Pricing Simulation Engine', desc: 'Product/store selector, price change %, counterfactual curves', done: true },
                { title: 'Project Documentation Page', desc: 'Whitepaper, objectives, tech stack, roadmap', done: true },
              ].map((m, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">{m.title}</span>
                    <span className="text-slate-500 text-[11px] block">{m.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Future Roadmap */}
          <section
            id="roadmap"
            className={`bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs ${
              activeSection === 'roadmap' ? 'ring-2 ring-blue-500/20' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="navy">Section 7</Badge>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Future Implementation Roadmap
              </h2>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">Phase 2: Python Backend (DoubleML / EconML)</span>
                  <span className="text-blue-600 font-mono text-[10px] font-semibold">Q1 2027</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Implement a high-performance Python FastAPI service wrapping the `DoubleML` and `EconML` libraries. Ingest actual client CSV/Parquet files and compute live cross-fitted estimators.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">Phase 3: Automated Price Optimization & Guardrails</span>
                  <span className="text-blue-600 font-mono text-[10px] font-semibold">Q2 2027</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Add constrained mathematical optimization (Scipy / CVXPY) to recommend pricing bounded by inventory expiration, minimum gross margins, and anti-gouging regulatory limits.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">Phase 4: Real-Time Multi-Armed Bandit Field Testing</span>
                  <span className="text-blue-600 font-mono text-[10px] font-semibold">Q3 2027</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Close the loop between observational causal inference and online experimentation via contextual bandits that dynamically balance exploitation of DML elasticities with active exploration.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
