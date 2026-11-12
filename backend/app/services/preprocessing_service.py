from typing import Tuple, List, Dict, Any, Optional
import math

class PreprocessingService:
    def __init__(self):
        self.numeric_features = [
            "discount",
            "promotion",
            "competitor_pricing",
            "epidemic",
            "year",
            "month",
            "day_of_week"
        ]
        
        self.categorical_features = [
            "category",
            "region",
            "weather_condition",
            "seasonality",
            "store_id",
            "product_id"
        ]
        
        self.excluded_features = [
            "demand",
            "units_ordered",
            "inventory_level"
        ]

    def extract_variables(self, rows: List[Dict[str, Any]]) -> Tuple[List[float], List[float], List[Dict[str, Any]]]:
        T = [r["price"] for r in rows]
        Y = [float(r["units_sold"]) for r in rows]
        
        X = []
        for r in rows:
            ctrl = {col: float(r.get(col, 0.0)) for col in self.numeric_features}
            for col in self.categorical_features:
                ctrl[col] = str(r.get(col, ""))
            X.append(ctrl)
            
        return T, Y, X

    def fit_transform_controls(self, X_train: List[Dict[str, Any]], X_val: Optional[List[Dict[str, Any]]] = None):
        # Build fast O(1) dictionary index mapping for one-hot categories
        cat_to_offset = {}
        offset = len(self.numeric_features)
        
        for col in self.categorical_features:
            unique_cats = sorted(list(set(row[col] for row in X_train)))
            for cat in unique_cats:
                cat_to_offset[(col, cat)] = offset
                offset += 1
                
        total_dim = offset
        
        # Precompute mean & std for numeric scaling
        num_stats = {}
        for idx, col in enumerate(self.numeric_features):
            vals = [row[col] for row in X_train]
            mean_v = sum(vals) / max(1, len(vals))
            var_v = sum((v - mean_v) ** 2 for v in vals) / max(1, len(vals))
            std_v = math.sqrt(var_v) if var_v > 0 else 1.0
            num_stats[col] = (idx, mean_v, std_v)

        def transform_fast(dataset: List[Dict[str, Any]]) -> List[List[float]]:
            matrix = []
            for row in dataset:
                vec = [0.0] * total_dim
                # 1. Scale numerics
                for col in self.numeric_features:
                    idx, m, s = num_stats[col]
                    vec[idx] = (row[col] - m) / s
                # 2. One-hot categories (O(1) assignment)
                for col in self.categorical_features:
                    key = (col, row[col])
                    if key in cat_to_offset:
                        vec[cat_to_offset[key]] = 1.0
                matrix.append(vec)
            return matrix

        X_train_mat = transform_fast(X_train)
        X_val_mat = transform_fast(X_val) if X_val is not None else None
        
        return X_train_mat, X_val_mat, (cat_to_offset, num_stats)

preprocessing_service = PreprocessingService()
