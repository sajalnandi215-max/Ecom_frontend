from typing import List, Dict, Any

REQUIRED_DATASET_COLUMNS = [
    "date", "store_id", "product_id", "category", "region",
    "inventory_level", "units_sold", "units_ordered", "price",
    "discount", "weather_condition", "promotion", "competitor_pricing",
    "seasonality", "epidemic", "demand", "year", "month", "day_of_week"
]

def validate_dataset_columns(columns: List[str]) -> bool:
    missing = [c for c in REQUIRED_DATASET_COLUMNS if c not in columns]
    if missing:
        raise ValueError(f"Dataset missing required columns: {missing}")
    return True

def validate_pricing_input(product_id: str, store_id: str, current_price: float, proposed_price: float) -> Dict[str, Any]:
    if not product_id or not str(product_id).strip():
        raise ValueError("Product ID cannot be empty.")
    if not store_id or not str(store_id).strip():
        raise ValueError("Store ID cannot be empty.")
    if current_price <= 0:
        raise ValueError("Current price must be strictly positive.")
    if proposed_price <= 0:
        raise ValueError("Proposed price must be strictly positive.")
        
    return {
        "product_id": str(product_id).strip(),
        "store_id": str(store_id).strip(),
        "current_price": float(current_price),
        "proposed_price": float(proposed_price)
    }

