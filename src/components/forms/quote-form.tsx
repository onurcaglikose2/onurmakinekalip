"use client";

import Link from "next/link";
import {
  Check,
  FileCheck2,
  FileUp,
  LoaderCircle,
  LockKeyhole,
  Paperclip,
  Trash2,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type DragEvent,
} from "react";
import { useForm } from "react-hook-form";
import { TurnstileWidget } from "./turnstile-widget";
import { acceptedFileFormats } from "@/content/company";
import { track } from "@/lib/analytics";
import {
  contactPreferences,
  maxFileCount,
  quoteSchema,
  requestTypes,
  validateFile,
  type QuoteFormValues,
} from "@/lib/validation/quote";

type ApiResponse = {
  ok: boolean;
  quoteId?: string;
  message: string;
  errors?: Record<string, string[]>;
};

type UploadTarget = {
  originalName: string;
  storageKey: string;
  size: number;
  type: string;
  strategy: "demo" | "supabase-signed" | "r2-put";
  uploadUrl?: string;
};

type UploadPlanResponse = {
  ok: boolean;
  message?: string;
  uploadToken?: string;
  targets?: UploadTarget[];
};

export function QuoteForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [progress, setProgress] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState<ApiResponse | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [started, setStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    track("quote_form_view");
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      phone: "",
      email: "",
      requestType: undefined,
      quantity: "",
      description: "",
      material: "",
      deliveryDate: "",
      dimensions: "",
      city: "",
      sampleAvailable: false,
      confidentiality: false,
      contactPreference: "Fark etmez",
      kvkk: false,
      marketingConsent: false,
      website: "",
      turnstileToken: "",
    },
  });

  const markStarted = () => {
    if (!started) {
      setStarted(true);
      track("quote_form_start");
    }
  };

  const addFiles = useCallback(
    (incoming: File[]) => {
      setFileError("");
      const combined = [...files, ...incoming];
      if (combined.length > maxFileCount) {
        setFileError("En fazla 5 dosya yükleyebilirsiniz.");
        return;
      }
      for (const file of incoming) {
        const result = validateFile(file);
        if (!result.valid) {
          setFileError(result.message);
          return;
        }
      }
      setFiles(combined);
      if (incoming.length) track("file_upload_start");
    },
    [files],
  );

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    addFiles(Array.from(event.dataTransfer.files));
  };

  const onSubmit = async (values: QuoteFormValues) => {
    setSubmitError("");
    setProgress(0);
    track("quote_form_submit");

    try {
      let uploadToken = "";

      if (files.length > 0) {
        track("file_upload_start", { count: files.length });
        const plan = await requestUploadPlan(
          files,
          values.website,
          turnstileToken,
        );
        if (!plan.ok || !plan.uploadToken || !plan.targets) {
          throw new Error(
            plan.message || "Güvenli dosya yükleme bağlantısı oluşturulamadı.",
          );
        }
        setProgress(5);
        await uploadFiles(files, plan.targets, setProgress);
        uploadToken = plan.uploadToken;
        track("file_upload_success", { count: files.length });
      } else {
        setProgress(90);
      }

      setProgress(95);
      const response = await submitQuote({
        ...values,
        turnstileToken,
        uploadToken,
      });
      if (!response.ok) {
        setSubmitError(response.message);
        setTimeout(() => errorSummaryRef.current?.focus(), 0);
        return;
      }
      setSuccess(response);
      setProgress(100);
      setFiles([]);
      reset();
      setTurnstileToken("");
      track("quote_form_success");
    } catch (error) {
      setSubmitError(
        error instanceof Error &&
          error.message &&
          error.message !== "Failed to fetch"
          ? error.message
          : "Talebiniz şu anda gönderilemedi. Lütfen bağlantınızı kontrol edip tekrar deneyin.",
      );
      setTimeout(() => errorSummaryRef.current?.focus(), 0);
    }
  };

  const onInvalid = () => {
    setSubmitError("Lütfen işaretli zorunlu alanları kontrol edin.");
    track("quote_form_validation_error");
    setTimeout(() => errorSummaryRef.current?.focus(), 0);
  };

  if (success?.ok) {
    return (
      <div className="quote-success" role="status" aria-live="polite">
        <div className="success-icon">
          <Check aria-hidden="true" />
        </div>
        <p>Teklif talebiniz kaydedildi</p>
        <h2>Talebiniz alındı.</h2>
        <p>
          Teknik ekibimiz dosyanızı inceleyerek mümkün olan en kısa sürede
          sizinle iletişime geçecektir.
        </p>
        <div>
          <span>Talep numaranız</span>
          <strong>{success.quoteId}</strong>
        </div>
        <small>Takip için bu numarayı not almanızı öneririz.</small>
        <button
          type="button"
          onClick={() => {
            setSuccess(null);
            setStarted(false);
            setProgress(0);
            setTurnstileToken("");
          }}
        >
          Yeni bir talep oluştur
        </button>
      </div>
    );
  }

  const fieldError = (name: keyof QuoteFormValues) =>
    errors[name]?.message ? String(errors[name]?.message) : undefined;

  return (
    <form
      className="quote-form"
      onSubmit={(event) => {
        void handleSubmit(onSubmit, onInvalid)(event);
      }}
      onFocusCapture={markStarted}
      noValidate
    >
      <div className="form-heading">
        <span>01 / İLETİŞİM</span>
        <h2>Önce sizi tanıyalım</h2>
        <p>Zorunlu alanlar * ile işaretlenmiştir.</p>
      </div>

      {submitError ? (
        <div
          ref={errorSummaryRef}
          className="form-error-summary"
          role="alert"
          tabIndex={-1}
        >
          <strong>Form gönderilemedi</strong>
          <p>{submitError}</p>
        </div>
      ) : null}

      <div className="form-grid">
        <Field
          label="Ad soyad"
          required
          error={fieldError("fullName")}
          id="fullName"
        >
          <input
            id="fullName"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
        </Field>
        <Field
          label="Firma adı"
          required
          error={fieldError("companyName")}
          id="companyName"
        >
          <input
            id="companyName"
            autoComplete="organization"
            aria-invalid={Boolean(errors.companyName)}
            aria-describedby={
              errors.companyName ? "companyName-error" : undefined
            }
            {...register("companyName")}
          />
        </Field>
        <Field label="Telefon" required error={fieldError("phone")} id="phone">
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder="05xx xxx xx xx"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
        </Field>
        <Field label="E-posta" required error={fieldError("email")} id="email">
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
        </Field>
        <Field label="Şehir" id="city">
          <input
            id="city"
            autoComplete="address-level2"
            {...register("city")}
          />
        </Field>
        <Field label="Tercih edilen iletişim" id="contactPreference">
          <select id="contactPreference" {...register("contactPreference")}>
            {contactPreferences.map((preference) => (
              <option key={preference}>{preference}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="form-divider" />
      <div className="form-heading">
        <span>02 / ÜRETİM İHTİYACI</span>
        <h2>Parçayı tarif edin</h2>
      </div>
      <div className="form-grid">
        <Field
          label="Talep türü"
          required
          error={fieldError("requestType")}
          id="requestType"
        >
          <select
            id="requestType"
            defaultValue=""
            aria-invalid={Boolean(errors.requestType)}
            aria-describedby={
              errors.requestType ? "requestType-error" : undefined
            }
            {...register("requestType")}
          >
            <option value="" disabled>
              Seçiniz
            </option>
            {requestTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field
          label="Üretim adedi"
          required
          error={fieldError("quantity")}
          id="quantity"
        >
          <input
            id="quantity"
            placeholder="Örn. 1 adet, 50 adet/ay"
            aria-invalid={Boolean(errors.quantity)}
            aria-describedby={errors.quantity ? "quantity-error" : undefined}
            {...register("quantity")}
          />
        </Field>
        <Field label="Malzeme" id="material">
          <input
            id="material"
            placeholder="Örn. 6061 alüminyum"
            {...register("material")}
          />
        </Field>
        <Field label="Yaklaşık parça ölçüsü" id="dimensions">
          <input
            id="dimensions"
            placeholder="Örn. 300 × 180 × 25 mm"
            {...register("dimensions")}
          />
        </Field>
        <Field label="İstenen teslim tarihi" id="deliveryDate">
          <input id="deliveryDate" type="date" {...register("deliveryDate")} />
        </Field>
        <div className="form-options">
          <label>
            <input type="checkbox" {...register("sampleAvailable")} />
            <span>Fiziksel numune mevcut</span>
          </label>
          <label>
            <input type="checkbox" {...register("confidentiality")} />
            <span>Gizlilik talebim var</span>
          </label>
        </div>
        <Field
          label="Üretim ihtiyacının açıklaması"
          required
          error={fieldError("description")}
          id="description"
          wide
          hint="Parçanın kullanım alanını, kritik noktalarını ve varsa özel beklentilerinizi yazın."
        >
          <textarea
            id="description"
            rows={7}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? "description-error" : "description-hint"
            }
            {...register("description")}
          />
        </Field>
      </div>

      <div className="form-divider" />
      <div className="form-heading">
        <span>03 / DOSYALAR</span>
        <h2>Teknik veriyi paylaşın</h2>
        <p>
          En fazla 5 dosya, dosya başına 25 MB. {acceptedFileFormats.join(", ")}
        </p>
      </div>
      <div
        className={`file-dropzone${fileError ? "has-error" : ""}`}
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
      >
        <FileUp size={30} aria-hidden="true" />
        <div>
          <strong>Dosyaları buraya sürükleyin</strong>
          <span>veya cihazınızdan seçin</span>
        </div>
        <button type="button" onClick={() => inputRef.current?.click()}>
          Dosya seç
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp,.dxf,.dwg,.step,.stp,.iges,.igs,.zip"
          onChange={(event) => {
            addFiles(Array.from(event.target.files ?? []));
            event.target.value = "";
          }}
          aria-label="Teknik dosya seç"
        />
      </div>
      {fileError ? (
        <p className="field-error" role="alert">
          {fileError}
        </p>
      ) : null}
      {files.length ? (
        <ul className="selected-files" aria-label="Seçilen dosyalar">
          {files.map((file, index) => (
            <li key={`${file.name}-${file.lastModified}`}>
              <Paperclip size={16} aria-hidden="true" />
              <span>
                <strong>{file.name}</strong>
                <small>{formatBytes(file.size)}</small>
              </span>
              <button
                type="button"
                onClick={() =>
                  setFiles((current) =>
                    current.filter((_, fileIndex) => fileIndex !== index),
                  )
                }
                aria-label={`${file.name} dosyasını kaldır`}
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {isSubmitting ? (
        <div
          className="upload-progress"
          role="progressbar"
          aria-label="Teklif gönderim ilerlemesi"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div>
            <span style={{ width: `${progress}%` }} />
          </div>
          <p>Talebiniz güvenli biçimde gönderiliyor: %{progress}</p>
        </div>
      ) : null}

      <div className="form-divider" />
      <div className="consent-fields">
        <label className={errors.kvkk ? "has-error" : undefined}>
          <input
            type="checkbox"
            aria-invalid={Boolean(errors.kvkk)}
            aria-describedby={errors.kvkk ? "kvkk-error" : undefined}
            {...register("kvkk")}
          />
          <span>
            <Link href="/kvkk" target="_blank">
              KVKK Aydınlatma Metni
            </Link>
            ’ni okudum; verilerimin teklif değerlendirmesi amacıyla işlenmesini
            onaylıyorum. *
          </span>
        </label>
        {errors.kvkk ? (
          <p id="kvkk-error" className="field-error">
            {String(errors.kvkk.message)}
          </p>
        ) : null}
        <label>
          <input type="checkbox" {...register("marketingConsent")} />
          <span>
            Kampanya ve duyurular için iletişim izni veriyorum. (Opsiyonel)
          </span>
        </label>
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Web sitesi</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <TurnstileWidget
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        onVerify={setTurnstileToken}
      />

      <div className="form-submit-row">
        <div>
          <LockKeyhole size={17} aria-hidden="true" />
          <span>
            Dosyalarınız herkese açık değildir ve yalnızca teklif
            değerlendirmesi için kullanılır.
          </span>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="spin" aria-hidden="true" />
              Gönderiliyor
            </>
          ) : (
            <>
              <FileCheck2 aria-hidden="true" />
              Teklif Talebini Gönder
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  required = false,
  error,
  hint,
  wide = false,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  hint?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`form-field${wide ? "form-field-wide" : ""}`}>
      <label htmlFor={id}>
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <small id={`${id}-hint`} className="field-hint">
          {hint}
        </small>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function requestUploadPlan(
  files: File[],
  website: string | undefined,
  turnstileToken: string,
) {
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      website: website ?? "",
      turnstileToken,
      files: files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    }),
  });
  const result = (await response.json()) as UploadPlanResponse;
  return result;
}

async function uploadFiles(
  files: File[],
  targets: UploadTarget[],
  onProgress: (value: number) => void,
) {
  if (files.length !== targets.length) {
    throw new Error("Dosya yükleme planı doğrulanamadı.");
  }

  const totalBytes = files.reduce((total, file) => total + file.size, 0);
  let completedBytes = 0;

  for (const [index, file] of files.entries()) {
    const target = targets[index];
    if (!target) throw new Error("Dosya yükleme hedefi bulunamadı.");
    const completedBeforeFile = completedBytes;

    if (target.strategy !== "demo") {
      await uploadFile(file, target, (loaded) => {
        const uploaded = Math.min(totalBytes, completedBeforeFile + loaded);
        onProgress(5 + Math.round((uploaded / totalBytes) * 85));
      });
    }

    completedBytes += file.size;
    onProgress(5 + Math.round((completedBytes / totalBytes) * 85));
  }
}

function uploadFile(
  file: File,
  target: UploadTarget,
  onProgress: (loaded: number) => void,
) {
  return new Promise<void>((resolve, reject) => {
    if (!target.uploadUrl) {
      reject(new Error("Güvenli dosya yükleme adresi bulunamadı."));
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", target.uploadUrl);
    xhr.upload.onprogress = (event) => {
      onProgress(Math.min(file.size, event.loaded));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else
        reject(
          new Error(
            `${file.name} güvenli depolama alanına yüklenemedi. Lütfen tekrar deneyin.`,
          ),
        );
    };
    xhr.onerror = () =>
      reject(
        new Error(
          `${file.name} yüklenirken bağlantı hatası oluştu. Lütfen tekrar deneyin.`,
        ),
      );

    if (target.strategy === "r2-put") {
      xhr.setRequestHeader(
        "Content-Type",
        file.type || "application/octet-stream",
      );
      xhr.send(file);
      return;
    }

    const formData = new FormData();
    xhr.setRequestHeader("x-upsert", "false");
    formData.append("cacheControl", "3600");
    formData.append("", file);
    xhr.send(formData);
  });
}

async function submitQuote(
  payload: QuoteFormValues & {
    turnstileToken: string;
    uploadToken: string;
  },
) {
  const response = await fetch("/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = (await response.json()) as ApiResponse;
  return result;
}
