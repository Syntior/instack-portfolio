import "server-only";
import type { ContactInput, JoinInput } from "@/lib/validation";
import { interestLabel } from "@/lib/validation";
import type { EmailMessage } from "@/lib/email";

/** Escapes text for safe use inside HTML. Submitted values are untrusted. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Keeps a value on a single line so it cannot forge extra subject lines. */
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`;
}

function wrap(title: string, rows: string, body: string): string {
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:14px;line-height:1.55;color:#111827">
<h2 style="margin:0 0 16px;font-size:18px">${escapeHtml(title)}</h2>
<table style="border-collapse:collapse">${rows}</table>
<div style="margin-top:20px;padding:16px;background:#f3f4f6;border-radius:8px;white-space:pre-wrap">${escapeHtml(body)}</div>
</div>`;
}

export function joinApplicationEmail(data: JoinInput): EmailMessage {
  const area = interestLabel(data.area);
  const githubUrl = `https://github.com/${data.github}`;

  return {
    subject: `New contributor application: ${oneLine(data.name)} (${area})`,
    replyTo: data.email,
    text: [
      "New contributor application",
      "",
      `Name:      ${oneLine(data.name)}`,
      `Email:     ${data.email}`,
      `GitHub:    ${githubUrl}`,
      `Interest:  ${area}`,
      "",
      "Why they want to join:",
      data.motivation,
    ].join("\n"),
    html: wrap(
      "New contributor application",
      row("Name", data.name) +
        row("Email", data.email) +
        row("GitHub", githubUrl) +
        row("Interest", area),
      data.motivation,
    ),
  };
}

export function contactMessageEmail(data: ContactInput): EmailMessage {
  const subject = data.subject ? oneLine(data.subject) : "New message";

  return {
    subject: `Website contact: ${subject}`,
    replyTo: data.email,
    text: [
      "New contact message",
      "",
      `Name:     ${oneLine(data.name)}`,
      `Email:    ${data.email}`,
      `Subject:  ${subject}`,
      "",
      data.message,
    ].join("\n"),
    html: wrap(
      "New contact message",
      row("Name", data.name) + row("Email", data.email) + row("Subject", subject),
      data.message,
    ),
  };
}
