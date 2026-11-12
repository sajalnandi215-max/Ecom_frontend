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

class PricingSimulateRequest(BaseModel):
    product_id: str
    store_id: str
    current_price: float
    proposed_price: float

class CurvePoint(BaseModel):
    price: float
    expectedUnits: int
    expectedRevenue: float
    isCurrent: bool
    isProposed: bool

class PricingSimulateResponse(BaseModel):
    product_id: str
    product_name: str
    store_id: str
    store_name: str
    current_price: float
    proposed_price: float
    price_change: float
    price_change_pct: float
    current_units: int
    expected_units: int
    units_delta: int
    units_delta_pct: float
    current_revenue: float
    proposed_revenue: float
    revenue_delta: float
    revenue_delta_pct: float
    current_profit: float
    proposed_profit: float
    profit_delta: float
    effective_theta: float
    simulation_curve: List[Dict[str, Any]]
    is_supported_range: bool
    disclaimer: str

