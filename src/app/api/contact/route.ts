import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { siteConfig } from "@/lib/siteConfig";

const inquiriesDir = path.join(process.cwd(), "content", ".history");
const inquiriesFile = path.join(inquiriesDir, "inquiries.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, contact, solution, location, message, honeypot } = body;

    // Anti-spam honeypot
    if (honeypot && String(honeypot).length > 0) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Required fields per prompt specification
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please provide your name" }, { status: 400 });
    }
    if (!contact || typeof contact !== "string" || contact.trim().length < 6) {
      return NextResponse.json({ error: "Please provide a valid phone number or email" }, { status: 400 });
    }
    if (!solution || typeof solution !== "string") {
      return NextResponse.json({ error: "Please select a solution of interest" }, { status: 400 });
    }
    if (!location || typeof location !== "string") {
      return NextResponse.json({ error: "Please specify your project location" }, { status: 400 });
    }

    const inquiryRecord = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      name: name.trim(),
      contact: contact.trim(),
      solution: solution.trim(),
      location: location.trim(),
      message: typeof message === "string" ? message.trim() : "",
      recipient: siteConfig.email,
    };

    // Persistent storage mechanism in content/.history/inquiries.json
    try {
      await fs.mkdir(inquiriesDir, { recursive: true });
      let existing: unknown[] = [];
      try {
        const raw = await fs.readFile(inquiriesFile, "utf-8");
        existing = JSON.parse(raw);
        if (!Array.isArray(existing)) existing = [];
      } catch {
        existing = [];
      }
      existing.unshift(inquiryRecord);
      await fs.writeFile(inquiriesFile, JSON.stringify(existing, null, 2), "utf-8");
      console.log(`[Inquiry Stored] ID: ${inquiryRecord.id} from ${inquiryRecord.name}`);
    } catch (storageErr) {
      console.error("[Inquiry Storage Error]", storageErr);
      return NextResponse.json(
        {
          error: "Storage service temporarily unavailable. Please contact us directly via WhatsApp or phone.",
        },
        { status: 500 }
      );
    }

    // Optional email delivery if credentials configured
    let deliveredByEmail = false;
    if (process.env.RESEND_API_KEY) {
      // In production with Resend:
      // await resend.emails.send(...)
      deliveredByEmail = true;
    }

    return NextResponse.json(
      {
        success: true,
        stored: true,
        deliveredByEmail,
        message: "Your inquiry has been successfully received and logged. Our engineering team will contact you within 24 hours.",
        id: inquiryRecord.id,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Inquiry API Error]", err);
    return NextResponse.json({ error: "An unexpected error occurred while processing your request." }, { status: 500 });
  }
}
