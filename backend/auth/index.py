"""
Авторизация и регистрация пользователей Vibe.
POST / с body.action = "register" | "login"
"""
import json
import os
import hashlib
import psycopg2


COLORS = [
    "from-purple-500 to-violet-500",
    "from-green-500 to-teal-500",
    "from-pink-500 to-rose-500",
    "from-orange-500 to-amber-500",
    "from-blue-500 to-cyan-500",
    "from-red-500 to-pink-500",
]

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token",
    "Content-Type": "application/json",
}


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    action = body.get("action", "")

    conn = get_conn()
    cur = conn.cursor()

    # РЕГИСТРАЦИЯ
    if action == "register":
        name = (body.get("name") or "").strip()
        phone = (body.get("phone") or "").strip()
        password = (body.get("password") or "").strip()

        if not name or not phone or not password:
            conn.close()
            return {
                "statusCode": 400,
                "headers": CORS_HEADERS,
                "body": json.dumps({"error": "Заполните все поля"}),
            }

        cur.execute("SELECT id FROM users WHERE phone = %s", (phone,))
        if cur.fetchone():
            conn.close()
            return {
                "statusCode": 409,
                "headers": CORS_HEADERS,
                "body": json.dumps({"error": "Пользователь с таким номером уже зарегистрирован"}),
            }

        cur.execute("SELECT COUNT(*) FROM users")
        count = cur.fetchone()[0]
        color = COLORS[count % len(COLORS)]
        avatar = name[0].upper()

        cur.execute(
            "INSERT INTO users (name, phone, password_hash, avatar, color) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (name, phone, hash_password(password), avatar, color),
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        conn.close()

        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({
                "id": user_id,
                "name": name,
                "phone": phone,
                "avatar": avatar,
                "color": color,
            }),
        }

    # ВХОД
    if action == "login":
        phone = (body.get("phone") or "").strip()
        password = (body.get("password") or "").strip()

        if not phone or not password:
            conn.close()
            return {
                "statusCode": 400,
                "headers": CORS_HEADERS,
                "body": json.dumps({"error": "Введите телефон и пароль"}),
            }

        cur.execute(
            "SELECT id, name, phone, avatar, color FROM users WHERE phone = %s AND password_hash = %s",
            (phone, hash_password(password)),
        )
        row = cur.fetchone()
        conn.close()

        if not row:
            return {
                "statusCode": 401,
                "headers": CORS_HEADERS,
                "body": json.dumps({"error": "Неверный номер или пароль"}),
            }

        user_id, name, phone, avatar, color = row
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({
                "id": user_id,
                "name": name,
                "phone": phone,
                "avatar": avatar,
                "color": color,
            }),
        }

    conn.close()
    return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "Неизвестное действие"})}