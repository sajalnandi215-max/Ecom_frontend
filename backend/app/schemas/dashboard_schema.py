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

class ActivityItem(BaseModel):
    id: int
    title: str
    time: str
    category: str
    description: str
    status: str

class DashboardSummaryResponse(BaseModel):
    total_records: int
    total_features: int
    store_count: int
    product_count: int
    store_product_combos: int
    missing_values: int
    date_range: str
    sampling_frequency: str
    primary_treatment: str
    primary_outcome: str
    quality_score: float
    model_training_status: str
    recent_activities: List[Dict[str, Any]]

