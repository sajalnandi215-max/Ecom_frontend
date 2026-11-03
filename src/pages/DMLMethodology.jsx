import React from 'react';
import {
  GitBranch,
  ArrowRight,
  TrendingDown,
  Layers,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Cpu,
  Split,
  Binary,
  Target,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import Badge from '../components/common/Badge';
import EquationCard from '../components/common/EquationCard';
import Tooltip from '../components/common/Tooltip';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

export default function DMLMethodology() {
  return (
    <div className="space-y-8">
      {/* Disclaimer */}
      <DisclaimerBanner
        title="Theoretical Framework & Econometric Specification"
        description="Formal mathematical formulation based on Chernozhukov et al. (2018), 'Double/Debiased Machine Learning for Treatment and Structural Parameters'. Equations and workflow stages describe the core causal identification engine."
      />

      {/* Header Introduction */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Chernozhukov et al. (2018) Methodology</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading mb-3">
            Double Machine Learning (DML) Analytical Architecture
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Double Machine Learning combines flexible, high-dimensional machine learning (such as LightGBM, Random Forests, or Gradient Boosting) with rigorous econometrics. By using <strong>Neyman orthogonal score equations</strong> and <strong>K-fold cross-fitting</strong>, DML isolates the true causal effect of price on consumer sales without regularization bias.
          </p>
        </div>
      </div>

      {/* 3 Main Components Display (Explicitly Required by Prompt) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              Three Fundamental Structural Components
            </h2>
            <p className="text-xs text-slate-500">
              The tripartite partitioning of retail panel variables into Treatment, Outcome, and Confounders
            </p>
          </div>
          <Badge variant="primary">Identification Triad</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Component 1: Treatment (T) */}
          <div className="bg-white rounded-2xl border-2 border-rose-200 p-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full pointer-events-none -mr-4 -mt-4" />
            <div className="flex items-center justify-between mb-3">
              <Badge variant="danger" size="md">TREATMENT (T)</Badge>
              <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                Exogenous / Policy Lever
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading mb-1">
              Unit Selling Price ($)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              The policy intervention whose causal effect on demand we want to isolate and quantify.
            </p>
            <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3 text-xs text-rose-950 font-mono">
              <div className="text-[11px] text-rose-700 uppercase font-semibold font-sans mb-1">Variable Notation:</div>
              T = Daily Retail Price ($11.50 – $349.99)
            </div>
          </div>

          {/* Component 2: Outcome (Y) */}
          <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full pointer-events-none -mr-4 -mt-4" />
            <div className="flex items-center justify-between mb-3">
              <Badge variant="success" size="md">OUTCOME (Y)</Badge>
              <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Target Objective
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading mb-1">
              Units Sold (Volume)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Consumer demand quantity directly influenced by price adjustments and market conditions.
            </p>
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-950 font-mono">
              <div className="text-[11px] text-emerald-700 uppercase font-semibold font-sans mb-1">Variable Notation:</div>
              Y = Daily Net Units Sold (12 – 280 units)
            </div>
          </div>

          {/* Component 3: Controls (X) */}
          <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full pointer-events-none -mr-4 -mt-4" />
            <div className="flex items-center justify-between mb-3">
              <Badge variant="primary" size="md">CONTROL VARIABLES (X)</Badge>
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                High-Dim Confounders
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading mb-1">
              Confounders & Covariates
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              All factors that simultaneously influence both price decisions and sales demand.
            </p>
            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs text-blue-950 font-mono">
              <div className="text-[11px] text-blue-700 uppercase font-semibold font-sans mb-1">Feature Vector X:</div>
              [Discount, Promotion, Competitor Price, Weather, Seasonality, Product ID, Store ID, Year, Month, DayOfWeek, Demand]
            </div>
          </div>
        </div>
      </div>

      {/* "Why Double Machine Learning?" Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Core Econometric Rationale</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
            Why Double Machine Learning?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
            Understanding why naive Machine Learning or standard Linear Regression fails in pricing intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center mb-3">
              1
            </div>
            <h4 className="font-bold text-slate-100 text-sm mb-1.5">
              Omitted Variable Bias in OLS
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Standard OLS assumes linear relationships. When high-dimensional confounders (competitor pricing, promotions, weather) interact non-linearly, OLS severely underestimates price sensitivity, misguiding pricing strategy.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center mb-3">
              2
            </div>
            <h4 className="font-bold text-slate-100 text-sm mb-1.5">
              Regularization Bias in Naive ML
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Plugging price and covariates into a single Lasso, Random Forest, or Neural Network shrinks the price coefficient towards zero (regularization bias), destroying valid confidence intervals and statistical testing.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center mb-3">
              3
            </div>
            <h4 className="font-bold text-slate-100 text-sm mb-1.5">
              The DML Solution: Orthogonality
            </h4>
            <p className="text-slate-300 leading-relaxed">
              DML residualizes both price and sales using separate ML models, and cross-fits the predictions. The resulting causal parameter θ converges at the parametric √N rate with valid Gaussian confidence intervals.
            </p>
          </div>
        </div>
      </div>

      {/* The 8 Detailed Stages (Explicitly Required by Prompt) */}
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-heading">
            The 8 Sequential Stages of Double Machine Learning
          </h2>
          <p className="text-xs text-slate-500">
            Step-by-step mathematical derivation and implementation workflow
          </p>
        </div>

        {/* Stage 1: Data Preparation */}
        <EquationCard
          stepNumber="1"
          title="Data Preparation & Feature Vector Assembly"
          badgeText="Stage 1"
          badgeVariant="default"
          equation="Z_i = (Y_i, T_i, X_i) \quad \text{for } i = 1, \dots, N"
          intuition="Collect retail panel data across stores, products, and dates. Clean missing entries, encode categorical fixed effects, and assemble the high-dimensional covariate vector X containing all possible confounders."
          variables={[
            { symbol: 'Y_i', name: 'Sales Volume', description: 'Observed daily net units sold for observation i.' },
            { symbol: 'T_i', name: 'Selling Price', description: 'Observed price charged for observation i.' },
            { symbol: 'X_i', name: 'Confounder Vector', description: '19 preprocessed retail covariates and fixed effects.' },
            { symbol: 'N', name: 'Sample Size', description: '76,000 total observations in the balanced panel.' },
          ]}
        />

        {/* Stage 2: Treatment & Outcome Identification */}
        <EquationCard
          stepNumber="2"
          title="Treatment and Outcome Identification"
          badgeText="Stage 2"
          badgeVariant="default"
          equation="Y = \theta_0 \cdot T + g_0(X) + U, \quad E[U \mid T, X] = 0"
          intuition="Formulate the partially linear model (PLM). The parameter theta represents the true causal marginal effect of price on units sold after controlling for an arbitrary non-linear confounding function g_0(X)."
          variables={[
            { symbol: '\theta_0', name: 'Target Causal Parameter', description: 'The unconfounded marginal change in sales per $1 price change.' },
            { symbol: 'g_0(X)', name: 'Confounding Function', description: 'Unknown complex non-linear mapping from covariates to sales.' },
            { symbol: 'U', name: 'Exogenous Shock', description: 'Idiosyncratic unobserved shock uncorrelated with treatment.' },
          ]}
        />

        {/* Stage 3: Outcome Nuisance Model */}
        <EquationCard
          stepNumber="3"
          title="Outcome Nuisance Model: E[Y | X]"
          badgeText="Stage 3: ML Model 1"
          badgeVariant="primary"
          equation="\hat{\ell}(X) = \hat{E}[Y \mid X] \quad \text{via LightGBM Regressor}"
          intuition="Train a powerful non-parametric machine learning algorithm (e.g. LightGBM with 150 gradient-boosted trees) to predict units sold strictly from the confounder vector X, ignoring price T."
          variables={[
            { symbol: '\hat{\ell}(X)', name: 'Conditional Sales Expectation', description: 'Predicted sales volume expected purely based on promotion, weather, and store context.' },
            { symbol: 'LightGBM', name: 'Learner Class', description: 'Gradient boosting optimized with 5-fold cross-validation (R² = 0.824).' },
          ]}
        />

        {/* Stage 4: Treatment Nuisance Model */}
        <EquationCard
          stepNumber="4"
          title="Treatment Nuisance Model: E[T | X]"
          badgeText="Stage 4: ML Model 2"
          badgeVariant="primary"
          equation="\hat{m}(X) = \hat{E}[T \mid X] \quad \text{via Random Forest Regressor}"
          intuition="Train a second independent machine learning model (e.g. Random Forest with 120 trees) to predict price strictly from the confounders X, isolating how store managers set prices in response to market conditions."
          variables={[
            { symbol: '\hat{m}(X)', name: 'Conditional Price Expectation', description: 'The predictable portion of price driven by competitor price, discounts, and seasonality.' },
            { symbol: 'RandomForest', name: 'Learner Class', description: 'Ensemble of decision trees isolating exogenous price variations (MAE = $2.15).' },
          ]}
        />

        {/* Stage 5: Residual Calculation */}
        <EquationCard
          stepNumber="5"
          title="Orthogonal Residual Calculation (Frisch-Waugh-Lovell)"
          badgeText="Stage 5: Residualization"
          badgeVariant="purple"
          equation="\tilde{Y} = Y - \hat{\ell}(X), \qquad \tilde{T} = T - \hat{m}(X)"
          intuition="Compute the orthogonal residuals. Y-tilde represents sales variation unexplained by covariates; T-tilde represents price variation unexplained by competitor behavior or promotions (pure exogenous pricing variation)."
          variables={[
            { symbol: '\tilde{Y}', name: 'Outcome Residual', description: 'Pure idiosyncratic demand movement stripped of confounder influence.' },
            { symbol: '\tilde{T}', name: 'Treatment Residual', description: 'Exogenous pricing shock uncorrelated with market confounders.' },
          ]}
        />

        {/* Stage 6: Cross-Fitting */}
        <EquationCard
          stepNumber="6"
          title="K-Fold Cross-Fitting (Sample Splitting)"
          badgeText="Stage 6: Bias Elimination"
          badgeVariant="purple"
          equation="\{I_k\}_{k=1}^K, \quad \hat{\ell}_{-k}(X) \text{ trained on } I_k^c, \quad \text{evaluated on } I_k"
          intuition="Crucial safeguard: Partition data into K=5 folds. Never use the same data to fit nuisance models and evaluate residuals! Cross-fitting prevents overfitting bias and guarantees root-N consistency."
          variables={[
            { symbol: 'K = 5', name: 'Number of Folds', description: 'Balanced 80% train / 20% validation split cycled across all observations.' },
            { symbol: 'I_k^c', name: 'Out-of-Fold Training Data', description: '60,800 records used to train nuisance functions.' },
            { symbol: 'I_k', name: 'Holdout Fold', description: '15,200 records used to compute unbiased orthogonal residuals.' },
          ]}
        />

        {/* Stage 7: Causal Effect Estimation */}
        <EquationCard
          stepNumber="7"
          title="Causal Effect Estimation (Residual-on-Residual Regression)"
          badgeText="Stage 7: Orthogonal Estimation"
          badgeVariant="success"
          equation="\hat{\theta} = \left( \frac{1}{N} \sum_{i=1}^N \tilde{T}_i^2 \right)^{-1} \left( \frac{1}{N} \sum_{i=1}^N \tilde{T}_i \tilde{Y}_i \right) = -1.42"
          intuition="Regress the outcome residual Y-tilde on the treatment residual T-tilde via Neyman orthogonal score. The resulting coefficient theta provides the true, unbiased causal price elasticity of demand."
          variables={[
            { symbol: '\hat{\theta}', name: 'Estimated Causal Slope', description: 'Illustrative result: Each $1 price hike causes 1.42 fewer units sold.' },
            { symbol: '\psi(Z; \theta, \eta)', name: 'Neyman Orthogonal Score', description: 'Score function whose Gateaux derivative with respect to nuisance parameters is zero.' },
          ]}
        />

        {/* Stage 8: Statistical Evaluation */}
        <EquationCard
          stepNumber="8"
          title="Statistical Evaluation, Confidence Intervals & Inference"
          badgeText="Stage 8: Inference"
          badgeVariant="navy"
          equation="\sqrt{N} (\hat{\theta} - \theta_0) \xrightarrow{d} \mathcal{N}(0, \hat{V}), \quad 95\% \text{ CI}: [\hat{\theta} \pm 1.96 \cdot \text{SE}]"
          intuition="Because Neyman orthogonality protects against first-order errors in nuisance estimates, the causal estimator is asymptotically normal. Researchers can compute valid t-statistics, p-values, and 95% confidence intervals."
          variables={[
            { symbol: '\text{SE}', name: 'Standard Error', description: 'Robust heteroskedasticity-consistent standard error = 0.068.' },
            { symbol: '95% CI', name: 'Confidence Interval', description: 'Illustrative 95% interval: [-1.55, -1.29], p < 0.0001 (statistically significant).' },
          ]}
        />
      </div>
    </div>
  );
}
