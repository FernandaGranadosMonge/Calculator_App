from fastapi import APIRouter, HTTPException
from models.calculations import Request, Response
import services.calculations as calc

router = APIRouter(prefix="/calculate", tags=["calculator"])

# This endpoint receives a calculation request that can have 1 or 2 operands and
# an operation to perform. It passes these arguments to the calculation service
# and returns a JSON response with the result of the calculation.
@router.post("/", response_model=Response)
async def calculate(req: Request):
    try:
        result = calc.calculate(
            req.operand1,
            req.operand2,
            req.operation.value)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return Response(result=result)