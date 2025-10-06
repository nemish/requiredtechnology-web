import { EmailTemplate } from "@/app/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyRecaptcha(
  token: string
): Promise<{ success: boolean; score: number | null; details: any }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn(
      "reCAPTCHA secret key is not configured - allowing submission"
    );
    return {
      success: true,
      score: null,
      details: { error: "No secret key configured" },
    };
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
    const isValid = data.success && data.score >= 0.5;

    // Only log failures or low scores
    if (!isValid) {
      console.warn(`reCAPTCHA verification failed (score: ${data.score})`);
    }

    return {
      success: isValid,
      score: data.score,
      details: data,
    };
  } catch (error) {
    console.error("❌ reCAPTCHA verification error:", error);
    return {
      success: false,
      score: null,
      details: {
        error: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, recaptchaToken, isDebugTest } = body;

    // Verify reCAPTCHA token
    let recaptchaResult = null;
    if (recaptchaToken) {
      recaptchaResult = await verifyRecaptcha(recaptchaToken);
      if (!recaptchaResult.success) {
        return Response.json(
          {
            error: "reCAPTCHA verification failed",
            score: recaptchaResult.score,
            details: recaptchaResult.details,
          },
          { status: 400 }
        );
      }
    }

    // For debug tests, return the reCAPTCHA result without sending email
    if (isDebugTest) {
      return Response.json({
        success: true,
        score: recaptchaResult?.score,
        details: recaptchaResult?.details,
        message: "Debug test completed",
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Required Technology <onboarding@required.ee>",
      to: ["info@required.ee"],
      subject: `required.ee - New Contact Form Submission from ${name}`,
      react: EmailTemplate({ firstName: name, email, message }),
    });

    if (error) {
      console.error("Email sending failed:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({
      ...data,
      recaptchaScore: recaptchaResult?.score,
    });
  } catch (error) {
    console.error("API error:", error);
    return Response.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }
}
