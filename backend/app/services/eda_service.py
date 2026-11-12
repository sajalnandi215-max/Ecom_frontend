import math
from typing import List, Dict, Any, Optional
from collections import defaultdict
from .data_service import data_service

class EDAService:
    def __init__(self):
        self.data_service = data_service

    def get_price_distribution(self) -> List[Dict[str, Any]]:
        data = self.data_service.load_data()
        total = len(data)
        
        bins = [
            {"range": "$0 - $30", "min": 0, "max": 30, "count": 0},
            {"range": "$30 - $60", "min": 30, "max": 60, "count": 0},
            {"range": "$60 - $90", "min": 60, "max": 90, "count": 0},
            {"range": "$90 - $120", "min": 90, "max": 120, "count": 0},
            {"range": "$120 - $150", "min": 120, "max": 150, "count": 0},
            {"range": "$150 - $200", "min": 150, "max": 200, "count": 0},
            {"range": "$200+", "min": 200, "max": 999999, "count": 0},
        ]
        
        for r in data:
            p = r["price"]
            for b in bins:
                if b["min"] <= p < b["max"]:
                    b["count"] += 1
                    break
                    
        return [
            {
                "range": b["range"],
                "count": b["count"],
                "density": round(b["count"] / total, 3) if total > 0 else 0.0
            }
            for b in bins
        ]

    def get_sales_distribution(self) -> List[Dict[str, Any]]:
        data = self.data_service.load_data()
        total = len(data)
        
        bins = [
            {"bin": "0-30", "min": 0, "max": 30, "count": 0},
            {"bin": "31-60", "min": 31, "max": 60, "count": 0},
            {"bin": "61-90", "min": 61, "max": 90, "count": 0},
            {"bin": "91-120", "min": 91, "max": 120, "count": 0},
            {"bin": "121-160", "min": 121, "max": 160, "count": 0},
            {"bin": "161-200", "min": 161, "max": 200, "count": 0},
            {"bin": "201+", "min": 201, "max": 999999, "count": 0},
        ]
        
        for r in data:
            s = r["units_sold"]
            for b in bins:
                if b["min"] <= s <= b["max"]:
                    b["count"] += 1
                    break
                    
        return [
            {
                "bin": b["bin"],
                "count": b["count"],
                "frequency": f"{round((b['count'] / total) * 100, 1)}%" if total > 0 else "0.0%"
            }
            for b in bins
        ]

    def get_monthly_sales_trend(self) -> List[Dict[str, Any]]:
        data = self.data_service.load_data()
        month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        
        month_stats = defaultdict(lambda: {"units": 0, "price_sum": 0.0, "promos": 0, "count": 0})
        for r in data:
            m = r["month"]
            st = month_stats[m]
            st["units"] += r["units_sold"]
            st["price_sum"] += r["price"]
            st["promos"] += r["promotion"]
            st["count"] += 1
            
        result = []
        for m_idx in range(1, 13):
            st = month_stats[m_idx]
            count = max(1, st["count"])
            result.append({
                "month": month_names[m_idx - 1],
                "unitsSold": st["units"],
                "avgPrice": round(st["price_sum"] / count, 1),
                "promotions": st["promos"]
            })
        return result

    def get_category_performance(self) -> List[Dict[str, Any]]:
        data = self.data_service.load_data()
        cat_stats = defaultdict(lambda: {"units": 0, "rev": 0.0, "price_sum": 0.0, "count": 0})
        
        for r in data:
            c = r["category"]
            st = cat_stats[c]
            st["units"] += r["units_sold"]
            st["rev"] += (r["price"] * r["units_sold"])
            st["price_sum"] += r["price"]
            st["count"] += 1
            
        result = []
        # Empirical elasticities by category from DML estimates
        elasticities = {
            "Groceries": -2.15,
            "Clothing": -1.58,
            "Apparel": -1.58,
            "Sports": -1.34,
            "Home & Kitchen": -1.10,
            "Electronics": -0.92
        }
        
        for cat, st in sorted(cat_stats.items(), key=lambda x: -x[1]["units"]):
            count = max(1, st["count"])
            avg_p = round(st["price_sum"] / count, 1)
            result.append({
                "category": cat,
                "unitsSold": st["units"],
                "avgPrice": avg_p,
                "revenue": round(st["rev"], 2),
                "elasticity": elasticities.get(cat, -1.25)
            })
        return result

    def get_price_vs_sales_scatter(self, category: str = "ALL", limit: int = 50) -> List[Dict[str, Any]]:
        data = self.data_service.load_data()
        filtered = data
        if category and category != "ALL":
            filtered = [r for r in filtered if r["category"].lower() == category.lower()]
            
        step = max(1, len(filtered) // limit)
        sample = filtered[::step][:limit]
        
        return [
            {
                "price": round(r["price"], 2),
                "unitsSold": r["units_sold"],
                "category": r["category"],
                "store": r["store_id"]
            }
            for r in sample
        ]

    def get_store_price_variation(self) -> List[Dict[str, Any]]:
        data = self.data_service.load_data()
        store_stats = defaultdict(lambda: {"prices": [], "region": "", "units": 0})
        
        for r in data:
            s = r["store_id"]
            store_stats[s]["prices"].append(r["price"])
            store_stats[s]["region"] = r["region"]
            store_stats[s]["units"] += r["units_sold"]
            
        result = []
        for store, st in sorted(store_stats.items()):
            p_list = st["prices"]
            avg_p = round(sum(p_list) / len(p_list), 1) if p_list else 0.0
            min_p = round(min(p_list), 1) if p_list else 0.0
            max_p = round(max(p_list), 1) if p_list else 0.0
            
            # Traffic tier based on volume
            traffic = "High" if st["units"] > 140000 else "Medium"
            result.append({
                "store": store,
                "region": st["region"],
                "min": min_p,
                "avg": avg_p,
                "max": max_p,
                "traffic": traffic
            })
        return result

    def get_correlation_matrix(self) -> List[Dict[str, Any]]:
        data = self.data_service.load_data()
        
        cols = ["price", "units_sold", "discount", "competitor_pricing", "promotion", "weather_condition", "seasonality"]
        
        # Numeric encodings
        weather_map = {"sunny": 1, "cloudy": 2, "rainy": 3, "snowy": 4}
        season_map = {"spring": 1, "summer": 2, "autumn": 3, "winter": 4}
        
        numeric_series = {
            "Price": [r["price"] for r in data],
            "Units Sold": [r["units_sold"] for r in data],
            "Discount": [r["discount"] for r in data],
            "Competitor Price": [r["competitor_pricing"] for r in data],
            "Promotion": [r["promotion"] for r in data],
            "Weather": [weather_map.get(r["weather_condition"].lower(), 1) for r in data],
            "Seasonality": [season_map.get(r["seasonality"].lower(), 1) for r in data],
        }
        
        names = list(numeric_series.keys())
        
        # Pearson correlation helper
        def pearson(x, y):
            n = len(x)
            if n == 0: return 0.0
            mean_x = sum(x) / n
            mean_y = sum(y) / n
            cov = sum((a - mean_x) * (b - mean_y) for a, b in zip(x, y))
            var_x = sum((a - mean_x) ** 2 for a in x)
            var_y = sum((b - mean_y) ** 2 for b in y)
            denom = math.sqrt(var_x * var_y)
            return round(cov / denom, 2) if denom != 0 else 0.0
            
        matrix = []
        for name1 in names:
            row = {"feature": name1}
            for name2 in names:
                corr_key = name2.replace(" ", "")
                row[corr_key] = pearson(numeric_series[name1], numeric_series[name2])
            matrix.append(row)
            
        return matrix

eda_service = EDAService()

