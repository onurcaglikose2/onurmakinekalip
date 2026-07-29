import type { QuoteFormValues } from "@/lib/validation/quote";
import type { StoredFile } from "@/lib/storage";

type QuoteRecord = {
  id: string;
  form: QuoteFormValues;
  files: StoredFile[];
  createdAt: string;
  storageMode: string;
};

export async function saveQuote(record: QuoteRecord) {
  const baseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!baseUrl || !serviceKey) return { mode: "demo" as const };

  const response = await fetch(`${baseUrl}/rest/v1/quote_requests`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      request_id: record.id,
      full_name: record.form.fullName,
      company_name: record.form.companyName,
      phone: record.form.phone,
      email: record.form.email,
      request_type: record.form.requestType,
      quantity: record.form.quantity,
      description: record.form.description,
      material: record.form.material || null,
      requested_delivery_date: record.form.deliveryDate || null,
      dimensions: record.form.dimensions || null,
      city: record.form.city || null,
      sample_available: record.form.sampleAvailable,
      confidentiality_requested: record.form.confidentiality,
      contact_preference: record.form.contactPreference,
      marketing_consent: record.form.marketingConsent,
      storage_mode: record.storageMode,
      files: record.files.map((file) => ({
        name: file.originalName,
        key: file.storageKey,
      })),
      created_at: record.createdAt,
    }),
  });

  if (!response.ok) {
    throw new Error("Teklif kaydı veritabanına yazılamadı.");
  }

  return { mode: "supabase" as const };
}
