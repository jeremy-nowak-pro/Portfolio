import { NextResponse } from "next/server";

/**
 * Endpoint contact — squelette prêt à brancher sur un provider
 * (Resend, Postmark, Nodemailer, etc.) ou un webhook (Discord, Slack).
 *
 * Validation manuelle volontaire pour éviter une dépendance (zod) sur ce skeleton.
 */
export const runtime = "edge";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let data: ContactPayload;
  try {
    data = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = data.name?.trim();
  const email = data.email?.trim();
  const message = data.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  // TODO: brancher sur Resend / Postmark / webhook.
  // Exemple Resend :
  //   await resend.emails.send({ from, to, subject, html });
  console.log("[contact] new message", { name, email, subject: data.subject });

  return NextResponse.json({ ok: true });
}
