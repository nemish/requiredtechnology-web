import { EmailTemplate } from "@/app/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn("reCAPTCHA secret key is not configured");
    return true; // Allow submission in development if key is not set
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();
    return data.success && data.score >= 0.5; // Score threshold for v3
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, recaptchaToken } = body;

    // Verify reCAPTCHA token
    if (recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
      if (!isValidRecaptcha) {
        return Response.json(
          { error: "reCAPTCHA verification failed" },
          { status: 400 }
        );
      }
    }

    const { data, error } = await resend.emails.send({
      from: "Required Technology <onboarding@required.ee>",
      to: ["info@required.ee"],
      subject: `required.ee - New Contact Form Submission from ${name}`,
      react: EmailTemplate({ firstName: name, email, message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }
}
