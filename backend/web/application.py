from importlib import metadata

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import UJSONResponse

from backend.logging import configure_logging
from backend.settings import settings
from backend.web.api.error_handling import platformatic_exception_handler
from backend.web.api.errors import PlatformaticError
from backend.web.api.router import api_router
from backend.web.lifetime import (
    register_shutdown_event,
    register_startup_event,
)


def get_app() -> FastAPI:
    """
    Get FastAPI application.

    This is the main constructor of an application.

    :return: application.
    """
    configure_logging()

    app = FastAPI(
        title="Reworkd Platform API",
        # version=metadata.version("backend"),
        docs_url="/api/docs",
        redoc_url="/api/redoc",
        openapi_url="/api/openapi.json",
        default_response_class=UJSONResponse,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.frontend_url],
        allow_origin_regex=settings.allowed_origins_regex,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Adds startup and shutdown events.
    register_startup_event(app)
    register_shutdown_event(app)

    # Main router for the API.
    app.include_router(router=api_router, prefix="/api")

    app.exception_handler(PlatformaticError)(platformatic_exception_handler)

    return app
