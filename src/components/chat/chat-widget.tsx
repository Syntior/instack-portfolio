"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Home, MessageSquare, SendHorizontal, X } from "lucide-react";
import { sendChatLead } from "@/actions/chat";
import { LogoMark } from "@/components/brand/logo";
import { joinHref, site } from "@/lib/site";
import { contactSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";

/**
 * Floating chat widget, bottom-right on every page.
 *
 * It is a guided bot, not an AI: it answers a few common questions with links
 * and quick replies, and anything it cannot answer becomes a lead (name, email,
 * message) that is emailed to the team through `sendChatLead`. It lives in the
 * root layout, so the conversation survives navigation between pages.
 */

type ChatLink = { label: string; href: string };
type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  links?: ChatLink[];
};

/** Where the conversation is. The `ask-*` steps collect a lead. */
type Step = "menu" | "ask-name" | "ask-email" | "ask-message" | "sending";

type Reply = "project" | "learn" | "else" | "community" | "careers" | "question" | "retry";

const replyLabels: Record<Reply, string> = {
  project: "Discuss my project",
  learn: `Learn about ${site.name}`,
  else: "Something else",
  community: "Join the community",
  careers: "Careers",
  question: "Ask a question",
  retry: "Try again",
};

const menuReplies: Reply[] = ["project", "learn", "else"];

const greeting = `Hi! You are in the right place.\n\nI'm the ${site.name} Bot. Want to chat about your project or learn how we work?`;

type Lead = { topic: string; name: string; email: string; message: string };
const emptyLead: Lead = { topic: "", name: "", email: "", message: "" };

/** Canned answers for free text typed at the menu. First match wins. */
const keywordAnswers: {
  pattern: RegExp;
  text: string;
  links?: ChatLink[];
  replies: Reply[];
}[] = [
  {
    pattern: /\b(price|pricing|cost|budget|quote|rate|estimate|charges?)\b/i,
    text: "Every project is priced on its scope. Tell us what you want to build and we will send you an estimate.",
    replies: ["project", "learn"],
  },
  {
    pattern: /\b(job|jobs|career|careers|hiring|vacanc\w*|intern\w*|work for you)\b/i,
    text: "Open roles are listed on our Careers page.",
    links: [{ label: "See open roles", href: "/careers" }],
    replies: menuReplies,
  },
  {
    pattern: /\b(join|community|member|members|learn coding|mentor\w*)\b/i,
    text: `The ${site.community.name} is where developers grow with us on real projects. You can apply on the Community page.`,
    links: [{ label: "Apply to join", href: joinHref }],
    replies: menuReplies,
  },
  {
    pattern: /\b(services?|offer|build|develop\w*|technolog\w*|stack|app|website|web)\b/i,
    text: "We build web applications and products for clients, to production standards. Here is what we offer and the technologies we use.",
    links: [
      { label: "Services", href: "/services" },
      { label: "Technologies", href: "/technologies" },
    ],
    replies: ["project", "else"],
  },
  {
    pattern: /^(hi|hello|hey|salam|assalam\w*|aoa)\b/i,
    text: "Hello! How can I help you today?",
    replies: menuReplies,
  },
];

