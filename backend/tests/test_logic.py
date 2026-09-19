from models.calculations import Operations
import services.calculations as calc

def test_addition():
    result = calc.calculate(operand1=100, operand2=200, operation=Operations.add.value)
    assert result == 300

def test_subtraction():
    result = calc.calculate(operand1=23, operand2=50, operation=Operations.subtract.value)
    assert result == -27

def test_multiplication():
    result = calc.calculate(operand1=10, operand2=20, operation=Operations.multiply.value)
    assert result == 200

def test_division():
    result = calc.calculate(operand1=100, operand2=20, operation=Operations.divide.value)
    assert result == 5

def test_division_by_zero():
    try:
        calc.calculate(operand1=100, operand2=0, operation=Operations.divide.value)
    except ValueError as e:
        assert str(e) == "Cannot divide by zero."