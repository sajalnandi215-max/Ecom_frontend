try:
    from fastapi import APIRouter
    router = APIRouter(prefix="/dml", tags=["Double Machine Learning"])
except ImportError:
    class DummyRouter:
        def get(self, *args, **kwargs):
            def decorator(f): return f
            return decorator
        def post(self, *args, **kwargs):
            def decorator(f): return f
            return decorator
    router = DummyRouter()

from ..services.dml_service import dml_service

@router.post("/train")
def train_dml_model():
    return dml_service.trigger_training()

@router.get("/status")
def get_dml_status():
    return dml_service.get_status()

@router.get("/results")
def get_dml_results():
    return dml_service.get_results()

@router.get("/model-performance")
def get_model_performance():
    return dml_service.get_model_performance()

@router.get("/residuals")
def get_residuals():
    return dml_service.get_residuals()

