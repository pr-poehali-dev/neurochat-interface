import os
import json
import urllib.request
import urllib.error

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
}

GEMINI_MODEL = "gemini-2.0-flash"


def convert_messages_to_gemini(messages):
    """Convert OpenAI-style messages to Gemini format."""
    gemini_contents = []
    for msg in messages:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        # Gemini uses "user" and "model" roles
        gemini_role = "model" if role == "assistant" else "user"
        gemini_contents.append({
            "role": gemini_role,
            "parts": [{"text": content}]
        })
    return gemini_contents


def handler(request, context=None):
    # Handle CORS preflight
    if request.method == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": "ok"}

    try:
        body = json.loads(request.body)
        messages = body.get("messages", [])

        api_key = os.environ.get("GOOGLE_API_KEY")
        if not api_key:
            return {
                "statusCode": 500,
                "headers": CORS_HEADERS,
                "body": json.dumps({"error": "GOOGLE_API_KEY не настроен"}),
            }

        # Convert messages to Gemini format
        gemini_contents = convert_messages_to_gemini(messages)

        # System instruction for the assistant
        system_instruction = {
            "parts": [{"text": "Ты умный и дружелюбный ИИ-ассистент NeuralChat на базе Google Gemini. Отвечай на русском языке, если пользователь пишет по-русски. Давай полезные, точные и понятные ответы."}]
        }

        payload = json.dumps({
            "system_instruction": system_instruction,
            "contents": gemini_contents,
            "generationConfig": {
                "maxOutputTokens": 1024,
                "temperature": 0.7,
            }
        }).encode("utf-8")

        url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={api_key}"

        req = urllib.request.Request(
            url,
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )

        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            # Extract text from Gemini response
            reply = data["candidates"][0]["content"]["parts"][0]["text"]
            return {
                "statusCode": 200,
                "headers": CORS_HEADERS,
                "body": json.dumps({"reply": reply}),
            }

    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        try:
            error_data = json.loads(error_body)
            error_msg = error_data.get("error", {}).get("message", "Ошибка Google Gemini API")
        except Exception:
            error_msg = error_body
        return {
            "statusCode": e.code,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": error_msg}),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": f"Внутренняя ошибка: {str(e)}"}),
        }