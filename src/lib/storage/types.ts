export type StorageMode = "demo" | "supabase" | "r2";

export type UploadFileDescriptor = {
  originalName: string;
  size: number;
  type: string;
};

export type StoredFile = {
  originalName: string;
  storageKey: string;
  size?: number;
  type?: string;
  secureUrl?: string;
};

export type UploadTarget = StoredFile & {
  strategy: "demo" | "supabase-signed" | "r2-put";
  uploadUrl?: string;
};

export interface StorageAdapter {
  mode: StorageMode;
  createUploadTarget(
    file: UploadFileDescriptor,
    quoteId: string,
  ): Promise<UploadTarget>;
  createSecureUrl(storageKey: string): Promise<string | undefined>;
}
