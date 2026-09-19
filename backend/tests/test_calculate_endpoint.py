from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_calculate_endpoint():
    response = client.post("/calculate", json={"operand1": 10, "operand2": 5, "operation": "add"})
    assert response.status_code == 200
    assert response.json() == {"result": 15}

def test_calculate_endpoint_divide_by_zero():
    response = client.post("/calculate", json={"operand1": 10, "operand2": 0, "operation": "divide"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Cannot divide by zero."}

def test_calculate_endpoint_invalid_operation():
    response = client.post("/calculate", json={"operand1": 10, "operand2": 5, "operation": "invalid"})
    assert response.status_code == 422
    assert response.json() == {"detail": "Invalid operation."}

def test_calculate_endpoint_missing_data():
    response = client.post("/calculate", json={"operand1": 10, "operation": "add"})
    assert response.status_code == 422
    assert response.json() == {"detail": "Missing data in request body."}

def test_calculate_endpoint_invalid_data_type():
    response = client.post("/calculate", json={"operand1": "ten", "operand2": 5, "operation": "add"})
    assert response.status_code == 422
    assert response.json() == {"detail": "Invalid data type in request body."}