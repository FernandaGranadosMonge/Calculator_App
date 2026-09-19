from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from models.calculations import Request
from routes.calculations import router as calculations_router

app = FastAPI()
app.include_router(calculations_router)

# We only want to allow requests from our frontend.
allowed_origins = ["http://localhost"]

# Add CORS middleware which allows requests from the allowed origins list.
app.add_middleware(
  CORSMiddleware,
  allow_origins = allowed_origins,
  allow_methods = ["*"],
  allow_headers = ["*"]
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError
):
    errors = exc.errors()

    for error in errors:
        if error["type"] == "missing":
            return JSONResponse(
                status_code=422,
                content={
                    "detail": "Missing data in request body."
                }
            )
        elif error["type"] == "enum":
            return JSONResponse(
                status_code=422,
                content={
                    "detail": "Invalid operation."
                }
            )
        elif error["type"] == "float_parsing" or error["type"] == "float_type":
            return JSONResponse(
                status_code=422,
                content={
                    "detail": "Invalid data type in request body."
                }
            )

    return JSONResponse(
        status_code=422,
        content={
            "detail": "Invalid request"
        }
    )

@app.get("/")
async def read_root():
    return {"message": "Backend is running!"}