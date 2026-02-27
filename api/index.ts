export default async function handler(req: Request): Promise<Response> {
  return new Response("⚡ ANTI-SPAM SYSTEM — ONLINE ⚡\n\nEndpoints:\n- POST /api/webhook - Telegram webhook\n- GET /api/setup?url=YOUR_WEBHOOK_URL - Setup webhook", {
    headers: { "Content-Type": "text/plain" },
  });
}
