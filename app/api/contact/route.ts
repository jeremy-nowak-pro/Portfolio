import { NextResponse } from "next/server";

/**
 * Endpoint contact — forward vers un webhook Discord.
 *
 * Configuration : DISCORD_WEBHOOK_URL dans .env.local (en dev) et dans les
 * variables d'environnement Vercel (en prod).
 *
 * Le runtime "edge" suffit : on utilise juste fetch.
 */
export const runtime = "edge";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Couleur d'accent du portfolio (violet) — au format décimal pour Discord.
const ACCENT_COLOR = 0x8b5cf6;

// Discord limite : description 4096, fields[].value 1024, total embed 6000.
const MAX_MESSAGE_LENGTH = 4000;

function truncate(s: string, max: number) {
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

export async function POST(req: Request) {
  let data: ContactPayload;
  try {
    data = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = data.name?.trim();
  const email = data.email?.trim();
  const subject = data.subject?.trim();
  const message = data.message?.trim();

  // Validation
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[contact] DISCORD_WEBHOOK_URL is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // Construction de l'embed Discord — orienté lecture rapide d'une notif de contact.
  // Author (top) → Titre (sujet) → Description (message) → Field "Répondre" cliquable.
  const embed: Record<string, unknown> = {
    color: ACCENT_COLOR,
    author: { name: `📬 Message de ${truncate(name, 240)}` },
    description: truncate(message, MAX_MESSAGE_LENGTH),
    fields: [
      {
        name: "Répondre",
        value: `[${email}](mailto:${email})`,
        inline: false,
      },
    ],
    timestamp: new Date().toISOString(),
    footer: { text: "Message portfolio · /contact" },
  };

  // Titre uniquement si un sujet est fourni — évite un en-tête vide.
  if (subject) {
    embed.title = truncate(subject, 240);
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Portfolio",
        embeds: [embed],
        // Sécurité : un visiteur malicieux ne peut pas pinger @everyone via le formulaire.
        allowed_mentions: { parse: [] },
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[contact] discord webhook failed", res.status, text);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] discord webhook error", err);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
