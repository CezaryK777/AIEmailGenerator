import { useState } from "react";
import type { EmailForm } from "../models/EmailForm";
import { apiFetch } from "../api";

export function useGenerateEmail() {
  const [loading, setLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const generateEmail = async (form: EmailForm) => {
    setLoading(true);
    setError("");
    setGeneratedEmail("");
    try {
      const data = await apiFetch("/EmailGenerator/generate-email", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setGeneratedEmail(data.emailContent || "");
    } catch (err) {
      setError("Failed to generate email.");
    } finally {
      setLoading(false);
    }
  };

  return { generateEmail, generatedEmail, loading, error };
}