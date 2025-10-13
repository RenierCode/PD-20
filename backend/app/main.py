# The main entry point. Initializes the FastAPI instance, includes routers, and configures middleware.
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

