from typing import Dict, Any, List, Optional
from ..core.logging_config import setup_logging
from .dml_service import dml_service

logger = setup_logging()

# Catalog of products with cost baselines and causal elasticity coefficients
PRODUCTS_CATALOG = [
    {
        "id": "PROD-001",
        "name": "UltraSound ANC Wireless Headphones",
        "category": "Electronics",
        "baseCost": 85.00,
        "currentPrice": 149.99,
        "baseUnitsSold": 84,
        "elasticity": -0.92,
        "theta": -0.55,
        "minPrice": 99.00,
        "maxPrice": 220.00,
        "competitorPrice": 154.99,
    },
    {
        "id": "PROD-002",
        "name": "Organic Single-Origin Coffee Beans 1kg",
        "category": "Groceries",
        "baseCost": 9.50,
        "currentPrice": 22.50,
        "baseUnitsSold": 215,
        "elasticity": -2.15,
        "theta": -9.80,
        "minPrice": 14.00,
        "maxPrice": 32.00,
        "competitorPrice": 23.99,
    },
    {
        "id": "PROD-003",
        "name": "All-Weather Technical Shell Jacket",
        "category": "Apparel",
        "baseCost": 38.00,
        "currentPrice": 89.00,
        "baseUnitsSold": 52,
        "elasticity": -1.58,
        "theta": -0.95,
        "minPrice": 55.00,
        "maxPrice": 130.00,
        "competitorPrice": 94.00,
    },
    {
        "id": "PROD-004",
        "name": "RGB Mechanical Ergonomic Keyboard",
        "category": "Electronics",
        "baseCost": 52.00,
        "currentPrice": 109.99,
        "baseUnitsSold": 71,
        "elasticity": -1.05,
        "theta": -0.68,
        "minPrice": 75.00,
        "maxPrice": 160.00,
        "competitorPrice": 109.99,
    },
    {
        "id": "PROD-005",
        "name": "Double-Wall Insulated Steel Flask 1L",
        "category": "Home & Kitchen",
        "baseCost": 8.50,
        "currentPrice": 24.99,
        "baseUnitsSold": 138,
        "elasticity": -1.10,
        "theta": -6.20,
        "minPrice": 16.00,
        "maxPrice": 38.00,
        "competitorPrice": 26.50,
    },
    {
        "id": "PROD-006",
        "name": "GPS Active Multi-Sport Watch",
        "category": "Sports",
        "baseCost": 38.00,
        "currentPrice": 79.99,
        "baseUnitsSold": 46,
        "elasticity": -1.34,
        "theta": -0.78,
        "minPrice": 50.00,
        "maxPrice": 120.00,
        "competitorPrice": 82.00,
    },
]

STORES_CATALOG = [
    {"id": "STORE-101", "name": "Downtown Metro Flagship", "region": "North", "elasticityMultiplier": 0.90, "footTraffic": "High"},
    {"id": "STORE-102", "name": "Suburban Mall & Lifestyle Center", "region": "West", "elasticityMultiplier": 1.00, "footTraffic": "Moderate"},
    {"id": "STORE-103", "name": "City Central Commuter Plaza", "region": "East", "elasticityMultiplier": 1.05, "footTraffic": "Moderate"},
    {"id": "STORE-104", "name": "Regional Outlet & Discount Plaza", "region": "South", "elasticityMultiplier": 1.25, "footTraffic": "Very High"},
    {"id": "STORE-105", "name": "University District Store", "region": "Central", "elasticityMultiplier": 1.30, "footTraffic": "High"},
]

class PricingService:
    def get_catalog(self) -> Dict[str, Any]:
        return {
            "products": PRODUCTS_CATALOG,
            "stores": STORES_CATALOG
        }

    def simulate(self, product_id: str, store_id: str, current_price: float, proposed_price: float) -> Dict[str, Any]:
        # Resolve product
        product = next((p for p in PRODUCTS_CATALOG if p["id"] == product_id), PRODUCTS_CATALOG[0])
        store = next((s for s in STORES_CATALOG if s["id"] == store_id), STORES_CATALOG[0])
        
        # Effective causal theta scaled by store elasticity multiplier
        base_theta = product.get("theta", -1.42)
        effective_theta = round(base_theta * store.get("elasticityMultiplier", 1.0), 3)
        
        # Calculate price delta
        price_change = round(proposed_price - current_price, 2)
        price_change_pct = round((price_change / current_price) * 100, 2) if current_price > 0 else 0.0
        
        # Calculate expected units sold via causal effect
        base_units = product["baseUnitsSold"]
        expected_units = max(0, int(round(base_units + effective_theta * price_change)))
        units_delta = expected_units - base_units
        units_delta_pct = round((units_delta / base_units) * 100, 2) if base_units > 0 else 0.0
        
        # Financial revenues
        current_revenue = round(current_price * base_units, 2)
        proposed_revenue = round(proposed_price * expected_units, 2)
        revenue_delta = round(proposed_revenue - current_revenue, 2)
        revenue_delta_pct = round((revenue_delta / current_revenue) * 100, 2) if current_revenue > 0 else 0.0
        
        # Financial profits
        base_cost = product.get("baseCost", 0.0)
        current_profit = round((current_price - base_cost) * base_units, 2)
        proposed_profit = round((proposed_price - base_cost) * expected_units, 2)
        profit_delta = round(proposed_profit - current_profit, 2)
        
        # Check whether proposed price is within observed support
        min_supported = product.get("minPrice", current_price * 0.7)
        max_supported = product.get("maxPrice", current_price * 1.4)
        is_supported = min_supported <= proposed_price <= max_supported
        
        disclaimer = (
            "Counterfactual projection derived from local DML causal elasticity. "
            "Supported within historical observational bounds."
            if is_supported else
            "WARNING: The proposed price is outside the observed historical support range. "
            "Linear extrapolation may be unreliable."
        )
        
        # Generate 16-point simulation curve across price spectrum
        curve = []
        step = (max_supported - min_supported) / 15
        for i in range(16):
            p_val = round(min_supported + i * step, 2)
            u_val = max(0, int(round(base_units + effective_theta * (p_val - current_price))))
            r_val = round(p_val * u_val, 2)
            curve.append({
                "price": p_val,
                "expectedUnits": u_val,
                "expectedRevenue": r_val,
                "isCurrent": abs(p_val - current_price) < (step / 2),
                "isProposed": abs(p_val - proposed_price) < (step / 2)
            })

        return {
            "product_id": product["id"],
            "product_name": product["name"],
            "store_id": store["id"],
            "store_name": store["name"],
            "current_price": current_price,
            "proposed_price": proposed_price,
            "price_change": price_change,
            "price_change_pct": price_change_pct,
            "current_units": base_units,
            "expected_units": expected_units,
            "units_delta": units_delta,
            "units_delta_pct": units_delta_pct,
            "current_revenue": current_revenue,
            "proposed_revenue": proposed_revenue,
            "revenue_delta": revenue_delta,
            "revenue_delta_pct": revenue_delta_pct,
            "current_profit": current_profit,
            "proposed_profit": proposed_profit,
            "profit_delta": profit_delta,
            "effective_theta": effective_theta,
            "simulation_curve": curve,
            "is_supported_range": is_supported,
            "disclaimer": disclaimer
        }

pricing_service = PricingService()

