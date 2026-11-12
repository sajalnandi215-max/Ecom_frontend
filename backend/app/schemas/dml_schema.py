from typing import List, Dict, Any, Optional

try:
    from pydantic import BaseModel, Field
except ImportError:
    class BaseModel:
        def __init__(self, **kwargs):
            for k, v in kwargs.items():
                setattr(self, k, v)
        def dict(self):
            return self.__dict__
    def Field(default=None, **kwargs):
        return default

class FoldDiagnostic(BaseModel):
    fold: str
    theta: float
    se: float
    outcome_r2: float
    treatment_r2: float
    train_samples: int
    val_samples: int

class DMLStatusResponse(BaseModel):
    status: str  # "Not Started", "Training", "Completed", "Failed"
    progress: int
    message: str
    started_at: Optional[str] = None
    completed_at: Optional[str] = None
    error: Optional[str] = None

class DMLResultsResponse(BaseModel):
    treatment_effect: float  # theta
    standard_error: float
    t_statistic: float
    p_value: str
    confidence_interval_95: List[float]
    elasticity_of_demand: float
    elasticity_regime: str
    sample_size: int
    cross_fitting_folds: int
    nuisance_model_y: str
    nuisance_model_t: str
    outcome_r2: float
    outcome_rmse: float
    treatment_r2: float
    treatment_mae: float
    naive_ols_slope: float
    omitted_variable_bias: str
    folds_data: List[Dict[str, Any]]

class DMLResidualPoint(BaseModel):
    res_t: float
    res_y: float
    pred_y: float

class DMLResidualsResponse(BaseModel):
    sample_size: int
    residuals: List[Dict[str, Any]]

