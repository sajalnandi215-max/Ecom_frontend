"""
Data Preparation Script for EconoCausal
Reproduces exact cleaning & feature engineering from econocasual-datset.ipynb
Reads raw sales_data.csv and generates backend/data/cleaned_sales_data.csv
"""
import os
import sys
from pathlib import Path
import pandas as pd
import numpy as np

def prepare_cleaned_dataset(raw_path: str, output_path: str):
    raw_file = Path(raw_path)
    out_file = Path(output_path)
    
    if not raw_file.exists():
        raise FileNotFoundError(f"Source dataset not found at: {raw_file}")
        
    out_file.parent.mkdir(parents=True, exist_ok=True)
    
    print(f"Loading raw dataset from {raw_file}...")
    df = pd.read_csv(raw_file)
    print(f"Raw shape: {df.shape}")
    
    # 1. Standardize column names
    df.columns = (
        df.columns.astype(str)
        .str.strip()
        .str.lower()
        .str.replace(r"\s+", "_", regex=True)
    )
    
    required_columns = [
        "date",
        "store_id",
        "product_id",
        "price",
        "units_sold",
    ]
    missing = [c for c in required_columns if c not in df.columns]
    if missing:
        raise ValueError(f"Required columns missing: {missing}")
        
    # 2. Date parsing
    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    
    # 3. Numeric conversion
    numeric_columns = [
        "price",
        "units_sold",
        "units_ordered",
        "discount",
        "promotion",
        "competitor_pricing",
        "inventory_level",
        "epidemic",
        "demand",
    ]
    for col in numeric_columns:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")
            
    # 4. Remove exact duplicates
    df = df.drop_duplicates().copy()
    
    # 5. Drop rows with essential nulls
    df = df.dropna(subset=["date", "store_id", "product_id", "price", "units_sold"]).copy()
    
    # 6. Basic validity filtering
    df = df[(df["price"] > 0) & (df["units_sold"] >= 0)].copy()
    
    # 7. Time features
    df["year"] = df["date"].dt.year
    df["month"] = df["date"].dt.month
    df["day_of_week"] = df["date"].dt.dayofweek
    
    # Sort chronologically and by store/product
    df = df.sort_values(by=["date", "store_id", "product_id"]).reset_index(drop=True)
    
    # Save formatted date string for clean CSV serialization
    df["date"] = df["date"].dt.strftime("%Y-%m-%d")
    
    df.to_csv(out_file, index=False)
    print(f"Cleaned dataset saved to: {out_file}")
    print(f"Final shape: {df.shape} (Expected: 76000 rows, 19 columns)")
    print(f"Columns: {list(df.columns)}")
    
    # Sanity checks
    assert df.shape[0] == 76000, f"Expected 76000 rows, got {df.shape[0]}"
    assert df.shape[1] == 19, f"Expected 19 columns, got {df.shape[1]}"
    assert df.isnull().sum().sum() == 0, f"Expected 0 nulls, got {df.isnull().sum().sum()}"
    print("ALL VALIDATION CHECKS PASSED SUCCESSFULLY.")

if __name__ == "__main__":
    raw_path = sys.argv[1] if len(sys.argv) > 1 else r"D:\Ecomdata\sales_data.csv"
    output_path = sys.argv[2] if len(sys.argv) > 2 else r"backend\data\cleaned_sales_data.csv"
    prepare_cleaned_dataset(raw_path, output_path)

