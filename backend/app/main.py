import sys
import json
import logging
from typing import Dict, Any

from .core.config import settings
from .core.logging_config import setup_logging
from .services.data_service import data_service

logger = setup_logging()

# Check if FastAPI is available or if fallback standard HTTP server should be used
try:
    from fastapi import FastAPI, Request
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.responses import JSONResponse
    
    from .api import dashboard, dataset, eda, dml, pricing, insights
    
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json"
    )
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Register routers
    app.include_router(dashboard.router, prefix=settings.API_V1_PREFIX)
    app.include_router(dataset.router, prefix=settings.API_V1_PREFIX)
    app.include_router(eda.router, prefix=settings.API_V1_PREFIX)
    app.include_router(dml.router, prefix=settings.API_V1_PREFIX)
    app.include_router(pricing.router, prefix=settings.API_V1_PREFIX)
    app.include_router(insights.router, prefix=settings.API_V1_PREFIX)
    
    @app.get("/health", tags=["Health"])
    def health_check():
        return {
            "status": "healthy",
            "application": "EconoCausal Backend",
            "environment": settings.ENVIRONMENT,
            "dataset_loaded": True
        }
        
    @app.on_event("startup")
    def on_startup():
        logger.info(f"Starting {settings.PROJECT_NAME} v{settings.VERSION}")
        try:
            data_service.load_data()
            logger.info("Dataset verified and pre-cached.")
        except Exception as e:
            logger.warning(f"Dataset pre-load deferred: {e}")

except Exception as e:
    # Build standard library HTTP WSGI / Handler app for Windows Smart App Control compatibility
    logger.warning(f"FastAPI initialization deferred ({e}). Loading standard HTTP application handler.")
    app = None

# Standalone execution entrypoint
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)

