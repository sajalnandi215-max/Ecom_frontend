import math
from typing import List, Dict, Any, Tuple

class OutcomeModel:
    """
    Nuisance Model 1: q(X) = E[Y | X] = E[units_sold | X]
    Uses preprocessed control variables to predict consumer unit sales.
    Calculates out-of-fold predictions and outcome residuals: Y_residual = Y - q_hat(X).
    """
    def __init__(self, random_state: int = 42):
        self.random_state = random_state

    def fit_predict(self, X_train: List[List[float]], Y_train: List[float], X_val: List[List[float]]) -> List[float]:
        try:
            from sklearn.ensemble import RandomForestRegressor
            rf = RandomForestRegressor(
                n_estimators=300,
                min_samples_leaf=5,
                random_state=self.random_state,
                n_jobs=-1
            )
            rf.fit(X_train, Y_train)
            return [float(p) for p in rf.predict(X_val)]
        except Exception:
            return self._fit_predict_fast(X_train, Y_train, X_val)

    def evaluate(self, y_true: List[float], y_pred: List[float]) -> Dict[str, float]:
        n = len(y_true)
        if n == 0:
            return {"mae": 0.0, "rmse": 0.0, "r2": 0.0}
            
        mae = sum(abs(a - b) for a, b in zip(y_true, y_pred)) / n
        mse = sum((a - b) ** 2 for a, b in zip(y_true, y_pred)) / n
        rmse = math.sqrt(mse)
        
        mean_y = sum(y_true) / n
        ss_tot = sum((y - mean_y) ** 2 for y in y_true)
        ss_res = sum((a - b) ** 2 for a, b in zip(y_true, y_pred))
        r2 = max(0.0, 1.0 - (ss_res / ss_tot)) if ss_tot > 0 else 0.0
        
        return {
            "mae": round(mae, 2),
            "rmse": round(rmse, 2),
            "r2": round(r2, 3)
        }

    def _fit_predict_fast(self, X_tr: List[List[float]], y_tr: List[float], X_te: List[List[float]]) -> List[float]:
        dim = len(X_tr[0])
        weights = [0.0] * (dim + 1)
        mean_y = sum(y_tr) / max(1, len(y_tr))
        weights[0] = mean_y
        
        # Fast subsampled online gradient descent (subsample of 5000 records for sub-second speed)
        step_sz = max(1, len(X_tr) // 4000)
        sample_indices = range(0, len(X_tr), step_sz)
        
        lr = 0.02
        for _ in range(15):
            for i in sample_indices:
                x = X_tr[i]
                pred = weights[0] + sum(w * xi for w, xi in zip(weights[1:], x))
                err = pred - y_tr[i]
                weights[0] -= lr * err * 0.5
                for j in range(dim):
                    weights[j + 1] -= lr * (err * x[j] + 0.0005 * weights[j + 1])
                    
        w0 = weights[0]
        w_rest = weights[1:]
        return [w0 + sum(w * xi for w, xi in zip(w_rest, x)) for x in X_te]

outcome_model = OutcomeModel()
