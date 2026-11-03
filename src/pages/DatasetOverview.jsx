import React, { useState, useMemo } from 'react';
import {
  Database,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Tag,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Badge from '../components/common/Badge';
import DisclaimerBanner from '../components/common/DisclaimerBanner';
import Tooltip from '../components/common/Tooltip';
import {
  DATASET_STATS,
  DATA_DICTIONARY,
  SAMPLE_DATASET_ROWS,
} from '../data/mockData';

export default function DatasetOverview() {
  // Dictionary Search & Filter
  const [dictSearch, setDictSearch] = useState('');
  const [dictRoleFilter, setDictRoleFilter] = useState('ALL');

  // Sample Data Preview Search & Filter
  const [dataSearch, setDataSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Filter Data Dictionary
  const filteredDictionary = useMemo(() => {
    return DATA_DICTIONARY.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(dictSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(dictSearch.toLowerCase()) ||
        item.role.toLowerCase().includes(dictSearch.toLowerCase());
      const matchesRole =
        dictRoleFilter === 'ALL' || item.role.toLowerCase().includes(dictRoleFilter.toLowerCase());
      return matchesSearch && matchesRole;
    });
  }, [dictSearch, dictRoleFilter]);

  // Filter Sample Records
  const filteredRows = useMemo(() => {
    return SAMPLE_DATASET_ROWS.filter((row) => {
      const matchesSearch =
        row.storeId.toLowerCase().includes(dataSearch.toLowerCase()) ||
        row.productId.toLowerCase().includes(dataSearch.toLowerCase()) ||
        row.category.toLowerCase().includes(dataSearch.toLowerCase()) ||
        row.region.toLowerCase().includes(dataSearch.toLowerCase());
      const matchesCat = selectedCategory === 'ALL' || row.category === selectedCategory;
      const matchesReg = selectedRegion === 'ALL' || row.region === selectedRegion;
      return matchesSearch && matchesCat && matchesReg;
    });
  }, [dataSearch, selectedCategory, selectedRegion]);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage) || 1;
  const paginatedRows = filteredRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const getRoleBadgeVariant = (role) => {
    if (role.includes('Treatment')) return 'danger';
    if (role.includes('Outcome')) return 'success';
    if (role.includes('Confounder') || role.includes('Covariate')) return 'primary';
    if (role.includes('Fixed Effect')) return 'purple';
    return 'default';
  };

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      <DisclaimerBanner
        title="Sample Dataset Preview"
        description="Displaying structured metadata, data dictionary specifications, and representative sample records from the 76,000 retail observations panel. All records shown are for interface evaluation and schema demonstration."
      />

      {/* Dataset Information Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Observations"
          value={DATASET_STATS.totalRecords.toLocaleString()}
          subvalue="Balanced daily panel (2023-2025)"
          icon={Database}
          highlight={true}
          badge="76,000 Rows"
          badgeVariant="primary"
        />
        <MetricCard
          title="Variables & Covariates"
          value={DATASET_STATS.totalFeatures}
          subvalue="Clean features for DML estimation"
          icon={Layers}
          badge="19 Variables"
          badgeVariant="default"
        />
        <MetricCard
          title="Temporal Scope"
          value="760 Days"
          subvalue={DATASET_STATS.dateRange}
          icon={Calendar}
          badge="Daily Resolution"
          badgeVariant="default"
        />
        <MetricCard
          title="Cross-Sectional Units"
          value="100 Units"
          subvalue="10 Stores × 10 Product SKUs"
          icon={Tag}
          badge="Zero Missing"
          badgeVariant="success"
        />
      </div>

      {/* Data Quality & Integrity Summary */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-heading">
                Data Quality & Preprocessing Audit
              </h2>
              <p className="text-xs text-slate-500">
                Rigorous schema validation, integrity checks, and outlier screening
              </p>
            </div>
          </div>
          <Badge variant="success">Integrity Score: 99.8%</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-500 block mb-1">Completeness Rate</span>
            <span className="text-xl font-bold text-slate-900">100.0%</span>
            <p className="text-slate-500 mt-1 text-[11px]">0 missing values across all 19 columns</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-500 block mb-1">Duplicate Verification</span>
            <span className="text-xl font-bold text-emerald-600">0 Duplicates</span>
            <p className="text-slate-500 mt-1 text-[11px]">Unique (Date, Store, Product) primary key</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-500 block mb-1">Panel Balance</span>
            <span className="text-xl font-bold text-blue-600">Balanced Panel</span>
            <p className="text-slate-500 mt-1 text-[11px]">Equal 760 daily periods per unit</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-500 block mb-1">Outlier Treatment</span>
            <span className="text-xl font-bold text-slate-900">IQR Winsorized</span>
            <p className="text-slate-500 mt-1 text-[11px]">Extreme pricing spikes capped at 99.5th %</p>
          </div>
        </div>
      </div>

      {/* Section 1: Data Dictionary Table (All 19 Variables) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 font-heading">
                Comprehensive Data Dictionary
              </h2>
              <Badge variant="primary">{DATA_DICTIONARY.length} Variables</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Detailed econometric classification: Treatment (T), Outcome (Y), and Confounders (X)
            </p>
          </div>

          {/* Filters & Search for Dictionary */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search variables or roles..."
                value={dictSearch}
                onChange={(e) => setDictSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <select
              value={dictRoleFilter}
              onChange={(e) => setDictRoleFilter(e.target.value)}
              className="py-1.5 px-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="ALL">All Roles</option>
              <option value="Treatment">Treatment (T)</option>
              <option value="Outcome">Outcome (Y)</option>
              <option value="Confounder">Confounder / Covariate</option>
              <option value="Fixed Effect">Fixed Effects</option>
            </select>
          </div>
        </div>

        {/* Dictionary Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3">Variable Name</th>
                <th className="px-4 py-3">Econometric Role</th>
                <th className="px-4 py-3">Data Type</th>
                <th className="px-4 py-3">Sample Value</th>
                <th className="px-4 py-3">Cardinality / Domain</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredDictionary.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900 font-mono">
                    {item.name}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={getRoleBadgeVariant(item.role)} size="xs">
                      {item.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{item.type}</td>
                  <td className="px-4 py-3 font-mono text-slate-800 bg-slate-50/50">{item.example}</td>
                  <td className="px-4 py-3 text-slate-600 text-[11px]">{item.cardinality}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Sample Dataset Preview with Search, Filter & Pagination */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 font-heading">
                Sample Dataset Records Preview
              </h2>
              <Badge variant="default">{SAMPLE_DATASET_ROWS.length} Sample Observations</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Interactive preview illustrating the multi-feature retail panel schema
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative min-w-[180px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search store, SKU, region..."
                value={dataSearch}
                onChange={(e) => {
                  setDataSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="py-1.5 px-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Groceries">Groceries</option>
              <option value="Apparel">Apparel</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Sports">Sports</option>
            </select>

            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setCurrentPage(1);
              }}
              className="py-1.5 px-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Regions</option>
              <option value="North">North</option>
              <option value="West">West</option>
              <option value="East">East</option>
              <option value="South">South</option>
              <option value="Central">Central</option>
            </select>
          </div>
        </div>

        {/* Data Records Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-3.5 py-3">Date</th>
                <th className="px-3.5 py-3">Store ID</th>
                <th className="px-3.5 py-3">Product ID</th>
                <th className="px-3.5 py-3">Category</th>
                <th className="px-3.5 py-3">Region</th>
                <th className="px-3.5 py-3 bg-red-50/60 text-rose-800">Price (T)</th>
                <th className="px-3.5 py-3 bg-emerald-50/60 text-emerald-800">Units Sold (Y)</th>
                <th className="px-3.5 py-3">Discount</th>
                <th className="px-3.5 py-3">Inventory</th>
                <th className="px-3.5 py-3">Weather</th>
                <th className="px-3.5 py-3">Promo</th>
                <th className="px-3.5 py-3">Competitor $</th>
                <th className="px-3.5 py-3">Seasonality</th>
                <th className="px-3.5 py-3">Demand Idx</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-mono text-[11px]">
              {paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan="14" className="text-center py-8 text-slate-400 font-sans">
                    No matching records found for the applied filter.
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-3.5 py-2.5 font-medium text-slate-900">{row.date}</td>
                    <td className="px-3.5 py-2.5 text-blue-600 font-semibold">{row.storeId}</td>
                    <td className="px-3.5 py-2.5 font-semibold text-slate-800">{row.productId}</td>
                    <td className="px-3.5 py-2.5 font-sans">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 font-sans text-slate-600">{row.region}</td>
                    <td className="px-3.5 py-2.5 bg-red-50/30 font-bold text-rose-700">
                      ${row.price.toFixed(2)}
                    </td>
                    <td className="px-3.5 py-2.5 bg-emerald-50/30 font-bold text-emerald-700">
                      {row.unitsSold}
                    </td>
                    <td className="px-3.5 py-2.5 text-slate-600">{row.discount}%</td>
                    <td className="px-3.5 py-2.5 text-slate-600">{row.inventory}</td>
                    <td className="px-3.5 py-2.5 font-sans text-slate-600">{row.weather}</td>
                    <td className="px-3.5 py-2.5">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-sans font-medium ${
                          row.promotion
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {row.promotion ? 'Active' : 'None'}
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 text-slate-600">${row.competitorPrice.toFixed(2)}</td>
                    <td className="px-3.5 py-2.5 font-sans text-slate-600">{row.seasonality}</td>
                    <td className="px-3.5 py-2.5 text-slate-600">{row.demand.toFixed(1)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing{' '}
            <span className="font-semibold text-slate-800">
              {filteredRows.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-slate-800">
              {Math.min(currentPage * rowsPerPage, filteredRows.length)}
            </span>{' '}
            of <span className="font-semibold text-slate-800">{filteredRows.length}</span> sample records
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
