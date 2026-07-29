import type {
  StorageAdapter,
  UploadFileDescriptor,
  UploadTarget,
} from "./types";
import { sanitizeFileName } from "@/lib/validation/quote";

export class DemoStorageAdapter implements StorageAdapter {
  mode = "demo" as const;

  async createUploadTarget(
    file: UploadFileDescriptor,
    quoteId: string,
  ): Promise<UploadTarget> {
    return {
      originalName: file.originalName,
      storageKey: `demo/${quoteId}/${crypto.randomUUID()}-${sanitizeFileName(file.originalName)}`,
      size: file.size,
      type: file.type,
      strategy: "demo",
    };
  }

  async createSecureUrl() {
    return undefined;
  }
}
