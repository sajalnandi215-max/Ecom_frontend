# EconoCausal: Dynamic Pricing via Double Machine Learning

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)

An enterprise Data Science & Machine Learning platform applying **Double Machine Learning (DML)** to retail pricing intelligence and counterfactual demand forecasting.

---

## 📁 Repository Structure

```text
├── frontend/                     # Interactive React + Vite analytics platform & pricing simulator
│   ├── src/                      # UI components, pages, charts & simulation engines
│   │   ├── components/           # Layout, Metric Cards, Equation Cards, Tooltips
│   │   ├── pages/                # Dashboard, EDA, DML Methodology, Causal Effect, Simulator
│   │   └── data/                 # Sample panel datasets & econometric constants
│   ├── package.json              # Frontend dependencies and scripts
│   └── README.md                 # Frontend-specific documentation
├── econocasual-datset.ipynb      # Initial data inspection, cleaning, & feature engineering notebook
├── project_architecture(INFOTACT).md # Comprehensive project architecture & methodology specification
├── Dtaset_Detail_for_EDA.pdf     # Dataset details and exploratory research notes
└── README.md                     # Root project documentation
```

---

## 🚀 Key Features

- **Executive Analytics Dashboard**: High-level KPI monitoring, panel dataset telemetry (76,000 records, 100 store-product panels), and pipeline status.
- **Data Dictionary & Panel Explorer**: Covariate inspection, role classification (Treatment, Outcome, Confounder, Fixed Effect), and paginated data viewer.
- **Interactive Exploratory Data Analysis (EDA)**: Visualizations for price distributions, sales volumes, store price variations, and temporal demand trends.
- **Double Machine Learning (DML) Derivations**: Formatted mathematical equation cards for the 8 DML stages (Chernozhukov et al., 2018), explaining Neyman orthogonality and cross-fitting.
- **Causal Effect Analysis**: Empirical treatment effect estimation ($\theta = -1.42$, $p < 0.0001$), Frisch-Waugh-Lovell orthogonal residuals, and 5-fold cross-fitting diagnostic stability.
- **Dynamic Pricing Simulator**: Interactive price scenario testing with counterfactual revenue and demand curve modeling to pinpoint optimal revenue pricing ($P^*$).

---

## 💻 Getting Started with Frontend

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **pnpm**

### 2. Installation & Running
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### 3. Production Build
```bash
cd frontend
npm run build
```

---

## 🔬 Econometric & ML Methodology

EconoCausal implements Double Machine Learning with Neyman orthogonal score functions to resolve price endogeneity without suffering from regularization bias:
1. **Outcome Nuisance Model**: $\hat{q}(X) = \mathbb{E}[Y | X]$
2. **Treatment Nuisance Model**: $\hat{m}(X) = \mathbb{E}[D | X]$
3. **Orthogonal Residualization**: $\tilde{Y} = Y - \hat{q}(X)$, $\tilde{D} = D - \hat{m}(X)$
4. **Causal Parameter Identification**: $\hat{\theta} = (\tilde{D}'\tilde{D})^{-1}\tilde{D}'\tilde{Y}$

For in-depth details on the research architecture, consult [`project_architecture(INFOTACT).md`](./project_architecture(INFOTACT).md).
