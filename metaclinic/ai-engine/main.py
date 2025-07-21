from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.cluster import KMeans
import numpy as np

app = FastAPI()

class HealthEvent(BaseModel):
    id: str
    description: str
    location: dict
    severity: int

class AnalysisResult(BaseModel):
    clusters: list

@app.post("/api/analyze", response_model=AnalysisResult)
def analyze_data(events: list[HealthEvent]):
    if not events:
        return {"clusters": []}

    # Extract location data for clustering
    locations = np.array([[event.location['x'], event.location['y'], event.location['z']] for event in events])

    # Use KMeans to find clusters of health events
    kmeans = KMeans(n_clusters=3, random_state=0, n_init=10).fit(locations)
    labels = kmeans.labels_

    # Group events by cluster
    clusters = [[] for _ in range(3)]
    for i, event in enumerate(events):
        clusters[labels[i]].append(event.dict())

    return {"clusters": clusters}
