import { sanitizeFileName } from "@/lib/validation/quote";
import type {
  StorageAdapter,
  UploadFileDescriptor,
  UploadTarget,
} from "./types";

export class SupabaseStorageAdapter implements StorageAdapter {
  mode = "supabase" as const;

  constructor(
    private readonly baseUrl: string,
    private readonly serviceKey: string,
    private readonly bucket: string,
  ) {}

  async createUploadTarget(
    file: UploadFileDescriptor,
    quoteId: string,
  ): Promise<UploadTarget> {
    const storageKey = `${quoteId}/${crypto.randomUUID()}-${sanitizeFileName(file.originalName)}`;
    const objectPath = `${this.bucket}/${storageKey}`;
    const headers = {
      Authorization: `Bearer ${this.serviceKey}`,
      apikey: this.serviceKey,
    };

    const signedUpload = await fetch(
      `${this.baseUrl}/storage/v1/object/upload/sign/${encodePath(objectPath)}`,
      {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
          "x-upsert": "false",
        },
        body: "{}",
      },
    );

    if (!signedUpload.ok) {
      throw new Error("Güvenli dosya yükleme adresi oluşturulamadı.");
    }

    const result = (await signedUpload.json()) as { url?: string };
    if (!result.url) {
      throw new Error("Güvenli dosya yükleme adresi alınamadı.");
    }

    const uploadUrl = result.url.startsWith("http")
      ? result.url
      : new URL(`/storage/v1${result.url}`, this.baseUrl).toString();

    return {
      originalName: file.originalName,
      storageKey,
      size: file.size,
      type: file.type,
      strategy: "supabase-signed",
      uploadUrl,
    };
  }

  async createSecureUrl(storageKey: string) {
    const objectPath = `${this.bucket}/${storageKey}`;
    const headers = {
      Authorization: `Bearer ${this.serviceKey}`,
      apikey: this.serviceKey,
    };
    const signed = await fetch(
      `${this.baseUrl}/storage/v1/object/sign/${encodePath(objectPath)}`,
      {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ expiresIn: 60 * 60 * 24 * 7 }),
      },
    );
    const signedResult = (await signed.json()) as { signedURL?: string };

    if (!signed.ok || !signedResult.signedURL) return undefined;
    return new URL(signedResult.signedURL, this.baseUrl).toString();
  }
}

function encodePath(path: string) {
  return path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}
