import os
import json
import urllib.request
import urllib.error
from http.server import BaseHTTPRequestHandler

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
}


def handler(request):
    # Handle CORS preflight
    if request.method == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": "ok"}

    try:
        body = json.loads(request.body)
        messages = body.get("messages", [])

        api_key = os.environ.get("OPENAI_API_KEY")
        if not api_key:
            return {
                "statusCode": 500,
                "headers": CORS_HEADERS,
                "body": json.dumps({"error": "OPENAI_API_KEY не настроен"}),
            }

        payload = json.dumps({
            "model": "gpt-4o-mini",
            "messages": [
                {
                    "role": "system",
                    "content": "Ты умный и дружелюбный ИИ-ассистент NeuralChat. Отвечай на русском языке, если пользователь пишет по-русски. Давай полезные, точные и понятные ответы.",
                },
                *messages,
            ],
            "max_tokens": 1024,
            "temperature": 0.7,
        }).encode("utf-8")

        req = urllib.request.Request(
            "https://api.openai.com/v1/chat/completions",
            data=payload,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )

        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            reply = data["choices"][0]["message"]["content"]
            return {
                "statusCode": 200,
                "headers": CORS_HEADERS,
                "body": json.dumps({"reply": reply}),
            }

    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        try:
            error_data = json.loads(error_body)
            error_msg = error_data.get("error", {}).get("message", "Ошибка OpenAI API")
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
