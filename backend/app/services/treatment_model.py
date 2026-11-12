import math
from typing import List, Dict, Any, Tuple

class TreatmentModel:
    """
    Nuisance Model 2: m(X) = E[T | X] = E[price | X]
    Uses the exact same preprocessed control variables to predict product price.
    Calculates out-of-fold predictions and treatment residuals: T_residual = T - m_hat(X).
    """
    def __init__(self, random_state: int = 42):
        self.random_state = random_state

    def fit_predict(self, X_train: List[List[float]], T_train: List[float], X_val: List[List[float]]) -> List[float]:
        try:
            from sklearn.ensemble import RandomForestRegressor
            rf = RandomForestRegressor(
                n_estimators=300,
                min_samples_leaf=5,
                random_state=self.random_state,
                n_jobs=-1
            )
            rf.fit(X_train, T_train)
            return [float(p) for p in rf.predict(X_val)]
        except Exception:
            return self._fit_predict_fast(X_train, T_train, X_val)

    def evaluate(self, t_true: List[float], t_pred: List[float]) -> Dict[str, float]:
        n = len(t_true)
        if n == 0:
            return {"mae": 0.0, "rmse": 0.0, "r2": 0.0}
            
        mae = sum(abs(a - b) for a, b in zip(t_true, t_pred)) / n
        mse = sum((a - b) ** 2 for a, b in zip(t_true, t_pred)) / n
        rmse = math.sqrt(mse)
        
        mean_t = sum(t_true) / n
        ss_tot = sum((t - mean_t) ** 2 for t in t_true)
        ss_res = sum((a - b) ** 2 for a, b in zip(t_true, t_pred))
        r2 = max(0.0, 1.0 - (ss_res / ss_tot)) if ss_tot > 0 else 0.0
        
        return {
            "mae": round(mae, 2),
            "rmse": round(rmse, 2),
            "r2": round(r2, 3)
        }

    def _fit_predict_fast(self, X_tr: List[List[float]], t_tr: List[float], X_te: List[List[float]]) -> List[float]:
        dim = len(X_tr[0])
        weights = [0.0] * (dim + 1)
        mean_t = sum(t_tr) / max(1, len(t_tr))
        weights[0] = mean_t
        
        step_sz = max(1, len(X_tr) // 4000)
        sample_indices = range(0, len(X_tr), step_sz)
        
        lr = 0.02
        for _ in range(15):
            for i in sample_indices:
                x = X_tr[i]
                pred = weights[0] + sum(w * xi for w, xi in zip(weights[1:], x))
                err = pred - t_tr[i]
                weights[0] -= lr * err * 0.5
                for j in range(dim):
                    weights[j + 1] -= lr * (err * x[j] + 0.0005 * weights[j + 1])
                    
        w0 = weights[0]
        w_rest = weights[1:]
        return [w0 + sum(w * xi for w, xi in zip(w_rest, x)) for x in X_te]

treatment_model = TreatmentModel()
