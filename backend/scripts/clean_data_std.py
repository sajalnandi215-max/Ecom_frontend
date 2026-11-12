"""
Pure Python Data Cleaning & Feature Engineering Script
Uses only standard library (csv, datetime, math) to be 100% compliant with
Windows Smart App Control and all enterprise execution environments.
"""
import csv
import os
import sys
from datetime import datetime
from pathlib import Path

def clean_and_prepare_sales_data(raw_csv_path: str, output_csv_path: str):
    raw_path = Path(raw_csv_path)
    out_path = Path(output_csv_path)
    
    if not raw_path.exists():
        raise FileNotFoundError(f"Input file not found: {raw_path}")
        
    out_path.parent.mkdir(parents=True, exist_ok=True)
    
    print(f"Reading raw data from: {raw_path}")
    
    cleaned_rows = []
    seen_keys = set()
    
    with open(raw_path, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        
        # Standardize field names
        raw_fields = reader.fieldnames or []
        field_map = {k: k.strip().lower().replace(" ", "_") for k in raw_fields}
        
        for idx, row in enumerate(reader):
            std_row = {field_map[k]: v.strip() for k, v in row.items()}
            
            # 1. Essential validation
            date_str = std_row.get("date", "")
            store_id = std_row.get("store_id", "")
            product_id = std_row.get("product_id", "")
            price_str = std_row.get("price", "")
            units_sold_str = std_row.get("units_sold", "")
            
            if not (date_str and store_id and product_id and price_str and units_sold_str):
                continue
                
            try:
                price = float(price_str)
                units_sold = int(float(units_sold_str))
            except ValueError:
                continue
                
            if price <= 0 or units_sold < 0:
                continue
                
            # Parse Date
            try:
                dt = datetime.strptime(date_str, "%Y-%m-%d")
            except ValueError:
                continue
                
            # Deduplication key
            dedup_key = (
                date_str, store_id, product_id, std_row.get("category", ""),
                std_row.get("region", ""), price_str, units_sold_str
            )
            if dedup_key in seen_keys:
                continue
            seen_keys.add(dedup_key)
            
            # Numeric casts
            def safe_float(v, default=0.0):
                try:
                    return float(v) if v else default
                except ValueError:
                    return default
                    
            def safe_int(v, default=0):
                try:
                    return int(float(v)) if v else default
                except ValueError:
                    return default
                    
            cleaned_row = {
                "date": date_str,
                "store_id": store_id,
                "product_id": product_id,
                "category": std_row.get("category", ""),
                "region": std_row.get("region", ""),
                "inventory_level": safe_int(std_row.get("inventory_level")),
                "units_sold": units_sold,
                "units_ordered": safe_int(std_row.get("units_ordered")),
                "price": price,
                "discount": safe_float(std_row.get("discount")),
                "weather_condition": std_row.get("weather_condition", ""),
                "promotion": safe_int(std_row.get("promotion")),
                "competitor_pricing": safe_float(std_row.get("competitor_pricing")),
                "seasonality": std_row.get("seasonality", ""),
                "epidemic": safe_int(std_row.get("epidemic")),
                "demand": safe_float(std_row.get("demand")),
                # Time features (matching notebook)
                "year": dt.year,
                "month": dt.month,
                "day_of_week": dt.weekday(),  # 0=Monday, 6=Sunday
            }
            cleaned_rows.append(cleaned_row)
            
    print(f"Total valid rows cleaned: {len(cleaned_rows)}")
    
    # Sort chronologically, then by store, product
    cleaned_rows.sort(key=lambda r: (r["date"], r["store_id"], r["product_id"]))
    
    fieldnames = [
        "date", "store_id", "product_id", "category", "region",
        "inventory_level", "units_sold", "units_ordered", "price",
        "discount", "weather_condition", "promotion", "competitor_pricing",
        "seasonality", "epidemic", "demand", "year", "month", "day_of_week"
    ]
    
    with open(out_path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(cleaned_rows)
        
    print(f"Successfully saved {len(cleaned_rows)} rows and {len(fieldnames)} columns to: {out_path}")
    return len(cleaned_rows)

if __name__ == "__main__":
    raw = sys.argv[1] if len(sys.argv) > 1 else r"D:\Ecomdata\sales_data.csv"
    out = sys.argv[2] if len(sys.argv) > 2 else r"backend\data\cleaned_sales_data.csv"
    clean_and_prepare_sales_data(raw, out)

