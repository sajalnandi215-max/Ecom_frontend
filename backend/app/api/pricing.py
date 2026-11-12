try:
    from fastapi import APIRouter, Body
    router = APIRouter(prefix="/pricing", tags=["Dynamic Pricing"])
except ImportError:
    class DummyRouter:
        def get(self, *args, **kwargs):
            def decorator(f): return f
            return decorator
        def post(self, *args, **kwargs):
            def decorator(f): return f
            return decorator
    router = DummyRouter()
    def Body(default=None, **kwargs): return default

from ..services.pricing_service import pricing_service
from ..utils.validators import validate_pricing_input

@router.get("/catalog")
def get_pricing_catalog():
    return pricing_service.get_catalog()

@router.post("/simulate")
def simulate_pricing(payload: dict = Body(...)):
    product_id = payload.get("product_id") or payload.get("productId", "PROD-001")
    store_id = payload.get("store_id") or payload.get("storeId", "STORE-101")
    current_price = float(payload.get("current_price") or payload.get("currentPrice", 149.99))
    proposed_price = float(payload.get("proposed_price") or payload.get("proposedPrice", 142.49))
    
    validated = validate_pricing_input(product_id, store_id, current_price, proposed_price)
    
    return pricing_service.simulate(
        product_id=validated["product_id"],
        store_id=validated["store_id"],
        current_price=validated["current_price"],
        proposed_price=validated["proposed_price"]
    )

