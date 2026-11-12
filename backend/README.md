# EconoCausal Backend — Dynamic Pricing via Double Machine Learning

EconoCausal is a production-oriented causal inference and dynamic pricing intelligence platform. Unlike standard demand prediction tools that merely correlate price changes with volume, EconoCausal leverages **Double Machine Learning (DML)** (Chernozhukov et al., 2018) to isolate the **true causal effect** of pricing decisions on unit sales while purging observational confounders and eliminating regularization bias.

---

## 1. Theoretical Framework & Methodology

### 1.1 Why Conventional Predictive ML & Naive OLS Fail for Pricing
Standard supervised regression algorithms (Random Forests, Gradient Boosting, Deep Neural Networks) optimize for $\mathbb{E}[Y \mid T, X]$. In retail settings:
1. **Endogeneity & Confounding ($X$):** Prices ($T$) are deliberately increased during periods of peak demand (holidays, high-seasonality, supply shortages). Naive regression mistakes high demand for price tolerance, yielding an artificial positive price coefficient or severely underestimating price sensitivity.
2. **Regularization Bias:** Standard machine learning methods introduce shrinkage and regularization bias. If one directly plugs ML predictions into causal parameters, the regularization bias enters at order $n^{-1/4}$ or slower, destroying root-$n$ asymptotic normality and invalidating confidence intervals.
3. **Double Machine Learning Resolution:** DML employs Neyman orthogonal score equations and out-of-fold cross-fitting to achieve $\sqrt{n}$-consistency and asymptotic normality even when high-dimensional nuisance functions are estimated via flexible non-parametric learners.

---

### 1.2 Mathematical Formulation (Partially Linear Regression Model)

The structural relationship between price and units sold is governed by the Partially Linear Model:

$$Y = \theta \cdot T + g(X) + U, \quad \mathbb{E}[U \mid T, X] = 0$$

Where:
- $Y$: Outcome variable (`units_sold`)
- $T$: Treatment variable (`price`)
- $X$: High-dimensional vector of observed confounders (`discount`, `promotion`, `competitor_pricing`, `weather_condition`, `seasonality`, `epidemic`, `product_id`, `store_id`, `category`, `region`, `year`, `month`, `day_of_week`)
- $\theta$: Structural causal price elasticity parameter
- $g(X)$: Unknown non-linear nuisance outcome function

#### Step 1: Nuisance Model Formulation
We define two conditional expectation functions:
1. **Outcome Nuisance Function:**
   $$q(X) = \mathbb{E}[Y \mid X] = \mathbb{E}[\text{units\_sold} \mid X]$$
2. **Treatment Nuisance Function:**
   $$m(X) = \mathbb{E}[T \mid X] = \mathbb{E}[\text{price} \mid X]$$

#### Step 2: $K$-Fold Cross-Fitting (No Data Leakage)
The panel of $N = 76,000$ observations is partitioned into $K = 5$ disjoint folds $(I_k)_{k=1}^K$. For each fold $k$:
- Nuisance models $\hat{q}_{-k}(X)$ and $\hat{m}_{-k}(X)$ are trained strictly on the out-of-fold data $I_{-k} = \{1, \dots, N\} \setminus I_k$.
- Preprocessing transformers and encoders are fitted strictly on $I_{-k}$ to eliminate data leakage.
- Predictions $\hat{q}(X_i)$ and $\hat{m}(X_i)$ are evaluated on the held-out fold $i \in I_k$.

#### Step 3: Orthogonal Residualization & Frisch-Waugh-Lovell
We compute the orthogonalized residuals:
$$\tilde{Y}_i = Y_i - \hat{q}(X_i)$$
$$\tilde{T}_i = T_i - \hat{m}(X_i)$$

The structural causal parameter $\theta$ is estimated by solving the Neyman orthogonal score:
$$\hat{\theta} = \frac{\sum_{i=1}^N \tilde{T}_i \tilde{Y}_i}{\sum_{i=1}^N \tilde{T}_i^2}$$

Heteroskedasticity-consistent asymptotic standard errors and Wald confidence intervals are derived as:
$$\widehat{\text{Var}}(\hat{\theta}) = \frac{\sum_{i=1}^N \tilde{T}_i^2 ( \tilde{Y}_i - \hat{\theta} \tilde{T}_i )^2}{\left( \sum_{i=1}^N \tilde{T}_i^2 \right)^2}, \quad \text{SE}(\hat{\theta}) = \sqrt{\widehat{\text{Var}}(\hat{\theta})}$$

$$\text{CI}_{0.95} = \left[ \hat{\theta} - 1.96 \cdot \text{SE}(\hat{\theta}), \; \hat{\theta} + 1.96 \cdot \text{SE}(\hat{\theta}) \right]$$

---

## 2. Empirical Estimation Results

Evaluated across $76,000$ retail transaction records:

| Metric | Naive OLS Regression | Double Machine Learning (DML) |
| :--- | :--- | :--- |
| **Price Coefficient ($\hat{\theta}$)** | **-0.02** | **-0.86** |
| **Standard Error (SE)** | 0.042 | **0.024** |
| **$t$-statistic** | -0.48 | **-35.83** |
| **$p$-value** | 0.631 | **$< 0.0001$** |
| **95% Confidence Interval** | [-0.102, +0.062] | **[-0.907, -0.813]** |
| **Omitted Variable Bias** | Baseline | **+0.84** (Severe underestimation in naive model) |
| **Price Elasticity Regime** | Inelastic (spurious) | **Elastic ($\|E\| > 1$)** |

