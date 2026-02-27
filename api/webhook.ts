import { handleUpdate } from "../src/index.js";
import type { TelegramUpdate } from "../src/interface.js";

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  if (req.method === "GET") {
    return new Response("⚡ ANTI-SPAM SYSTEM — ONLINE ⚡", {
      headers: { "Content-Type": "text/plain" },
    });
  }

  if (req.method === "POST") {
    try {
      const update = (await req.json()) as TelegramUpdate;
      await handleUpdate(update);
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Webhook error:", error);
      return new Response(JSON.stringify({ ok: false, error: String(error) }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
}
