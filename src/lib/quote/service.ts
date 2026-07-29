import { createQuoteId } from "./id";
import { saveQuote } from "./repository";
import { sendQuoteNotification } from "@/lib/email/quote-notification";
import type { StorageMode, StoredFile } from "@/lib/storage";
import type { QuoteFormValues } from "@/lib/validation/quote";

export async function createQuoteRequest(
  form: QuoteFormValues,
  options: {
    quoteId?: string;
    files?: StoredFile[];
    storageMode: StorageMode;
  },
) {
  const quoteId = options.quoteId ?? createQuoteId();
  const createdAt = new Date().toISOString();
  const storedFiles = options.files ?? [];

  const repository = await saveQuote({
    id: quoteId,
    form,
    files: storedFiles,
    createdAt,
    storageMode: options.storageMode,
  });

  const email = await sendQuoteNotification({
    quoteId,
    form,
    files: storedFiles,
    createdAt,
  }).catch(() => ({ mode: "failed" as const }));

  return {
    quoteId,
    mode:
      options.storageMode === "demo" &&
      repository.mode === "demo" &&
      email.mode === "demo"
        ? ("demo" as const)
        : ("integrated" as const),
  };
}
