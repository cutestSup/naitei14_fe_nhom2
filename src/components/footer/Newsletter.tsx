import { useState } from "react";
import {
  ERROR_EMAIL_ALREADY_EXISTS,
  ERROR_NETWORK_CONNECTION,
  ERROR_SERVER,
  ERROR_GENERIC,
  ERROR_KEYWORD_DUPLICATE,
  ERROR_KEYWORD_ALREADY_EXISTS,
  ERROR_KEYWORD_NETWORK,
  ERROR_KEYWORD_FETCH,
  ERROR_KEYWORD_SERVER,
  ERROR_KEYWORD_500,
} from '@/constants/common'
import { useTranslation } from '@/hooks'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RenderNewsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError(t("validation.emailEmpty"))
      return
    }

    if (!EMAIL_REGEX.test(email)) {
      setError(t("validation.emailInvalidFormat"))
      return
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setEmail("");
    } catch (error: unknown) {
      if (import.meta.env.DEV) {
        console.error("Error subscribing to newsletter:", {
          error,
          context: "Newsletter",
          action: "handleSubmit",
          timestamp: new Date().toISOString(),
        });
      }

      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes(ERROR_KEYWORD_DUPLICATE) ||
          errorMessage.includes(ERROR_KEYWORD_ALREADY_EXISTS)
        ) {
          setError(t(ERROR_EMAIL_ALREADY_EXISTS))
        } else if (
          errorMessage.includes(ERROR_KEYWORD_NETWORK) ||
          errorMessage.includes(ERROR_KEYWORD_FETCH)
        ) {
          setError(t(ERROR_NETWORK_CONNECTION))
        } else if (
          errorMessage.includes(ERROR_KEYWORD_SERVER) ||
          errorMessage.includes(ERROR_KEYWORD_500)
        ) {
          setError(t(ERROR_SERVER))
        } else {
          setError(t(ERROR_GENERIC))
        }
      } else {
        setError(ERROR_GENERIC);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 w-fullmd:w-auto">
      <span className="text-sm mb-2 md:mb-0">
        {t("footer.subscribeEmail")}
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-auto">
        <div className="flex w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder={t("footer.emailPlaceholder")}
            className="px-4 py-2 text-gray-800 rounded-l-md focus:outline-none flex-1 md:w-64"
            aria-label={t("footer.emailPlaceholder")}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "email-error" : undefined}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-primary px-4 py-2 rounded-r-md hover:bg-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            aria-label={t("footer.send")}
          >
            {isSubmitting ? t("footer.sending") : t("footer.send")}
          </button>
        </div>
        {error && (
          <span
            id="email-error"
            className="text-red-500 text-xs mt-1"
            role="alert"
          >
            {error}
          </span>
        )}
      </form>
    </div>
  );
};
