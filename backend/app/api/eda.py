from typing import Optional

try:
    from fastapi import APIRouter, Query
    router = APIRouter(prefix="/eda", tags=["Exploratory Data Analysis"])
except ImportError:
    class DummyRouter:
        def get(self, *args, **kwargs):
            def decorator(f): return f
            return decorator
    router = DummyRouter()
    def Query(default=None, **kwargs): return default

from ..services.eda_service import eda_service

@router.get("/price-distribution")
def get_price_distribution():
    return eda_service.get_price_distribution()

@router.get("/sales-distribution")
def get_sales_distribution():
    return eda_service.get_sales_distribution()

@router.get("/monthly-sales")
def get_monthly_sales():
    return eda_service.get_monthly_sales_trend()

@router.get("/category-performance")
def get_category_performance():
    return eda_service.get_category_performance()

@router.get("/price-vs-sales")
def get_price_vs_sales(category: str = "ALL", limit: int = 50):
    return eda_service.get_price_vs_sales_scatter(category=category, limit=limit)

@router.get("/store-variation")
def get_store_variation():
    return eda_service.get_store_price_variation()

@router.get("/correlation")
def get_correlation():
    return eda_service.get_correlation_matrix()

