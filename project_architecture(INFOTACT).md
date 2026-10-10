# EconoCausal: Dynamic Pricing via Double Machine Learning

**Organization:** Infotact Solutions\
**Internship Role:** Data Associate L1 Intern\
**Domain:** Data Science and Machine Learning\
**Document Type:** Initial Project Architecture and Implementation Plan\
**Status:** Proposed design --- to be refined after dataset selection\
**Repository:**
`EconoCausal-Dynamic-Pricing-via-Double-Machine-Learning-INFOTACT`

------------------------------------------------------------------------

## 1. Project Overview

EconoCausal is a proposed data science and machine learning project that
investigates how product price affects demand and explores how
causal-effect estimates can support data-driven pricing decisions.

The project will use exploratory data analysis (EDA), baseline
demand-prediction models, and Double Machine Learning (DML) to estimate
the effect of price on a defined outcome while accounting for relevant
observed variables. A dashboard will present the dataset, analysis,
model results, causal estimates, and pricing scenarios.

**Important:** This document describes the planned design. No dataset,
model result, causal effect, or pricing recommendation is considered
validated until the relevant work has been implemented and evaluated.

## 2. Problem Statement

Price and demand can vary alongside other factors, including promotions,
seasonality, product characteristics, competitor prices, and
availability. A simple relationship between price and sales therefore
does not, by itself, show that changing the price caused a change in
demand.

The project will investigate whether the available data supports
estimating the causal effect of price on demand. If the data and
assumptions are suitable, the estimated effect will be used to explore
potential pricing scenarios.

## 3. Research Question

**Primary research question**

> What is the causal effect of product price on demand, conditional on
> an appropriate set of observed confounding variables, and how can this
> estimate inform a data-driven pricing strategy?

### Supporting questions

1.  What patterns and data-quality issues exist in the selected dataset?
2.  How well can baseline machine-learning models predict demand?
3.  What causal effect of price can be estimated using a suitable DML
    specification?
4.  How uncertain is the estimate, and what assumptions are required to
    interpret it?
5.  How do candidate pricing scenarios compare in estimated demand,
    revenue, and---if cost data is available---profit?

## 4. Objectives

-   Identify and document a suitable dataset.
-   Understand the dataset's columns, units, collection process, and
    limitations.
-   Clean and validate the data using reproducible Python code.
-   Perform EDA and document meaningful findings.
-   Establish baseline demand-prediction performance.
-   Define the treatment, outcome, and potential confounders for causal
    analysis.
-   Implement and evaluate an appropriate Double Machine Learning
    estimator.
-   Report uncertainty, assumptions, and limitations alongside causal
    estimates.
-   Build a pricing-scenario simulator supported by the data and model.
-   Provide an interface for exploring the analysis and its outputs.
-   Maintain version control, tests, and project documentation
    throughout development.

## 5. Scope

### Included in the proposed first version

-   Public or otherwise authorized dataset selection.
-   Data loading, validation, preprocessing, and EDA.
-   Baseline demand prediction.
-   DML-based causal-effect estimation, if the data supports it.
-   Pricing scenario analysis with clearly stated assumptions.
-   Streamlit dashboard.
-   Reproducible code, tests, documentation, and a project
    demonstration.

### Not assumed for the first version

-   Automatic changes to real-world prices.
-   Live integrations with retailer systems.
-   Production deployment for business-critical pricing decisions.
-   Guaranteed optimal prices.
-   Causal conclusions without appropriate identification assumptions
    and diagnostics.

These may be considered later only if the project requirements, data,
time, and resources justify them.

## 6. Proposed Research Variables

The final variables must be selected after inspecting the chosen
dataset.

  ------------------------------------------------------------------------
  Variable role           Candidate variable       Description
  ----------------------- ------------------------ -----------------------
  Treatment               Price                    Price assigned to a
                                                   product or transaction

  Outcome                 Demand / units sold      Quantity sold or
                                                   another clearly defined
                                                   demand measure

  Potential confounder    Promotion or discount    Promotional conditions
                                                   associated with price
                                                   and demand

  Potential confounder    Competitor price         Relevant competitor
                                                   pricing, if available

  Potential confounder    Time, day, or season     Temporal factors
                                                   associated with pricing
                                                   and demand

  Potential confounder    Product/category         Product attributes that
                                                   may influence pricing
                                                   and demand

  Additional context      Inventory/availability   Stock constraints that
                                                   may affect observed
                                                   sales
  ------------------------------------------------------------------------

These are candidate variables, not confirmed dataset columns. The team
must document why each selected variable is included and whether it
could be a confounder, mediator, or another type of variable. Variable
selection must be guided by the research question and domain reasoning,
not only by correlations.

## 7. System Architecture

### 7.1 High-level workflow

