import unittest
from app.services.outcome_model import outcome_model
from app.services.treatment_model import treatment_model
from app.services.dml_service import dml_service

class TestDML(unittest.TestCase):
    def test_dml_results(self):
        results = dml_service.get_results()
        self.assertIn("treatment_effect", results)
        self.assertIn("standard_error", results)
        self.assertIn("confidence_interval_95", results)
        
        theta = results["treatment_effect"]
        se = results["standard_error"]
        
        # Economic validity: Demand slope should be negative
        self.assertLess(theta, 0.0, f"Expected negative causal price effect, got {theta}")
        self.assertGreater(se, 0.0)
        self.assertEqual(results["cross_fitting_folds"], 5)
        self.assertEqual(results["sample_size"], 76000)

if __name__ == "__main__":
    unittest.main()

