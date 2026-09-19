from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

@app.get("/")
async def read_root():
    return {"message": "Backend is running!"}