``` text
Dataset Source / User Upload
            |
            v
      Data Validation
            |
            v
   Preprocessing and Cleaning
            |
            v
 Exploratory Data Analysis (EDA)
            |
            v
 Baseline Demand Prediction
            |
            v
 Double Machine Learning (DML)
            |
            v
 Causal Effect + Uncertainty
            |
            v
   Pricing Scenario Simulator
            |
            v
 Dashboard, Charts, and Reports
```

### 7.2 Architecture layers

**A. Interface layer --- Streamlit** - Provides the dashboard and
navigation. - Accepts dataset uploads and analysis settings. - Displays
tables, plots, model metrics, causal estimates, and pricing scenarios. -
Calls backend functions instead of containing all analytical logic in
page code.

**B. Data layer --- Pandas and NumPy** - Loads the selected dataset. -
Validates required columns and data types. - Reports missing values,
duplicates, and invalid records. - Creates reproducible processed data
for analysis. - Preserves a clear distinction between raw and processed
data.

**C. EDA layer --- Pandas, Matplotlib, Seaborn, or Plotly** - Produces
descriptive statistics and distributions. - Visualizes price, demand,
and relevant contextual variables. - Examines temporal or product-level
patterns where supported. - Documents data limitations and possible
confounding factors.

**D. Baseline ML layer --- Scikit-learn** - Establishes a
demand-prediction baseline. - Uses suitable train/test splitting or
cross-validation. - Evaluates models using appropriate metrics, such as
MAE and RMSE; R² may also be reported where meaningful. - Keeps
prediction performance distinct from causal validity.

**E. Causal analysis layer --- EconML or DoubleML** - Defines treatment,
outcome, and covariates. - Fits suitable nuisance models. - Uses an
appropriate cross-fitting and estimation procedure. - Reports the
estimated effect, standard error or confidence interval where supported,
and model configuration. - Documents identifying assumptions and
diagnostics.

**F. Pricing simulation layer** - Defines candidate price scenarios
within a defensible range. - Estimates demand under each scenario using
a justified method. - Calculates revenue as price multiplied by
estimated units sold. - Calculates profit only when suitable cost
information is available. - Flags unsupported extrapolation and states
the assumptions behind each scenario.

**G. Results and reporting layer** - Presents reproducible tables and
visualizations. - Records dataset version, analysis configuration, and
model settings. - Exports results or reports where needed. - Documents
findings, limitations, and next steps.

## 8. Proposed User Interface

The planned interface is a Streamlit web dashboard with the following
sections.

### 8.1 Overview

-   Project title and summary.
-   Dataset summary cards, populated from actual data.
-   Key EDA charts and links to analysis sections.

### 8.2 Dataset

-   CSV upload or supported data-loading method.
-   Preview of rows and columns.
-   Column names, data types, missing-value counts, and duplicate
    counts.
-   Validation messages and data dictionary.

### 8.3 EDA

-   Descriptive statistics.
-   Price and demand distributions.
-   Price-versus-demand visualization.
-   Missing-value summary.
-   Correlation visualization, where appropriate.
-   Time and product comparisons, if those variables exist.

### 8.4 Baseline ML

-   Model configuration.
-   Evaluation metrics.
-   Actual-versus-predicted plots.
-   Model comparison table.

### 8.5 Causal Analysis

-   Treatment, outcome, and covariate selection or confirmation.
-   DML configuration.
-   Estimated causal effect and uncertainty.
-   Assumptions, diagnostics, and interpretation notes.

### 8.6 Pricing Simulator

-   Current price and candidate price range.
-   Optional unit cost, if available.
-   Estimated demand, revenue, and optional profit for each scenario.
-   Clear warning when scenarios exceed the range supported by the data.

### 8.7 Reports

-   Summary of data and methods.
-   Model and causal-analysis results.
-   Limitations and reproducibility information.
-   Export options, if implemented.

All interface sections are planned features. They should be implemented
incrementally after the dataset and analysis requirements are confirmed.

## 9. Proposed Repository Structure

``` text
econocausal-dml/
├── app.py
├── pages/
│   ├── 1_Dataset.py
│   ├── 2_EDA.py
│   ├── 3_Machine_Learning.py
│   ├── 4_Causal_Analysis.py
│   └── 5_Pricing_Simulator.py
├── src/
│   ├── data/
│   │   ├── load_data.py
│   │   └── preprocessing.py
│   ├── eda/
│   │   └── analysis.py
│   ├── models/
│   │   ├── baseline.py
│   │   └── double_ml.py
│   ├── pricing/
│   │   └── simulator.py
│   └── evaluation/
│       └── metrics.py
├── notebooks/
│   └── exploratory_analysis.ipynb
├── data/
│   ├── README.md
│   ├── raw/
│   └── processed/
├── results/
│   └── README.md
├── docs/
│   ├── project_architecture.md
│   ├── research_problem.md
│   ├── methodology.md
│   └── findings.md
├── tests/
│   ├── test_preprocessing.py
│   └── test_models.py
├── requirements.txt
├── .gitignore
└── README.md
```

