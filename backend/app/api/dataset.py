from typing import Optional

try:
    from fastapi import APIRouter, Query
    router = APIRouter(prefix="/dataset", tags=["Dataset"])
except ImportError:
    class DummyRouter:
        def get(self, *args, **kwargs):
            def decorator(f): return f
            return decorator
    router = DummyRouter()
    def Query(default=None, **kwargs): return default

from ..services.data_service import data_service

@router.get("/summary")
def get_dataset_summary():
    return data_service.get_summary()

@router.get("/columns")
def get_dataset_columns():
    return data_service.get_columns_dictionary()

@router.get("/preview")
def get_dataset_preview(
    page: int = 1,
    limit: int = 8,
    search: Optional[str] = None,
    category: Optional[str] = None,
    region: Optional[str] = None
):
    return data_service.get_preview(
        page=page,
        limit=limit,
        search=search,
        category=category,
        region=region
    )

@router.get("/quality")
def get_dataset_quality():
    return data_service.get_quality_report()

