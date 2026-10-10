import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/siteConfig";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, service, details, honeypot } = body;

    // Anti-spam check
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    if (!fullName || !email || !phone || !service || !details) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production with RESEND_API_KEY:
    // await resend.emails.send({ ... })
    // For now, log and return successful response
    console.log("[New Consultation Request Received]", {
      fullName,
      email,
      phone,
      service,
      details,
      timestamp: new Date().toISOString(),
      recipient: siteConfig.email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Consultation request received successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact Route Error]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
