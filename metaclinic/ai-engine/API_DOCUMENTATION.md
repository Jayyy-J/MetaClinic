# Documentación de la API de Kata

Esta documentación describe los endpoints de la API para interactuar con Kata, la IA de MetaClinic.

## Endpoints

### `/api/kata/greet`

*   **Método:** `GET`
*   **Descripción:** Kata se presenta.
*   **Respuesta:**
    ```json
    {
      "response": "Hola, soy Kata, tu asistente de IA para el análisis de datos de salud comunitaria. ¿En qué puedo ayudarte hoy?"
    }
    ```

### `/api/kata/analyze`

*   **Método:** `POST`
*   **Descripción:** Analiza un evento de salud y devuelve un análisis de sentimiento.
*   **Cuerpo de la solicitud:**
    ```json
    {
      "id": "string",
      "description": "string",
      "location": { "x": "number", "y": "number", "z": "number" },
      "severity": "integer"
    }
    ```
*   **Respuesta:**
    ```json
    {
      "sentiment": [
        {
          "label": "string",
          "score": "number"
        }
      ]
    }
    ```

### `/api/kata/feedback`

*   **Método:** `POST`
*   **Descripción:** Recibe feedback del usuario y actualiza el modelo de aprendizaje por refuerzo.
*   **Cuerpo de la solicitud:**
    ```json
    {
      "state": "integer",
      "action": "integer",
      "reward": "number",
      "next_state": "integer"
    }
    ```
*   **Respuesta:**
    ```json
    {
      "message": "Gracias por tu feedback. Estoy aprendiendo a ser mejor."
    }
    ```

### `/api/kata/action/{state}`

*   **Método:** `GET`
*   **Descripción:** Devuelve la mejor acción para un estado dado.
*   **Parámetros de la URL:**
    *   `state`: El estado actual.
*   **Respuesta:**
    ```json
    {
      "action": "integer"
    }
    ```
