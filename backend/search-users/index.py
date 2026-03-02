"""
Поиск пользователей Vibe по имени или телефону.
GET /?q=...&exclude_id=...
Возвращает до 10 пользователей (не более), НЕ включая текущего пользователя.
"""
import json
import os
import psycopg2


CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Id",
    "Content-Type": "application/json",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    params = event.get("queryStringParameters") or {}
    query = (params.get("q") or "").strip()
    exclude_id = params.get("exclude_id")

    if len(query) < 2:
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps([]),
        }

    conn = get_conn()
    cur = conn.cursor()

    search = f"%{query}%"

    if exclude_id:
        cur.execute(
            """
            SELECT id, name, phone, avatar, color FROM users
            WHERE (name ILIKE %s OR phone ILIKE %s) AND id != %s
            LIMIT 10
            """,
            (search, search, int(exclude_id)),
        )
    else:
        cur.execute(
            """
            SELECT id, name, phone, avatar, color FROM users
            WHERE name ILIKE %s OR phone ILIKE %s
            LIMIT 10
            """,
            (search, search),
        )

    rows = cur.fetchall()
    conn.close()

    users = [
        {"id": r[0], "name": r[1], "phone": r[2], "avatar": r[3], "color": r[4]}
        for r in rows
    ]

    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps(users),
    }