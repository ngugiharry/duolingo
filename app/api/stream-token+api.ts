import { createHmac } from "crypto";

export async function GET(request: Request): Promise<Response> {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 },
      );
    }

    // Extract Clerk token
    const clerkToken = authHeader.substring(7);
    if (!clerkToken) {
      return Response.json({ error: "Empty token" }, { status: 401 });
    }

    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;

    if (!apiKey || !apiSecret) {
      console.error("[stream-token] Missing Stream credentials");
      return Response.json(
        { error: "Stream credentials not configured" },
        { status: 500 },
      );
    }

    // Generate Stream JWT token
    // Token format: header.payload.signature
    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: apiKey,
      iat: now,
      exp: now + 3600, // 1 hour expiration
    };

    // Base64url encode
    const base64urlEncode = (str: string): string => {
      return Buffer.from(str)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
    };

    const headerEncoded = base64urlEncode(JSON.stringify(header));
    const payloadEncoded = base64urlEncode(JSON.stringify(payload));
    const message = `${headerEncoded}.${payloadEncoded}`;

    // Sign with HS256
    const signature = createHmac("sha256", apiSecret)
      .update(message)
      .digest("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    const token = `${message}.${signature}`;

    return Response.json({ token, apiKey });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[stream-token] Error generating token:", message);
    return Response.json(
      { error: "Failed to generate token" },
      { status: 500 },
    );
  }
}