This is a proposed structure. Create files as their corresponding work
begins; do not create empty modules merely to fill the tree. The
repository may be adjusted to fit the final dataset and implementation.

### Data and secrets policy

-   Do not commit credentials, access tokens, passwords, or private
    information.
-   Do not commit large datasets without checking repository limits and
    data permissions.
-   If the dataset has licensing or redistribution restrictions,
    document its source and access instructions instead of committing
    the raw data.
-   Keep temporary files, virtual environments, caches, and local
    secrets out of version control.
-   Use `.gitignore` to enforce these practices.

## 10. Proposed Technology Stack

  -----------------------------------------------------------------------
  Area                    Proposed tools          Purpose
  ----------------------- ----------------------- -----------------------
  Language                Python                  Main implementation

  Data processing         Pandas, NumPy           Loading, cleaning,
                                                  transformation

  Visualization           Matplotlib, Seaborn,    Static and interactive
                          Plotly                  charts

  Dashboard               Streamlit               User interface

  Baseline ML             Scikit-learn            Predictive models and
                                                  metrics

  Causal ML               EconML or DoubleML      DML estimation

  Testing                 Pytest                  Automated tests

  Version control         Git and GitHub          Collaboration and
                                                  change tracking

  Documentation           Markdown                Research and technical
                                                  documentation
  -----------------------------------------------------------------------

The exact dependency versions should be recorded in `requirements.txt`
after the implementation environment is tested.

## 11. Team Workflow and Responsibilities

The team will use one shared GitHub repository with `main` as the
integration branch and a dedicated branch for each active team member.

### Suggested initial division of work

  --------------------------------------------------------------------------
  Role                    Suggested responsibility   Deliverables
  ----------------------- -------------------------- -----------------------
  Sajal --- Team Lead     Research coordination,     Integration decisions,
                          architecture, DML          reviewed pull requests,
                          coordination, integration, project status
                          review                     

  Somaenmahato            Dataset research and data  Dataset source notes,
                          validation/preprocessing   data dictionary,
                                                     validation and cleaning
                                                     work

  Meghna                  EDA and visualizations     EDA notebook, charts,
                                                     documented findings

  Fourth team member      Baseline ML and evaluation Baseline models,
                                                     metrics, evaluation
                                                     summary
  --------------------------------------------------------------------------

This allocation is a starting proposal and should be agreed upon by the
team. All members should understand the overall project, methods,
results, and limitations.

### Branch and merge workflow

1.  Each member checks out their own branch.
2.  Members pull the latest relevant changes before starting work.
3.  Each member makes meaningful, focused changes.
4.  Members commit with clear messages and push to their own branch.
5.  Members open a pull request when work is ready.
6.  The Team Lead reviews code, documentation, tests, and compatibility.
7.  Approved work is merged into `main`.
8.  The team verifies that the integrated project still works.

Avoid having multiple members edit the same files at the same time where
possible. Agree on function names, input/output formats, and module
responsibilities before integration.

## 12. Development Phases

The project will be developed incrementally. The exact dates and
deliverables must be aligned with the official internship schedule and
mentor instructions.

### Phase 1 --- Research and setup

-   Finalize the research question.
-   Review relevant literature and dataset documentation.
-   Select a dataset and document its source and license.
-   Define candidate treatment, outcome, and confounders.
-   Set up the repository, environment, and work distribution.

### Phase 2 --- Data preparation and EDA

-   Inspect the raw data.
-   Validate schema and data types.
-   Analyze missing values, duplicates, and unusual values.
-   Create EDA charts and document findings.
-   Finalize the modeling dataset and data dictionary.

### Phase 3 --- Baseline prediction

-   Define a suitable prediction target and feature set.
-   Create an appropriate evaluation split.
-   Train baseline models.
-   Record metrics and limitations.
-   Keep predictive conclusions separate from causal conclusions.

### Phase 4 --- DML estimation

-   Confirm that the data and research design support the chosen
    estimator.
-   Specify treatment, outcome, and covariates.
-   Fit nuisance models using an appropriate procedure.
-   Estimate the causal effect and uncertainty.
-   Conduct relevant diagnostics and sensitivity checks where feasible.
-   Document assumptions and limitations.

### Phase 5 --- Pricing simulation

-   Define candidate prices within a supported range.
-   Estimate demand for candidate scenarios using a defensible model.
-   Calculate revenue and, if cost data is available, profit.
-   Compare scenarios and explain uncertainty.
-   Avoid presenting simulated outcomes as guaranteed real-world
    results.