const BOT_DELAY_MS = 450;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"home" | "chat">("home");
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "bot", text: greeting },
  ]);
  const [replies, setReplies] = useState<Reply[]>(menuReplies);
  const [step, setStep] = useState<Step>("menu");
  const [lead, setLead] = useState<Lead>(emptyLead);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [, startTransition] = useTransition();

  const panelId = useId();
  const nextId = useRef(1);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // Keep the newest message in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, typing, view]);

  useEffect(() => {
    if (open && view === "chat") inputRef.current?.focus();
  }, [open, view]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      launcherRef.current?.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  function push(message: Omit<Message, "id">) {
    setMessages((current) => [...current, { ...message, id: nextId.current++ }]);
  }

  /** Bot replies arrive after a short "typing" pause, like a real chat. */
  function botSay(text: string, options: { links?: ChatLink[]; replies?: Reply[] } = {}) {
    setReplies([]);
    setTyping(true);
    timers.current.push(
      setTimeout(() => {
        setTyping(false);
        push({ from: "bot", text, links: options.links });
        setReplies(options.replies ?? []);
      }, BOT_DELAY_MS),
    );
  }

  function startLead(topic: string, message = "") {
    setLead({ ...emptyLead, topic, message });
    setStep("ask-name");
    botSay("Great. What's your name?");
  }

  function chooseReply(reply: Reply) {
    if (step === "sending") return;
    push({ from: "user", text: replyLabels[reply] });

    switch (reply) {
      case "project":
        return startLead("Discuss my project");
      case "learn":
        return botSay(site.description, {
          links: [
            { label: "Services", href: "/services" },
            { label: "Technologies", href: "/technologies" },
            { label: "About us", href: "/about" },
          ],
          replies: ["project", "else"],
        });
      case "else":
        return botSay("Sure. What are you looking for?", {
          replies: ["community", "careers", "question"],
        });
      case "community":
        return botSay(
          `The ${site.community.name} is where developers grow with us on real projects.`,
          { links: [{ label: "Apply to join", href: joinHref }], replies: menuReplies },
        );
      case "careers":
        return botSay("Open roles are listed on our Careers page.", {
          links: [{ label: "See open roles", href: "/careers" }],
          replies: menuReplies,
        });
      case "question":
        return startLead("Question");
      case "retry":
        return submitLead(lead);
    }
  }

  function handleText(text: string) {
    push({ from: "user", text });

    if (step === "ask-name") {
      if (!contactSchema.shape.name.safeParse(text).success) {
        return botSay("Please enter your name (at least 2 characters).");
      }
      setLead((current) => ({ ...current, name: text }));
      setStep("ask-email");
      return botSay(`Nice to meet you, ${text}. What's your email, so the team can reply?`);
    }

    if (step === "ask-email") {
      if (!contactSchema.shape.email.safeParse(text).success) {
        return botSay("That email doesn't look right. Please check it and try again.");
      }
      const next = { ...lead, email: text };
      setLead(next);
      // Free text typed at the menu already gave us the message.
      if (next.message) return submitLead(next);
      setStep("ask-message");
      return botSay(
        next.topic === "Question"
          ? "What would you like to ask?"
          : "Tell us about your project: what you want to build, and any timeline or budget.",
      );
    }

    if (step === "ask-message") {
      if (!contactSchema.shape.message.safeParse(text).success) {
        return botSay("Could you write a little more? At least 10 characters.");
      }
      const next = { ...lead, message: text };
      setLead(next);
      return submitLead(next);
    }

    const match = keywordAnswers.find((answer) => answer.pattern.test(text));
    if (match) {
      return botSay(match.text, { links: match.links, replies: match.replies });
    }
    // Anything the bot can't answer goes to the team.
    if (text.length >= 10) {
      startLead("Chat message", text);
      return;
    }
    botSay("I'm not sure I understood. Pick one of these, or write a full question.", {
      replies: menuReplies,
    });
  }

  function submitLead(data: Lead) {
    setStep("sending");
    setReplies([]);
    setTyping(true);

    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("email", data.email);
    formData.set("subject", `Chat: ${data.topic}`);
    formData.set("message", data.message);

    startTransition(async () => {
      let result: Awaited<ReturnType<typeof sendChatLead>>;
      try {
        result = await sendChatLead(formData);
      } catch {
        result = {
          ok: false,
          message: `Something went wrong. Please try again, or email us at ${site.email}.`,
        };
      }
      setTyping(false);
      if (result.ok) {
        setStep("menu");
        setLead(emptyLead);
        push({
          from: "bot",
          text: `Thanks, ${data.name}! Your message is with the team. We'll reply to ${data.email}.`,
        });
        setReplies(menuReplies);
      } else {
        // Keep the lead so "Try again" can resend it.
        setStep("menu");
        push({ from: "bot", text: result.message });
        setReplies(["retry", ...menuReplies]);
      }
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || step === "sending" || typing) return;
    setDraft("");
    handleText(text);
  }

  const inputPlaceholder =
    step === "ask-name"
      ? "Your name"
      : step === "ask-email"
        ? "you@example.com"
        : "Type a message…";

  return (
    <>
      <div
        id={panelId}
        role="dialog"
        aria-label={`Chat with ${site.name}`}
        hidden={!open}
        className="fixed inset-x-4 bottom-24 z-50 flex max-h-[min(600px,calc(100dvh-11rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl sm:inset-x-auto sm:right-6 sm:w-[380px] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4"
      >
        {view === "home" ? (
          <>
            <div className="bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),black_25%)] px-6 pt-6 pb-16 text-primary-foreground">
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-white">
                  <LogoMark className="size-8 sm:size-8" />
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-md p-1.5 opacity-80 transition hover:bg-white/15 hover:opacity-100"
                >
                  <X className="size-5" aria-hidden="true" />
                  <span className="sr-only">Close chat</span>
                </button>
              </div>
              <p className="mt-10 text-3xl font-bold">
                Hi! <span aria-hidden="true">👋</span>
              </p>
              <p className="mt-1 text-lg opacity-90">Welcome to {site.name}</p>
            </div>
            <div className="-mt-10 px-5">
              <button
                type="button"
                onClick={() => setView("chat")}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-5 py-4 text-left font-medium shadow-sm transition hover:border-primary/50"
              >
                Chat with us
                <SendHorizontal className="size-5 text-primary" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1" />
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 border-b border-border px-3 py-3">
              <button
                type="button"
                onClick={() => setView("home")}
                className="rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
                <span className="sr-only">Back</span>
              </button>
              <LogoMark className="size-7 sm:size-7" />
              <div className="flex-1 leading-tight">
                <p className="font-semibold">{site.name} Bot</p>
                <p className="text-xs text-muted-foreground">Usually replies in a moment</p>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" aria-hidden="true" />
                <span className="sr-only">Close chat</span>
              </button>
            </div>

            <div
              ref={scrollRef}
              aria-live="polite"
              className="flex min-h-64 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.9375rem] leading-relaxed whitespace-pre-line",
                    message.from === "bot"
                      ? "self-start rounded-tl-sm bg-muted"
                      : "self-end rounded-tr-sm bg-primary text-primary-foreground",
                  )}
                >
                  {message.text}
                  {message.links ? (
                    <span className="mt-2 flex flex-wrap gap-2">
                      {message.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="rounded-md bg-card px-2.5 py-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                        >
                          {link.label} →
                        </Link>
                      ))}
                    </span>
                  ) : null}
                </div>
              ))}

              {typing ? (
                <div className="flex gap-1 self-start rounded-2xl rounded-tl-sm bg-muted px-4 py-3.5">
                  <span className="sr-only">{site.name} Bot is typing</span>
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      aria-hidden="true"
                      style={{ animationDelay: `${delay}ms` }}
                      className="size-1.5 rounded-full bg-muted-foreground motion-safe:animate-bounce"
                    />
                  ))}
                </div>
              ) : null}

              {replies.length > 0 ? (
                <div className="mt-1 flex flex-col items-end gap-2">
                  {replies.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => chooseReply(reply)}
                      className="rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
                    >
                      {replyLabels[reply]}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border p-3">
              <label htmlFor={`${panelId}-input`} className="sr-only">
                Message
              </label>
              <input
                ref={inputRef}
                id={`${panelId}-input`}
                type={step === "ask-email" ? "email" : "text"}
                autoComplete={step === "ask-name" ? "name" : step === "ask-email" ? "email" : "off"}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={inputPlaceholder}
                maxLength={3000}
                className="h-11 flex-1 rounded-lg border border-input bg-background px-3 text-[0.9375rem] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              <button
                type="submit"
                disabled={!draft.trim() || step === "sending" || typing}
                className="grid size-11 place-items-center rounded-lg bg-primary text-primary-foreground transition hover:bg-primary/85 disabled:opacity-50"
              >
                <SendHorizontal className="size-5" aria-hidden="true" />
                <span className="sr-only">Send</span>
              </button>
            </form>
          </>
        )}

        <nav aria-label="Chat sections" className="grid grid-cols-2 border-t border-border">
          {(
            [
              { id: "home", label: "Home", icon: Home },
              { id: "chat", label: "Chat", icon: MessageSquare },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setView(tab.id)}
              aria-current={view === tab.id ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition",
                view === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <tab.icon className="size-5" aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls={panelId}
        className="fixed right-4 bottom-4 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:right-6 sm:bottom-6"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <MessageSquare className="size-6" aria-hidden="true" />
        )}
        <span className="sr-only">{open ? "Close chat" : `Chat with ${site.name}`}</span>
      </button>
    </>
  );
}
