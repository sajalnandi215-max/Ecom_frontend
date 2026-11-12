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

class ColumnDetail(BaseModel):
    name: str
    type: str
    role: str
    description: str
    example: str
    cardinality: str
    null_count: int

class DatasetSummaryResponse(BaseModel):
    total_records: int
    total_features: int
    store_product_combos: int
    missing_values: int
    date_range: str
    sampling_frequency: str
    primary_treatment: str
    primary_outcome: str
    store_count: int
    product_count: int
    target_category_count: int
    quality_score: float
    duplicate_rows: int

class DatasetPreviewResponse(BaseModel):
    page: int
    limit: int
    total_records: int
    total_pages: int
    rows: List[Dict[str, Any]]

class DatasetQualityResponse(BaseModel):
    total_rows: int
    missing_values_total: int
    duplicate_rows: int
    column_nulls: Dict[str, int]
    is_balanced_panel: bool
    data_quality_score: float

