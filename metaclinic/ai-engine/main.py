from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from reinforcement_learning import agent, N_STATES

app = FastAPI()

# Cargar el modelo de análisis de sentimientos en español
sentiment_analyzer = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")

class HealthEvent(BaseModel):
    id: str
    description: str
    location: dict
    severity: int

class AnalysisResult(BaseModel):
    sentiment: dict

class KataResponse(BaseModel):
    response: str

class Feedback(BaseModel):
    state: int
    action: int
    reward: float
    next_state: int

@app.post("/api/kata/analyze", response_model=AnalysisResult)
def analyze_data(event: HealthEvent):
    """
    Analiza un evento de salud y devuelve un análisis de sentimiento.
    """
    sentiment = sentiment_analyzer(event.description)
    return {"sentiment": sentiment}

@app.get("/api/kata/greet", response_model=KataResponse)
def greet():
    """
    Kata se presenta.
    """
    return {"response": "Hola, soy Kata, tu asistente de IA para el análisis de datos de salud comunitaria. ¿En qué puedo ayudarte hoy?"}

@app.post("/api/kata/feedback")
def feedback(feedback: Feedback):
    """
    Recibe feedback del usuario y actualiza el modelo de aprendizaje por refuerzo.
    """
    agent.update_q_table(feedback.state, feedback.action, feedback.reward, feedback.next_state)
    return {"message": "Gracias por tu feedback. Estoy aprendiendo a ser mejor."}

@app.get("/api/kata/action/{state}")
def get_action(state: int):
    """
    Devuelve la mejor acción para un estado dado.
    """
    if state >= N_STATES:
        return {"error": "Estado inválido"}
    action = agent.choose_action(state)
    return {"action": int(action)}
