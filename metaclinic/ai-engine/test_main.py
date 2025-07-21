from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_greet():
    response = client.get("/api/kata/greet")
    assert response.status_code == 200
    assert response.json() == {"response": "Hola, soy Kata, tu asistente de IA para el análisis de datos de salud comunitaria. ¿En qué puedo ayudarte hoy?"}

def test_analyze():
    response = client.post("/api/kata/analyze", json={"id": "1", "description": "Me siento muy mal", "location": {"x": 0, "y": 0, "z": 0}, "severity": 10})
    assert response.status_code == 200
    assert "sentiment" in response.json()

def test_feedback():
    response = client.post("/api/kata/feedback", json={"state": 0, "action": 0, "reward": 1, "next_state": 1})
    assert response.status_code == 200
    assert response.json() == {"message": "Gracias por tu feedback. Estoy aprendiendo a ser mejor."}

def test_get_action():
    response = client.get("/api/kata/action/0")
    assert response.status_code == 200
    assert "action" in response.json()