### Phase 6 --- Interface and finalization

-   Connect analytical modules to the Streamlit dashboard.
-   Test the end-to-end workflow.
-   Review documentation and reproducibility.
-   Prepare the final demonstration, report, and presentation.

## 13. Evaluation Plan

### Baseline prediction

Potential metrics: - Mean Absolute Error (MAE) - Root Mean Squared Error
(RMSE) - R², when appropriate

Metrics should be calculated on data not used to fit the evaluated
model. Time-ordered data may require time-aware splitting to avoid
leakage.

### Causal analysis

Report, as applicable: - Treatment and outcome definitions. - Covariates
and their rationale. - DML estimator and nuisance-model configuration. -
Estimated effect and units. - Standard error or confidence interval. -
Sample size and data exclusions. - Diagnostics and sensitivity checks. -
Identification assumptions and limitations.

A high predictive score does not establish that a causal estimate is
valid.

### Pricing scenarios

Report: - Candidate price. - Estimated demand. - Estimated revenue. -
Estimated profit, only if cost data is available. - Assumptions and
supported price range. - Uncertainty or limitations in scenario
estimates.

## 14. Research Quality and Limitations

Causal interpretation depends on the study design and assumptions. In
particular, the team must consider:

-   Whether important confounders are observed and measured
    appropriately.
-   Whether there is sufficient variation and overlap in prices across
    relevant contexts.
-   Whether price and outcome are defined consistently.
-   Whether inventory constraints or other mechanisms distort observed
    sales.
-   Whether the estimator's assumptions are appropriate for the data.
-   Whether the proposed pricing scenarios require extrapolation beyond
    observed prices.
-   Whether the dataset's collection process, license, and coverage
    limit generalization.

DML can help control for observed covariates using flexible
machine-learning models, but it does not automatically eliminate
unobserved confounding or guarantee causal identification.

## 15. Testing and Reproducibility

The team should aim to: - Test data validation and preprocessing
functions. - Check that required columns and data types are handled
correctly. - Test model functions on small, controlled examples. -
Record random seeds where applicable. - Keep transformations and
analysis steps reproducible. - Record package dependencies. - Save
experiment settings and results needed to reproduce findings. - Verify
the full application using a documented set of steps before a review.

## 16. Expected Deliverables

Subject to mentor requirements and available data, expected deliverables
are:

1.  Dataset source documentation and data dictionary.
2.  Reproducible preprocessing pipeline.
3.  EDA notebook and documented findings.
4.  Baseline demand-prediction models and evaluation.
5.  DML implementation and causal-analysis report.
6.  Pricing-scenario simulator.
7.  Streamlit dashboard.
8.  Tests and dependency file.
9.  Technical documentation and research report.
10. GitHub repository with meaningful individual contributions.
11. Final demonstration and presentation.

## 17. Initial Decisions Still to Be Confirmed

The following items are intentionally open and must be decided before
implementation:

-   Dataset and its license.
-   Unit of observation (for example, product-day or transaction).
-   Exact treatment definition and units.
-   Exact outcome definition.
-   Final covariate set and causal rationale.
-   Chosen DML estimator and nuisance models.
-   Validation strategy.
-   Whether cost data supports profit optimization.
-   Final dashboard requirements.
-   Deployment and mentor-specific submission requirements.

## 18. Definition of Done

The project will be considered ready for final demonstration when:

-   The dataset source, license, schema, and limitations are documented.
-   Data processing and analysis can be reproduced.
-   EDA findings are supported by actual outputs.
-   Baseline metrics are calculated and explained.
-   The DML specification, estimate, uncertainty, and assumptions are
    documented.
-   Pricing scenarios are clearly labeled as estimates or simulations.
-   The dashboard runs using the documented setup.
-   Tests and manual checks have been completed.
-   The README explains installation and execution.
-   The GitHub history reflects meaningful contributions and reviewed
    integration.
-   The report clearly distinguishes actual findings from illustrative
    examples.

------------------------------------------------------------------------

## Appendix A --- Suggested Initial GitHub Tasks

1.  Add this document to `docs/project_architecture.md`.
2.  Create or update the repository `README.md` with the project summary
    and current status.
3.  Add a `data/README.md` explaining the planned data policy and that
    the dataset is not yet finalized.
4.  Add a `.gitignore` appropriate for Python, notebooks, local
    environments, and secrets.
5.  Agree on the dataset-selection task and assign an owner.
6.  Record the selected dataset, source, license, columns, and research
    suitability before starting modeling.

## Document Status

**Version:** 0.1 --- Initial proposal\
**Last updated:** 10 October 2026\
**Status:** Proposed; update as research and implementation decisions
are confirmed.
