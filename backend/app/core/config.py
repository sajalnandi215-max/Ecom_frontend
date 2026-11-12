import os
from pathlib import Path
from typing import List

try:
    from pydantic_settings import BaseSettings
    class BaseConfig(BaseSettings):
        class Config:
            env_file = ".env"
            extra = "ignore"
except ImportError:
    from pydantic import BaseModel
    class BaseConfig(BaseModel):
        pass

class Settings(BaseConfig):
    PROJECT_NAME: str = "EconoCausal - Dynamic Pricing Intelligence Platform"
    VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() in ("true", "1")
    
    # Base directories
    BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
    DATASET_PATH: Path = BASE_DIR / "data" / "cleaned_sales_data.csv"
    MODELS_DIR: Path = BASE_DIR / "models"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

settings = Settings()
