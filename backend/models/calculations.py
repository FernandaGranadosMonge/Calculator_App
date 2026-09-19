from pydantic import BaseModel
from enum import Enum

class Operations(str, Enum):
    add = "add"
    subtract = "subtract"
    multiply = "multiply"
    divide = "divide"

class Request(BaseModel):
    operand1: float
    operand2: float #| None      # Some operations like square root only require one operand.
    operation: Operations

class Response(BaseModel):
    result: float