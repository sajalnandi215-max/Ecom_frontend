import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';
import {
  TrendingDown,
  ShieldAlert,
  Layers,
  Cpu,
  BarChart2,
  CheckCircle2,
  Sparkles,
  Info,
  GitBranch,
  Target,
  Scale,
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Badge from '../components/common/Badge';
import DisclaimerBanner from '../components/common/DisclaimerBanner';
import Tooltip from '../components/common/Tooltip';
import {
  CAUSAL_RESULTS,
  CROSS_FITTING_FOLDS_DATA,
  RESIDUAL_SCATTER_SAMPLE,
  CATE_BY_CATEGORY,
} from '../data/mockData';

export default function CausalAnalysis() {
  const [activeTab, setActiveTab] = useState('orthogonal');

  return (
    <div className="space-y-6">
      {/* Prominent Disclaimer Banner */}
      <DisclaimerBanner
        title="Illustrative Sample Data – Actual DML Results Pending"
        description="All causal coefficients, standard errors, confidence intervals, and residual plots presented below are synthetic research placeholders designed to demonstrate the analytical user interface. They do not constitute actual empirical conclusions."
      />

      {/* Header Summary */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-lg text-slate-900 font-heading">
                Causal Treatment Effect & Econometric Inference
              </span>
              <Badge variant="navy">Chernozhukov DML Specification</Badge>
            </div>
            <p className="text-xs text-slate-500 max-w-2xl">
              Orthogonalized residual-on-residual regression estimates isolating the true unconfounded price elasticity of demand across 76,000 retail observations.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">Status:</span>
            <Badge variant="warning">Illustrative Results</Badge>
          </div>
        </div>
      </div>

      {/* 6 Key Causal Metric Cards (Required by Prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Metric 1: Estimated Treatment Effect */}
        <MetricCard
          title="Estimated Treatment Effect (θ)"
          value={CAUSAL_RESULTS.treatmentEffect.toString()}
          subvalue="Sales change per $1 price increase"
          icon={TrendingDown}
          highlight={true}
          tooltip="Orthogonal Frisch-Waugh-Lovell coefficient measuring pure causal demand elasticity."
          badge="θ = -1.42 units"
          badgeVariant="danger"
        />

        {/* Metric 2: Standard Error */}
        <MetricCard
          title="Robust Standard Error"
          value={CAUSAL_RESULTS.standardError.toString()}
          subvalue="Heteroskedasticity-consistent SE"
          icon={Scale}
          tooltip="Asymptotic standard error derived from Neyman orthogonal variance score."
          badge="SE = 0.068"
          badgeVariant="default"
        />

        {/* Metric 3: 95% Confidence Interval */}
        <MetricCard
          title="95% Confidence Interval"
          value={`[${CAUSAL_RESULTS.confidenceInterval95[0]}, ${CAUSAL_RESULTS.confidenceInterval95[1]}]`}
          subvalue="Parametric Wald interval"
          icon={Target}
          tooltip="Root-N normal asymptotic 95% confidence interval bounded away from zero."
          badge="Statistically Bounded"
          badgeVariant="primary"
        />

        {/* Metric 4: Statistical Significance */}
        <MetricCard
          title="Statistical Significance"
          value="p < 0.0001"
          subvalue={`t-statistic: ${CAUSAL_RESULTS.tStatistic} (Two-tailed)`}
          icon={CheckCircle2}
          tooltip="Extremely high t-statistic rejects null hypothesis of zero price sensitivity."
          badge="Highly Significant"
          badgeVariant="success"
        />

        {/* Metric 5: Outcome Model Performance */}
        <MetricCard
          title="Outcome Model E[Y|X]"
          value={`R² = ${CAUSAL_RESULTS.outcomeR2}`}
          subvalue={`RMSE: ${CAUSAL_RESULTS.outcomeRMSE} | ${CAUSAL_RESULTS.nuisanceModelY}`}
          icon={Cpu}
          tooltip="LightGBM performance on predicting sales volume strictly from confounders."
          badge="Nuisance Model 1"
          badgeVariant="default"
        />

        {/* Metric 6: Treatment Model Performance */}
        <MetricCard
          title="Treatment Model E[T|X]"
          value={`R² = ${CAUSAL_RESULTS.treatmentR2}`}
          subvalue={`MAE: $${CAUSAL_RESULTS.treatmentMAE} | ${CAUSAL_RESULTS.nuisanceModelT}`}
          icon={Layers}
          tooltip="Random Forest performance on predicting price strictly from confounders."
          badge="Nuisance Model 2"
          badgeVariant="default"
        />
      </div>

      {/* Comparison Callout: Naive OLS vs Double Machine Learning */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-bold text-base font-heading flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Causal Debiasing: Naive OLS vs. Double Machine Learning</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Demonstrating the magnitude of Omitted Variable Bias (OVB) eliminated by DML
            </p>
          </div>
          <Badge variant="primary">Bias Correction: +0.74</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-rose-300">Naive Linear Regression (OLS)</span>
              <span className="font-mono font-bold text-rose-400 text-sm">Slope = -0.68</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Fails to account for non-linear promotional spikes and seasonal demand surges. Because retailers discount products when demand is already high, naive regression severely underestimates true consumer price sensitivity by over 52%.
            </p>
          </div>

          <div className="bg-blue-950/80 p-4 rounded-xl border border-blue-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-blue-300">Double Machine Learning (DML)</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">θ = -1.42</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              By partialling out confounders via Frisch-Waugh-Lovell orthogonal residuals and cross-fitting, DML isolates exogenous price variation, uncovering the true elasticity of -1.42 units per $1.
            </p>
          </div>
        </div>
      </div>

      {/* Visualizations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Orthogonal Residual Scatter & Causal Slope */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm font-heading">
                  1. Orthogonal Residual Scatter (Frisch-Waugh-Lovell)
                </h3>
                <p className="text-xs text-slate-500">
                  Treatment Residuals (T̃) vs. Outcome Residuals (Ỹ) with Causal Slope θ = -1.42
                </p>
              </div>
              <Badge variant="danger" size="xs">FWL Regression</Badge>
            </div>

            <div className="h-64 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    type="number"
                    dataKey="resT"
                    name="Treatment Residual (T̃)"
                    unit="$"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <YAxis
                    type="number"
                    dataKey="resY"
                    name="Outcome Residual (Ỹ)"
                    unit="u"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <RechartsTooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(val, name) => [
                      name === 'Treatment Residual (T̃)' ? `$${val}` : `${val} units`,
                      name,
                    ]}
                  />
                  <ReferenceLine y={0} stroke="#cbd5e1" strokeDasharray="3 3" />
                  <ReferenceLine x={0} stroke="#cbd5e1" strokeDasharray="3 3" />
                  <Scatter
                    name="Residual Observations"
                    data={RESIDUAL_SCATTER_SAMPLE}
                    fill="#2563eb"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Chart Takeaway:</strong> With all high-dimensional confounders orthogonalized out, the relationship between exogenous price shocks (T̃) and unexplained sales movements (Ỹ) is cleanly linear with slope -1.42.
          </div>
        </div>

        {/* Chart 2: Heterogeneous CATE by Product Category */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm font-heading">
                  2. Heterogeneous Causal Effects (CATE by Category)
                </h3>
                <p className="text-xs text-slate-500">
                  Estimated category-level price elasticity parameters (θ_k)
                </p>
              </div>
              <Badge variant="purple" size="xs">CATE Breakdown</Badge>
            </div>

            <div className="h-64 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CATE_BY_CATEGORY} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(val) => [`${val} units / $1`, 'Estimated θ']}
                  />
                  <ReferenceLine y={0} stroke="#94a3b8" />
                  <Bar dataKey="theta" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Chart Takeaway:</strong> Groceries exhibit the highest sensitivity (θ = -2.15), reflecting low consumer switching costs, whereas Electronics show lower elasticity (θ = -0.92) due to brand loyalty and feature differentiation.
          </div>
        </div>
      </div>

      {/* Model Evaluation & Cross-Fitting Fold Stability Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base font-heading">
              5-Fold Cross-Fitting Convergence & Stability Diagnostics
            </h3>
            <p className="text-xs text-slate-500">
              Assessing fold-by-fold parameter consistency and nuisance model out-of-fold generalization
            </p>
          </div>
          <Badge variant="success">All Folds Converged</Badge>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3">Cross-Fitting Partition</th>
                <th className="px-4 py-3">Estimated Effect (θ_k)</th>
                <th className="px-4 py-3">Fold SE</th>
                <th className="px-4 py-3">Outcome Model R² (Y)</th>
                <th className="px-4 py-3">Treatment Model R² (T)</th>
                <th className="px-4 py-3">Train / Val Records</th>
                <th className="px-4 py-3">Convergence Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px] text-slate-700">
              {CROSS_FITTING_FOLDS_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900 font-sans">{row.fold}</td>
                  <td className="px-4 py-3 font-bold text-rose-600">{row.theta.toFixed(2)}</td>
                  <td className="px-4 py-3 text-slate-600">{row.se.toFixed(3)}</td>
                  <td className="px-4 py-3 text-slate-700">{row.outcomeR2.toFixed(3)}</td>
                  <td className="px-4 py-3 text-slate-700">{row.treatmentR2.toFixed(3)}</td>
                  <td className="px-4 py-3 text-slate-500 font-sans">
                    {row.trainSamples.toLocaleString()} / {row.valSamples.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-sans">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Converged
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Diagnostic Summary:</strong> The estimated effect parameter remains remarkably stable across all 5 folds (ranging between -1.38 and -1.46), with standard errors tightly clustered around 0.068. This confirms that the DML causal estimate is not an artifact of random sample partitioning.
        </div>
      </div>
    </div>
  );
}