**Economic Interpretation:**
Naive regression severely underestimates price sensitivity because unobserved peak demand (promotions, holiday seasonality, competitor pricing) masks true consumer elasticity. DML cleans out demand shocks and reveals that every $\$1.00$ increase in baseline price causes an empirical drop of **0.86 units sold**.

---

## 3. Directory Layout

```
backend/
├── app/
│   ├── api/
│   │   ├── dashboard.py         # Summary metrics & store KPIs
│   │   ├── dataset.py           # Dataset metadata, pagination, quality stats
│   │   ├── eda.py               # Price/demand distributions, time trends, scatter
│   │   ├── dml.py               # 5-fold cross-fitting, orthogonal residuals, theta
│   │   ├── pricing.py           # Dynamic pricing simulator & counterfactual curves
│   │   └── insights.py          # Automated causal findings & strategic recommendations
│   ├── core/
│   │   ├── config.py            # Application settings & CORS config
│   │   └── logging_config.py    # Structured logging
│   ├── schemas/
│   │   ├── dashboard_schema.py
│   │   ├── dataset_schema.py
│   │   ├── dml_schema.py
│   │   └── pricing_schema.py
│   ├── services/
│   │   ├── data_service.py      # Dataset loader & caching (76,000 rows)
│   │   ├── eda_service.py       # Recharts-ready aggregations
│   │   ├── preprocessing_service.py # Leakage-free split-aware feature transformer
│   │   ├── outcome_model.py     # Nuisance Model E[Y|X]
│   │   ├── treatment_model.py   # Nuisance Model E[T|X]
│   │   ├── dml_service.py       # 5-fold cross-fitter & Neyman score solver
│   │   └── pricing_service.py   # Counterfactual demand & profit simulator
│   ├── utils/
│   │   └── validators.py        # Input schema validators
│   └── main.py                  # FastAPI application entrypoint
├── data/
│   └── cleaned_sales_data.csv   # 76,000 rows x 19 columns
├── scripts/
│   └── clean_data_std.py        # Data preprocessing pipeline
├── tests/
│   ├── test_api.py              # REST API contract tests
│   ├── test_preprocessing.py    # Feature matrix & leakage tests
│   └── test_dml.py              # Causal identification & SE tests
├── requirements.txt             # Python dependencies
├── run_server.py                # Dual Uvicorn/HTTP server runner
└── README.md
```

---

## 4. Setup & Execution Instructions

### Prerequisites
- Python 3.11+ (Python 3.14 verified)
- Windows PowerShell / Linux / macOS

### Installation
```bash
cd backend
pip install -r requirements.txt
```

### Running the API Server
Start the backend server on `http://127.0.0.1:8000`:
```bash
python run_server.py
```
*Note: `run_server.py` boots FastAPI via Uvicorn. In restricted OS environments (e.g. Windows Smart App Control), it automatically engages the built-in pure-Python dual execution server serving identical REST endpoints and CORS headers.*

### Interactive API Documentation (Swagger)
Once the server is running, visit:
- **Swagger UI:** `http://127.0.0.1:8000/docs`
- **ReDoc:** `http://127.0.0.1:8000/redoc`

### Running the Test Suite
Execute the full unit test suite:
```powershell
$env:PYTHONPATH = "backend"
python -m unittest discover -s backend/tests -p "test_*.py"
```

---

## 5. API Reference Summary

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/health` | `GET` | Health check and dataset readiness |
| `/api/dashboard/summary` | `GET` | Top-level business KPIs, category metrics, store performance |
| `/api/dataset/overview` | `GET` | Dataset dimensions, columns, quality checks, missing value audit |
| `/api/dataset/preview` | `GET` | Paginated dataset records (`limit`, `offset`) |
| `/api/eda/price-distribution` | `GET` | 10-bin price distribution histogram |
| `/api/eda/sales-distribution` | `GET` | 10-bin unit sales distribution histogram |
| `/api/eda/monthly-trends` | `GET` | Monthly revenue, units, and average price time series |
| `/api/eda/category-performance`| `GET` | Breakdown by product category |
| `/api/eda/scatter-sample` | `GET` | Price vs. Units Sold scatter coordinates |
| `/api/dml/results` | `GET` | Causal effect $\hat{\theta}$, SE, $p$-value, 95% CI, fold breakdown |
| `/api/dml/residuals` | `GET` | Orthogonalized residual points $(\tilde{T}, \tilde{Y})$ |
| `/api/dml/nuisance-performance`| `GET` | Predictive metrics (MAE, RMSE, $R^2$) for nuisance models |
| `/api/dml/train` | `POST` | Asynchronous trigger for 5-fold cross-fitting estimation |
| `/api/dml/status` | `GET` | Real-time training progress polling |
| `/api/pricing/products` | `GET` | Available products for pricing simulation |
| `/api/pricing/simulate` | `POST` | Counterfactual demand, revenue, and profit simulation |
| `/api/insights/summary` | `GET` | Automated causal conclusions and actionable pricing recommendations |

