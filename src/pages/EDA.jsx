import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  BarChart3,
  TrendingDown,
  Layers,
  Info,
  Calendar,
  Grid,
  ArrowUpDown,
  Filter,
  AlertTriangle,
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Badge from '../components/common/Badge';
import DisclaimerBanner from '../components/common/DisclaimerBanner';
import Tooltip from '../components/common/Tooltip';
import {
  PRICE_DISTRIBUTION_DATA,
  UNITS_SOLD_DISTRIBUTION_DATA,
  SCATTER_SAMPLE_DATA,
  MONTHLY_SALES_TREND,
  CATEGORY_SALES_COMPARISON,
  STORE_PRICE_VARIATION,
  CORRELATION_MATRIX,
} from '../data/mockData';

export default function EDA() {
  const [scatterCategoryFilter, setScatterCategoryFilter] = useState('ALL');

  const filteredScatterData =
    scatterCategoryFilter === 'ALL'
      ? SCATTER_SAMPLE_DATA
      : SCATTER_SAMPLE_DATA.filter((d) => d.category === scatterCategoryFilter);

  // Helper for correlation matrix cell colors
  const getCorrelationColor = (val) => {
    if (val === 1) return 'bg-slate-900 text-white font-bold';
    if (val >= 0.6) return 'bg-blue-600 text-white font-semibold';
    if (val >= 0.3) return 'bg-blue-400 text-white';
    if (val > 0) return 'bg-blue-100 text-blue-900';
    if (val === 0) return 'bg-slate-100 text-slate-600';
    if (val > -0.3) return 'bg-amber-100 text-amber-900';
    if (val > -0.6) return 'bg-rose-400 text-white';
    return 'bg-rose-600 text-white font-semibold';
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner */}
      <DisclaimerBanner
        title="Exploratory Data Analysis – Empirical Distributions"
        description="Exploratory charts illustrate the empirical patterns in the 76,000 retail records. While observational correlations provide useful business intelligence, they are confounded by promotions and seasonality—motivating the need for Double Machine Learning."
      />

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Average Selling Price"
          value="$62.40"
          subvalue="Std Dev: $48.20 (Min $11.50, Max $349.99)"
          icon={BarChart3}
          badge="Treatment (T)"
          badgeVariant="danger"
        />
        <MetricCard
          title="Mean Daily Sales"
          value="74.2 units"
          subvalue="Range: 12 to 280 units / day"
          icon={TrendingDown}
          badge="Outcome (Y)"
          badgeVariant="success"
        />
        <MetricCard
          title="Raw Price Correlation"
          value="-0.42"
          subvalue="Observational Pearson correlation (Y vs T)"
          icon={Layers}
          tooltip="Naive correlation conflates price sensitivity with promotions and seasonal demand spikes."
          badge="Confounded"
          badgeVariant="warning"
        />
        <MetricCard
          title="Promotional Frequency"
          value="24.8%"
          subvalue="Active promotional banners in panel"
          icon={Calendar}
          badge="Key Confounder"
          badgeVariant="primary"
        />
      </div>

      {/* Row 1: Price Distribution & Units Sold Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Price Distribution Histogram */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm font-heading">
                1. Price Distribution Histogram
              </h3>
              <Badge variant="danger" size="xs">Treatment (T)</Badge>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Frequency distribution of unit prices across the 76,000 daily observations
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PRICE_DISTRIBUTION_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <RechartsTooltip
                    formatter={(val) => [`${val.toLocaleString()} records`, 'Frequency']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Chart Takeaway:</strong> Retail prices show heavy right-skewness. Over 56% of sales occur in everyday items under $70, while premium electronics ($150–$350) represent high-margin long-tail transactions requiring regularization.
          </div>
        </div>

        {/* Chart 2: Units Sold Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm font-heading">
                2. Units Sold Distribution
              </h3>
              <Badge variant="success" size="xs">Outcome (Y)</Badge>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Daily consumer purchase volume distribution across retail stores
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={UNITS_SOLD_DISTRIBUTION_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="bin" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <RechartsTooltip
                    formatter={(val) => [`${val.toLocaleString()} records`, 'Frequency']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Chart Takeaway:</strong> Units sold follow a Poisson-type distribution centered around 60–90 daily units, with heavy holiday-promotional tails exceeding 200 units, indicating strong non-linear demand responsiveness.
          </div>
        </div>
      </div>

      {/* Row 2: Price vs Units Sold Scatter & Monthly Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Price vs Units Sold Scatter Plot */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm font-heading">
                  3. Price vs. Units Sold (Observational Scatter)
                </h3>
                <p className="text-xs text-slate-500">
                  Visualizing raw downward demand relationship and confounding scatter
                </p>
              </div>

              {/* Category Filter */}
              <select
                value={scatterCategoryFilter}
                onChange={(e) => setScatterCategoryFilter(e.target.value)}
                className="text-xs py-1 px-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none"
              >
                <option value="ALL">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Groceries">Groceries</option>
                <option value="Apparel">Apparel</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            <div className="h-64 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    type="number"
                    dataKey="price"
                    name="Price"
                    unit="$"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <YAxis
                    type="number"
                    dataKey="unitsSold"
                    name="Units Sold"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <RechartsTooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(val, name) => [name === 'Price' ? `$${val}` : `${val} units`, name]}
                  />
                  <Scatter name="Observations" data={filteredScatterData} fill="#2563eb" fillOpacity={0.7} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-900 leading-relaxed">
            <strong className="text-amber-950 flex items-center gap-1 mb-0.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" /> Causal Caution (Confounding):
            </strong>
            The raw scatter exhibits a negative downward slope, but high-demand promotional days create outlier clusters in high-price brackets. A simple linear regression will underestimate price elasticity without orthogonal nuisance conditioning.
          </div>
        </div>

        {/* Chart 4: Monthly Sales Trend */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm font-heading">
                4. Monthly Sales Volume & Price Dynamics
              </h3>
              <Badge variant="primary" size="xs">Seasonality</Badge>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Annual monthly sales volume alongside average selling price
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_SALES_TREND} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(val, name) => [
                      name === 'unitsSold' ? `${val.toLocaleString()} units` : `$${val}`,
                      name === 'unitsSold' ? 'Total Units Sold' : 'Avg Price',
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="unitsSold"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#salesGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Chart Takeaway:</strong> Pronounced seasonal spikes occur during November and December (holiday shopping), where sales exceed 300,000 units while promotional discounts depress average price—confirming seasonality as a major confounder.
          </div>
        </div>
      </div>

      {/* Row 3: Category Comparison & Store Price Variation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 5: Category-Wise Sales Comparison */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm font-heading">
                5. Category-Wise Sales & Revenue Comparison
              </h3>
              <Badge variant="purple" size="xs">Stratification</Badge>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Total units sold and revenue contribution by product category
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CATEGORY_SALES_COMPARISON} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(val, name) => [
                      name === 'unitsSold' ? `${val.toLocaleString()} units` : `$${(val / 1e6).toFixed(1)}M`,
                      name === 'unitsSold' ? 'Units Sold' : 'Total Revenue',
                    ]}
                  />
                  <Bar dataKey="unitsSold" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Chart Takeaway:</strong> Groceries account for the highest unit volume (842,000 units), while Electronics generate the largest overall revenue ($60.9M). Heterogeneous treatment effects must be estimated separately across these categories.
          </div>
        </div>

        {/* Chart 6: Store Price Variation */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm font-heading">
                6. Price Variation Across Retail Stores
              </h3>
              <Badge variant="default" size="xs">Store Fixed Effects</Badge>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Average and range of product prices charged across 10 store locations
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={STORE_PRICE_VARIATION} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="store" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="$" />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(val) => [`$${val.toFixed(2)}`, 'Avg Price']}
                  />
                  <Bar dataKey="avg" fill="#0f172a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Chart Takeaway:</strong> Regional stores show consistent pricing bands with moderate variations driven by store-specific competitive zones (e.g., North store #106 averages $71.30 vs. South store #109 averaging $58.70).
          </div>
        </div>
      </div>

      {/* Row 4: Correlation Heatmap Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base font-heading">
                7. Correlation Matrix & Feature Interdependencies
              </h3>
              <Badge variant="primary">Heatmap View</Badge>
            </div>
            <p className="text-xs text-slate-500">
              Pearson correlation coefficients highlighting strong inter-feature collinearity
            </p>
          </div>

          {/* Color legend */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-blue-600 inline-block" /> Positive (+1.0)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-slate-200 inline-block" /> Zero (0.0)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-rose-600 inline-block" /> Negative (-1.0)
            </span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-left font-semibold text-slate-600 border-b border-slate-200">
                  Feature
                </th>
                {CORRELATION_MATRIX.map((c, i) => (
                  <th key={i} className="p-2 font-semibold text-slate-700 border-b border-slate-200 text-[11px] truncate max-w-[90px]">
                    {c.feature}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CORRELATION_MATRIX.map((row, rIdx) => (
                <tr key={rIdx}>
                  <td className="p-2 text-left font-semibold text-slate-800 border-b border-slate-100 text-xs">
                    {row.feature}
                  </td>
                  {CORRELATION_MATRIX.map((col, cIdx) => {
                    const rawVal = row[col.feature.replace(/\s+/g, '')] ?? row[col.feature] ?? 0;
                    return (
                      <td key={cIdx} className="p-1 border-b border-slate-100">
                        <div
                          className={`py-2 px-2 rounded-lg text-[11px] font-mono transition-transform hover:scale-105 ${getCorrelationColor(
                            rawVal
                          )}`}
                          title={`${row.feature} vs ${col.feature}: ${rawVal.toFixed(2)}`}
                        >
                          {rawVal.toFixed(2)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Econometric Interpretation:</strong> High correlation between <em>Competitor Price</em> and <em>Price</em> (0.88), as well as between <em>Discount</em> and <em>Units Sold</em> (0.48), directly demonstrates why traditional OLS suffers from severe omitted variable bias. The Double Machine Learning framework orthogonally removes these joint dependencies.
        </div>
      </div>
    </div>
  );
}
