import { setWebhook } from "../src/index";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  if (req.method === "GET") {
    const webhookUrl = url.searchParams.get("url");
    if (!webhookUrl) {
      return new Response(JSON.stringify({ error: "Missing 'url' parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const result = await setWebhook(webhookUrl);
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method Not Allowed", { status: 405 });
}
