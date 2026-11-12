import unittest
from app.services.data_service import data_service
from app.services.pricing_service import pricing_service

class TestAPIEndpoints(unittest.TestCase):
    def test_data_summary(self):
        summary = data_service.get_summary()
        self.assertEqual(summary["total_records"], 76000)
        self.assertEqual(summary["missing_values"], 0)
        self.assertEqual(summary["total_features"], 19)

    def test_pricing_simulation(self):
        sim = pricing_service.simulate(
            product_id="PROD-001",
            store_id="STORE-101",
            current_price=149.99,
            proposed_price=139.99
        )
        self.assertEqual(sim["product_id"], "PROD-001")
        self.assertEqual(sim["current_price"], 149.99)
        self.assertEqual(sim["proposed_price"], 139.99)
        self.assertLess(sim["price_change"], 0)
        self.assertGreater(sim["expected_units"], sim["current_units"])
        self.assertEqual(len(sim["simulation_curve"]), 16)

if __name__ == "__main__":
    unittest.main()

