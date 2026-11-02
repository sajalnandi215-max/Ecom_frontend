import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Percent,
  Sparkles,
  RefreshCw,
  ShoppingBag,
  Store,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import {
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
  Scatter,
  ComposedChart,
} from 'recharts';
import MetricCard from '../components/common/MetricCard';
import Badge from '../components/common/Badge';
import DisclaimerBanner from '../components/common/DisclaimerBanner';
import Tooltip from '../components/common/Tooltip';
import { SIMULATOR_PRODUCTS, SIMULATOR_STORES } from '../data/mockData';

export default function DynamicPricing() {
  // Simulator State
  const [selectedProductId, setSelectedProductId] = useState(SIMULATOR_PRODUCTS[0].id);
  const [selectedStoreId, setSelectedStoreId] = useState(SIMULATOR_STORES[0].id);

  // Selected item references
  const selectedProduct = useMemo(
    () => SIMULATOR_PRODUCTS.find((p) => p.id === selectedProductId) || SIMULATOR_PRODUCTS[0],
    [selectedProductId]
  );

  const selectedStore = useMemo(
    () => SIMULATOR_STORES.find((s) => s.id === selectedStoreId) || SIMULATOR_STORES[0],
    [selectedStoreId]
  );

  // User price inputs
  const [currentPrice, setCurrentPrice] = useState(selectedProduct.currentPrice);
  const [proposedPrice, setProposedPrice] = useState(selectedProduct.currentPrice * 0.95);

  // Whenever product changes, update defaults
  const handleProductChange = (prodId) => {
    const prod = SIMULATOR_PRODUCTS.find((p) => p.id === prodId);
    setSelectedProductId(prodId);
    if (prod) {
      setCurrentPrice(prod.currentPrice);
      setProposedPrice(parseFloat((prod.currentPrice * 0.95).toFixed(2)));
    }
  };

  // Effective elasticity calculation
  // Effective Theta = Product theta * store multiplier
  const effectiveTheta = useMemo(() => {
    return selectedProduct.theta * selectedStore.elasticityMultiplier;
  }, [selectedProduct, selectedStore]);

  // Economic calculations
  const priceChange = proposedPrice - currentPrice;
  const priceChangePct = currentPrice > 0 ? (priceChange / currentPrice) * 100 : 0;

  const currentUnits = selectedProduct.baseUnitsSold;
  // Expected units = currentUnits + effectiveTheta * priceChange
  const expectedUnits = Math.max(0, Math.round(currentUnits + effectiveTheta * priceChange));
  const unitsDelta = expectedUnits - currentUnits;
  const unitsDeltaPct = currentUnits > 0 ? (unitsDelta / currentUnits) * 100 : 0;

  const currentRevenue = currentPrice * currentUnits;
  const proposedRevenue = proposedPrice * expectedUnits;
  const revenueDelta = proposedRevenue - currentRevenue;
  const revenueDeltaPct = currentRevenue > 0 ? (revenueDelta / currentRevenue) * 100 : 0;

  const currentProfit = (currentPrice - selectedProduct.baseCost) * currentUnits;
  const proposedProfit = (proposedPrice - selectedProduct.baseCost) * expectedUnits;
  const profitDelta = proposedProfit - currentProfit;

  // Generate Simulation Demand & Revenue Curve Data across price spectrum
  const simulationCurve = useMemo(() => {
    const points = [];
    const minP = Math.max(selectedProduct.baseCost * 1.05, selectedProduct.minPrice);
    const maxP = selectedProduct.maxPrice;
    const step = (maxP - minP) / 16;

    for (let p = minP; p <= maxP; p += step) {
      const pVal = parseFloat(p.toFixed(2));
      const delta = pVal - currentPrice;
      const uVal = Math.max(0, Math.round(currentUnits + effectiveTheta * delta));
      const rVal = parseFloat((pVal * uVal).toFixed(2));
      const profVal = parseFloat(((pVal - selectedProduct.baseCost) * uVal).toFixed(2));
      points.push({
        price: pVal,
        units: uVal,
        revenue: rVal,
        profit: profVal,
      });
    }
    return points;
  }, [selectedProduct, currentPrice, currentUnits, effectiveTheta]);

  // Find optimal revenue price point from simulation
  const optimalPricePoint = useMemo(() => {
    if (!simulationCurve.length) return null;
    return simulationCurve.reduce((prev, curr) => (curr.revenue > prev.revenue ? curr : prev));
  }, [simulationCurve]);

  // Comparison bar chart data
  const comparisonData = [
    {
      metric: 'Units Sold (Vol)',
      Current: currentUnits,
      Proposed: expectedUnits,
    },
  ];

  const revenueComparisonData = [
    {
      metric: 'Gross Revenue ($)',
      Current: parseFloat(currentRevenue.toFixed(2)),
      Proposed: parseFloat(proposedRevenue.toFixed(2)),
    },
    {
      metric: 'Gross Margin ($)',
      Current: parseFloat(currentProfit.toFixed(2)),
      Proposed: parseFloat(proposedProfit.toFixed(2)),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      <DisclaimerBanner
        title="Interactive Dynamic Pricing Simulation"
        description="This simulation runs counterfactual pricing scenarios using illustrative Double Machine Learning elasticity parameters. Calculations are strictly for interactive demonstration and pedagogical evaluation; they do not represent real algorithmic pricing decisions."
      />

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Dynamic Counterfactual Pricing Simulator
              </h2>
              <Badge variant="primary">Real-Time DML Engine</Badge>
            </div>
            <p className="text-xs text-slate-500 max-w-2xl">
              Simulate price alterations across retail stores. The simulator uses the estimated unconfounded causal elasticity coefficient to project counterfactual demand and revenue trajectories.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPrice(selectedProduct.currentPrice);
              setProposedPrice(parseFloat((selectedProduct.currentPrice * 0.95).toFixed(2)));
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Scenario</span>
          </button>
        </div>
      </div>

      {/* Simulator Control Panel (Select Product, Select Store, Enter Prices) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm font-heading mb-4 flex items-center gap-2">
          <span>Simulation Configuration Parameters</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Product Selector */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5 flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5 text-slate-400" /> Select Product SKU:
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => handleProductChange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs"
            >
              {SIMULATOR_PRODUCTS.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name} ({prod.category})
                </option>
              ))}
            </select>
            <div className="mt-1 text-[11px] text-slate-500 flex justify-between">
              <span>Unit Cost: ${selectedProduct.baseCost.toFixed(2)}</span>
              <span>DML θ: {selectedProduct.theta}</span>
            </div>
          </div>

          {/* Store Selector */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5 flex items-center gap-1">
              <Store className="w-3.5 h-3.5 text-slate-400" /> Select Store Location:
            </label>
            <select
              value={selectedStoreId}
              onChange={(e) => setSelectedStoreId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs"
            >
              {SIMULATOR_STORES.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name} ({store.region})
                </option>
              ))}
            </select>
            <div className="mt-1 text-[11px] text-slate-500 flex justify-between">
              <span>Region: {selectedStore.region}</span>
              <span>Sensitivity: {selectedStore.elasticityMultiplier}x</span>
            </div>
          </div>

          {/* Current Price Input */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Current Price ($):
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">
                $
              </span>
              <input
                type="number"
                step="0.50"
                min={selectedProduct.minPrice}
                max={selectedProduct.maxPrice}
                value={currentPrice}
                onChange={(e) => setCurrentPrice(parseFloat(e.target.value) || 0)}
                className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 font-mono font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs"
              />
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Competitor Benchmark: ${selectedProduct.competitorPrice.toFixed(2)}
            </div>
          </div>

          {/* Proposed Price Input & Quick Adjust */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-blue-600" /> Proposed Hypothetical Price ($):
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 font-mono text-xs">
                $
              </span>
              <input
                type="number"
                step="0.50"
                min={selectedProduct.minPrice}
                max={selectedProduct.maxPrice}
                value={proposedPrice}
                onChange={(e) => setProposedPrice(parseFloat(e.target.value) || 0)}
                className="w-full pl-7 pr-3 py-2 rounded-xl border-2 border-blue-400 font-mono font-bold text-blue-900 bg-blue-50/20 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-xs"
              />
            </div>

            {/* Quick adjust percentage buttons */}
            <div className="flex items-center gap-1 mt-1.5">
              {[-10, -5, 5, 10].map((pct) => (
                <button
                  key={pct}
                  onClick={() =>
                    setProposedPrice(parseFloat((currentPrice * (1 + pct / 100)).toFixed(2)))
                  }
                  className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-mono font-medium"
                >
                  {pct > 0 ? `+${pct}%` : `${pct}%`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Metrics Grid (All 5 prompt items explicitly included) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Current Price */}
        <MetricCard
          title="Current Price"
          value={`$${currentPrice.toFixed(2)}`}
          subvalue={`Cost: $${selectedProduct.baseCost.toFixed(2)} / unit`}
          icon={DollarSign}
          badge="Baseline"
          badgeVariant="default"
        />

        {/* Metric 2: Proposed Price */}
        <MetricCard
          title="Proposed Price"
          value={`$${proposedPrice.toFixed(2)}`}
          subvalue={priceChange >= 0 ? `+$${priceChange.toFixed(2)} change` : `-$${Math.abs(priceChange).toFixed(2)} change`}
          icon={DollarSign}
          highlight={true}
          badge="Simulation"
          badgeVariant="primary"
        />

        {/* Metric 3: Price Change % */}
        <MetricCard
          title="Price Change %"
          value={`${priceChangePct >= 0 ? '+' : ''}${priceChangePct.toFixed(1)}%`}
          subvalue={priceChangePct > 0 ? 'Price Increase' : priceChangePct < 0 ? 'Discount / Markdown' : 'No Change'}
          icon={Percent}
          trend={priceChangePct}
          trendLabel={`${priceChangePct.toFixed(1)}%`}
          badge={priceChangePct > 0 ? 'Premium' : 'Discount'}
          badgeVariant={priceChangePct > 0 ? 'primary' : 'warning'}
        />

        {/* Metric 4: Expected Units Sold */}
        <MetricCard
          title="Expected Units Sold"
          value={`${expectedUnits} units`}
          subvalue={`Base: ${currentUnits} (${unitsDelta >= 0 ? '+' : ''}${unitsDelta} units)`}
          icon={TrendingDown}
          trend={unitsDeltaPct}
          trendLabel={`${unitsDeltaPct >= 0 ? '+' : ''}${unitsDeltaPct.toFixed(1)}%`}
          badge={unitsDelta >= 0 ? 'Volume Gain' : 'Volume Decline'}
          badgeVariant={unitsDelta >= 0 ? 'success' : 'danger'}
        />

        {/* Metric 5: Revenue Comparison */}
        <MetricCard
          title="Expected Revenue"
          value={`$${proposedRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subvalue={`Base: $${currentRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${revenueDelta >= 0 ? '+' : ''}$${Math.abs(revenueDelta).toFixed(0)})`}
          icon={revenueDelta >= 0 ? TrendingUp : TrendingDown}
          trend={revenueDeltaPct}
          trendLabel={`${revenueDeltaPct >= 0 ? '+' : ''}${revenueDeltaPct.toFixed(1)}%`}
          badge={revenueDelta >= 0 ? 'Revenue Growth' : 'Revenue Drop'}
          badgeVariant={revenueDelta >= 0 ? 'success' : 'danger'}
        />
      </div>

      {/* Counterfactual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Revenue & Demand Counterfactual Curve */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm font-heading">
                  Counterfactual Revenue & Demand Curve
                </h3>
                <p className="text-xs text-slate-500">
                  Projected revenue trajectory across hypothetical price spectrum
                </p>
              </div>
              {optimalPricePoint && (
                <button
                  onClick={() => setProposedPrice(optimalPricePoint.price)}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200 flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  <span>Set Optimal (${optimalPricePoint.price.toFixed(2)})</span>
                </button>
              )}
            </div>

            <div className="h-64 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={simulationCurve} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="price"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <YAxis
                    yAxisId="rev"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <YAxis
                    yAxisId="units"
                    orientation="right"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                  />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(val, name) => [
                      name === 'revenue' ? `$${val}` : `${val} units`,
                      name === 'revenue' ? 'Projected Revenue' : 'Projected Units',
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <ReferenceLine
                    yAxisId="rev"
                    x={proposedPrice}
                    stroke="#2563eb"
                    strokeDasharray="3 3"
                    label={{ value: 'Proposed', fill: '#2563eb', fontSize: 10, position: 'top' }}
                  />
                  <Line
                    yAxisId="rev"
                    type="monotone"
                    dataKey="revenue"
                    name="Projected Revenue ($)"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    yAxisId="units"
                    type="monotone"
                    dataKey="units"
                    name="Projected Units Sold"
                    stroke="#10b981"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Analytical Insight:</strong> The projected revenue curve peaks where marginal revenue equals zero ($MR = 0$). Given the estimated elasticity of {effectiveTheta.toFixed(2)}, the revenue-maximizing price is projected near{' '}
            <strong className="text-blue-600">${optimalPricePoint?.price.toFixed(2)}</strong>.
          </div>
        </div>

        {/* Chart 2: Side-by-Side Comparison (Current vs Proposed) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm font-heading">
                  Revenue & Margin Comparison
                </h3>
                <p className="text-xs text-slate-500">
                  Side-by-side financial comparison between Current and Proposed pricing
                </p>
              </div>
              <Badge variant={revenueDelta >= 0 ? 'success' : 'danger'} size="xs">
                Δ {revenueDelta >= 0 ? '+' : ''}${revenueDelta.toFixed(0)}
              </Badge>
            </div>

            <div className="h-64 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueComparisonData} margin={{ top: 15, right: 10, left: -5, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="metric" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="$" />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(val) => [`$${val.toLocaleString()}`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="Current" fill="#94a3b8" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Proposed" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Financial Impact:</strong> Changing price from ${currentPrice.toFixed(2)} to ${proposedPrice.toFixed(2)} yields an expected volume change of {unitsDelta >= 0 ? '+' : ''}{unitsDelta} units ({unitsDeltaPct >= 0 ? '+' : ''}{unitsDeltaPct.toFixed(1)}%), generating an estimated net gross margin change of {profitDelta >= 0 ? '+$' : '-$'}{Math.abs(profitDelta).toFixed(2)}.
          </div>
        </div>
      </div>
    </div>
  );
}
