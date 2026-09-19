# This function receives 2 operands and an operation to perform and calls the
# corresponding function to perform the operation.
def calculate(operand1: float, operand2: float, operation: str) -> float:
    match operation:
        case "add":
            return addition(operand1, operand2)
        case "subtract":
            return subtraction(operand1, operand2)
        case "multiply":
            return multiplication(operand1, operand2)
        case "divide":
            return division(operand1, operand2)


def addition(operand1: float, operand2: float) -> float:
    return operand1 + operand2

def subtraction(operand1: float, operand2: float) -> float:
    return operand1 - operand2

def multiplication(operand1: float, operand2: float) -> float:
    return operand1 * operand2

def division(operand1: float, operand2: float) -> float:
    if operand2 == 0:
        raise ValueError("Cannot divide by zero.")
    return operand1 / operand2