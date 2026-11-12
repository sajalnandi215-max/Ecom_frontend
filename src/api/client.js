// EconoCausal API Client
// In development, Vite proxy routes '/api' directly to http://127.0.0.1:8000
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

async function fetchJson(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[EconoCausal API] Fallback to local cache for ${endpoint}:`, err.message);
    return null;
  }
}

export const api = {
  // Health
  checkHealth: () => fetchJson('/health'),

  // Dashboard
  getDashboardSummary: () => fetchJson('/api/dashboard/summary'),

  // Dataset
  getDatasetOverview: () => fetchJson('/api/dataset/overview'),
  getDatasetPreview: (limit = 15, offset = 0) =>
    fetchJson(`/api/dataset/preview?limit=${limit}&offset=${offset}`),

  // EDA
  getPriceDistribution: () => fetchJson('/api/eda/price-distribution'),
  getSalesDistribution: () => fetchJson('/api/eda/sales-distribution'),
  getMonthlyTrends: () => fetchJson('/api/eda/monthly-trends'),
  getCategoryPerformance: () => fetchJson('/api/eda/category-performance'),
  getScatterSample: (sampleSize = 40) =>
    fetchJson(`/api/eda/scatter-sample?sample_size=${sampleSize}`),

  // DML
  getDMLResults: () => fetchJson('/api/dml/results'),
  getDMLResiduals: () => fetchJson('/api/dml/residuals'),
  getDMLNuisancePerformance: () => fetchJson('/api/dml/nuisance-performance'),
  getDMLStatus: () => fetchJson('/api/dml/status'),
  triggerDMLTraining: () =>
    fetchJson('/api/dml/train', { method: 'POST' }),

  // Pricing
  getProducts: () => fetchJson('/api/pricing/products'),
  simulatePricing: (payload) =>
    fetchJson('/api/pricing/simulate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Insights
  getInsightsSummary: () => fetchJson('/api/insights/summary'),
};

