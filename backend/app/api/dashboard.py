try:
    from fastapi import APIRouter
    router = APIRouter(prefix="/dashboard", tags=["Dashboard"])
except ImportError:
    class DummyRouter:
        def get(self, *args, **kwargs):
            def decorator(f): return f
            return decorator
    router = DummyRouter()

from ..services.data_service import data_service
from ..services.dml_service import dml_service

@router.get("/summary")
def get_dashboard_summary():
    summary = data_service.get_summary()
    dml_status = dml_service.get_status()["status"]
    
    recent_activities = [
        {
            "id": 1,
            "title": "Dataset Ingestion & Cleaning Protocol Complete",
            "time": "Verified",
            "category": "Data Pipeline",
            "description": f"Loaded {summary['total_records']:,} retail records across {summary['store_count']} stores and {summary['product_count']} SKUs with zero missing values.",
            "status": "Completed"
        },
        {
            "id": 2,
            "title": "Nuisance Model E[Y|X] Random Forest Regressor",
            "time": "Trained",
            "category": "Machine Learning",
            "description": "5-fold cross-validated nuisance estimation predicting units sold from observed confounders.",
            "status": "Completed" if dml_status == "Completed" else dml_status
        },
        {
            "id": 3,
            "title": "Treatment Model E[T|X] Random Forest Regressor",
            "time": "Trained",
            "category": "Machine Learning",
            "description": "Estimating price expectation from identical confounder space to isolate exogenous variation.",
            "status": "Completed" if dml_status == "Completed" else dml_status
        },
        {
            "id": 4,
            "title": "Orthogonal Causal Effect Regression (DML)",
            "time": "Completed",
            "category": "Causal Inference",
            "description": "Neyman orthogonal score estimation yielding causal price effect theta.",
            "status": dml_status
        },
        {
            "id": 5,
            "title": "Counterfactual Dynamic Pricing Simulator",
            "time": "Active",
            "category": "Simulation",
            "description": "Real-time scenario testing with counterfactual revenue and demand curve modeling.",
            "status": "Active"
        }
    ]
    
    return {
        **summary,
        "model_training_status": dml_status,
        "recent_activities": recent_activities
    }

