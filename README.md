# EconoCausal — Dynamic Pricing Analysis Using Double Machine Learning (DML)

### Frontend Analytics Platform & Causal Simulation Interface

EconoCausal is an enterprise research frontend application applying **Double Machine Learning (DML)** to retail pricing intelligence and counterfactual demand forecasting.

---

## 🚀 Key Features

- **Executive Research Dashboard**: Real-time project overview, dataset stats (76,000 records, 19 features, 100 store-product panel units, 0 missing values), research objective, and DML pipeline status.
- **Dataset Overview & Data Dictionary**: Full data dictionary for all 19 covariates with search, role classification (Treatment, Outcome, Confounder, Fixed Effect), and interactive sample preview with pagination.
- **Exploratory Data Analysis (EDA)**: Interactive Recharts visualizations covering price histograms, units sold distributions, price-sales scatter plots, monthly trends, store price variations, and correlation heatmaps.
- **DML Methodology & Mathematical Derivations**: Formatted mathematical equation cards for the 8 DML stages (Chernozhukov et al., 2018), explaining Neyman orthogonality and cross-fitting.
- **Causal Effect Analysis**: Displays estimated causal treatment effect ($\theta = -1.42$, $SE = 0.068$, $95\%$ CI: $[-1.55, -1.29]$, $p < 0.0001$), Frisch-Waugh-Lovell orthogonal residuals, and 5-fold cross-fitting diagnostic stability.
- **Dynamic Pricing Simulator**: Interactive scenario simulation allowing users to select product SKUs and store locations, test price adjustments, and observe counterfactual revenue and demand curves with optimal revenue pricing points ($P^*$).
- **Technical Documentation**: Comprehensive whitepaper detailing research hypotheses, econometrics, frontend architecture, and future backend integration roadmap.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (v4) with custom light enterprise theme
- **Visualizations**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router (v7)

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### 2. Installation
```bash
# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
# The application will start at http://localhost:5173/
```

### 4. Build for Production
```bash
npm run build
```

---

## ⚠️ Research Disclaimer
All causal coefficients, statistical values, and simulated outcomes shown across EconoCausal are illustrative sample figures for visual demonstration of the DML frontend architecture.
