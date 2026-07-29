import { createHash, createHmac } from "node:crypto";
import { sanitizeFileName } from "@/lib/validation/quote";
import type {
  StorageAdapter,
  UploadFileDescriptor,
  UploadTarget,
} from "./types";

type R2Config = {
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
};

export class R2StorageAdapter implements StorageAdapter {
  mode = "r2" as const;

  constructor(private readonly config: R2Config) {}

  async createUploadTarget(
    file: UploadFileDescriptor,
    quoteId: string,
  ): Promise<UploadTarget> {
    const storageKey = `${quoteId}/${crypto.randomUUID()}-${sanitizeFileName(file.originalName)}`;
    const contentType = file.type || "application/octet-stream";
    return {
      originalName: file.originalName,
      storageKey,
      size: file.size,
      type: file.type,
      strategy: "r2-put",
      uploadUrl: createPresignedUrl(
        "PUT",
        storageKey,
        10 * 60,
        this.config,
        contentType,
      ),
    };
  }

  async createSecureUrl(storageKey: string) {
    return createPresignedUrl("GET", storageKey, 60 * 60 * 24 * 7, this.config);
  }
}

function hmac(key: string | Buffer, value: string) {
  return createHmac("sha256", key).update(value).digest();
}

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function encodeSegment(value: string) {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function createPresignedUrl(
  method: "GET" | "PUT",
  storageKey: string,
  expires: number,
  config: R2Config,
  contentType?: string,
) {
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const region = "auto";
  const service = "s3";
  const scope = `${dateStamp}/${region}/${service}/aws4_request`;
  const endpoint = new URL(config.endpoint);
  const path = `/${encodeSegment(config.bucket)}/${storageKey
    .split("/")
    .map(encodeSegment)
    .join("/")}`;

  const query = new URLSearchParams({
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": `${config.accessKeyId}/${scope}`,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": String(Math.min(expires, 604800)),
    "X-Amz-SignedHeaders": contentType ? "content-type;host" : "host",
  });
  const canonicalQuery = Array.from(query.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${encodeSegment(key)}=${encodeSegment(value)}`)
    .join("&");
  const canonicalHeaders = contentType
    ? `content-type:${contentType}\nhost:${endpoint.host}\n`
    : `host:${endpoint.host}\n`;
  const signedHeaders = contentType ? "content-type;host" : "host";
  const canonicalRequest = [
    method,
    path,
    canonicalQuery,
    canonicalHeaders,
    signedHeaders,
    "UNSIGNED-PAYLOAD",
  ].join("\n");
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    scope,
    hash(canonicalRequest),
  ].join("\n");
  const dateKey = hmac(`AWS4${config.secretAccessKey}`, dateStamp);
  const regionKey = hmac(dateKey, region);
  const serviceKey = hmac(regionKey, service);
  const signingKey = hmac(serviceKey, "aws4_request");
  const signature = createHmac("sha256", signingKey)
    .update(stringToSign)
    .digest("hex");

  return `${endpoint.origin}${path}?${canonicalQuery}&X-Amz-Signature=${signature}`;
}
