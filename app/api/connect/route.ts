import { NextResponse } from "next/server";
import { site } from "@/data/site";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { name?: string; phone?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "Name and email are required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONNECT_TO ?? site.toEmail;

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Email sending is not configured yet. RESEND_API_KEY is missing." },
      { status: 500 },
    );
  }

  const text = [
    "A new connect request came in from the portfolio site.",
    "",
    `Name: ${name}`,
    `Phone: ${phone || "—"}`,
    `Email: ${email}`,
    "",
    "Message:",
    message || "—",
    "",
    "— Find them on WhatsApp or give them a call.",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject: `Connect request — ${name}`, text }),
  });

  if (!res.ok) {
    console.error("connect email failed", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "Send failed. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}