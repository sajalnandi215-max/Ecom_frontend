import unittest
from app.services.preprocessing_service import preprocessing_service

class TestPreprocessing(unittest.TestCase):
    def setUp(self):
        self.sample_rows = [
            {
                "price": 50.0,
                "units_sold": 100,
                "discount": 5.0,
                "promotion": 1,
                "competitor_pricing": 55.0,
                "epidemic": 0,
                "year": 2024,
                "month": 6,
                "day_of_week": 2,
                "category": "Electronics",
                "region": "North",
                "weather_condition": "Sunny",
                "seasonality": "Summer",
                "store_id": "STORE-101",
                "product_id": "PROD-001"
            },
            {
                "price": 20.0,
                "units_sold": 220,
                "discount": 0.0,
                "promotion": 0,
                "competitor_pricing": 22.0,
                "epidemic": 0,
                "year": 2024,
                "month": 6,
                "day_of_week": 3,
                "category": "Groceries",
                "region": "South",
                "weather_condition": "Rainy",
                "seasonality": "Summer",
                "store_id": "STORE-102",
                "product_id": "PROD-002"
            }
        ]

    def test_variable_extraction(self):
        T, Y, X = preprocessing_service.extract_variables(self.sample_rows)
        self.assertEqual(len(T), 2)
        self.assertEqual(len(Y), 2)
        self.assertEqual(len(X), 2)
        self.assertEqual(T[0], 50.0)
        self.assertEqual(Y[0], 100.0)

    def test_fit_transform(self):
        _, _, X = preprocessing_service.extract_variables(self.sample_rows)
        X_train_mat, X_val_mat, (vocab, stats) = preprocessing_service.fit_transform_controls(X, X)
        self.assertEqual(len(X_train_mat), 2)
        self.assertEqual(len(X_val_mat), 2)
        self.assertGreater(len(X_train_mat[0]), len(preprocessing_service.numeric_features))

if __name__ == "__main__":
    unittest.main()

