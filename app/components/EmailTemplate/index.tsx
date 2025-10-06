import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  email: string;
  message: string;
}

export function EmailTemplate({
  firstName,
  email,
  message,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#1f2937", marginBottom: "20px" }}>
        New Contact Form Submission
      </h1>

      <div
        style={{
          backgroundColor: "#f9fafb",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#374151", marginBottom: "15px" }}>
          Contact Details
        </h2>
        <p style={{ margin: "8px 0", color: "#6b7280" }}>
          <strong>Name:</strong> {firstName}
        </p>
        <p style={{ margin: "8px 0", color: "#6b7280" }}>
          <strong>Email:</strong> {email}
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#f9fafb",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#374151", marginBottom: "15px" }}>Message</h2>
        <p
          style={{
            color: "#6b7280",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
          }}
        >
          {message}
        </p>
      </div>

      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          paddingTop: "20px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#9ca3af", fontSize: "14px" }}>
          This message was sent from the Required Technology contact form.
        </p>
      </div>
    </div>
  );
}
