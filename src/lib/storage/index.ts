import { DemoStorageAdapter } from "./demo";
import { R2StorageAdapter } from "./r2";
import { SupabaseStorageAdapter } from "./supabase";
import type { StorageAdapter } from "./types";

export function createStorageAdapter(): StorageAdapter {
  const {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_QUOTE_BUCKET,
    R2_ENDPOINT,
    R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME,
  } = process.env;

  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && SUPABASE_QUOTE_BUCKET) {
    return new SupabaseStorageAdapter(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      SUPABASE_QUOTE_BUCKET,
    );
  }

  if (
    R2_ENDPOINT &&
    R2_ACCESS_KEY_ID &&
    R2_SECRET_ACCESS_KEY &&
    R2_BUCKET_NAME
  ) {
    return new R2StorageAdapter({
      endpoint: R2_ENDPOINT,
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
      bucket: R2_BUCKET_NAME,
    });
  }

  return new DemoStorageAdapter();
}

export type {
  StorageAdapter,
  StorageMode,
  StoredFile,
  UploadFileDescriptor,
  UploadTarget,
} from "./types";
