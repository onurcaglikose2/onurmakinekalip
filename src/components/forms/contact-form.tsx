"use client";

import Link from "next/link";
import { Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validation/contact";

type ContactResponse = {
  ok: boolean;
  message: string;
  reference?: string;
};

export function ContactForm() {
  const [response, setResponse] = useState<ContactResponse | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      kvkk: false,
      website: "",
    },
  });

  const submit = async (values: ContactFormValues) => {
    setResponse(null);
    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await result.json()) as ContactResponse;
      setResponse(payload);
      if (payload.ok) reset();
    } catch {
      setResponse({
        ok: false,
        message: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
      });
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate>
      <p className="eyebrow">
        <span aria-hidden="true" />
        Kısa iletişim formu
      </p>
      <h2>Mesaj bırakın</h2>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="contact-name">Ad soyad *</label>
          <input
            id="contact-name"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p className="field-error">{errors.fullName.message}</p>
          ) : null}
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">E-posta *</label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email ? (
            <p className="field-error">{errors.email.message}</p>
          ) : null}
        </div>
        <div className="form-field">
          <label htmlFor="contact-phone">Telefon</label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
          />
        </div>
        <div className="form-field">
          <label htmlFor="contact-subject">Konu *</label>
          <input
            id="contact-subject"
            aria-invalid={Boolean(errors.subject)}
            {...register("subject")}
          />
          {errors.subject ? (
            <p className="field-error">{errors.subject.message}</p>
          ) : null}
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="contact-message">Mesajınız *</label>
          <textarea
            id="contact-message"
            rows={6}
            aria-invalid={Boolean(errors.message)}
            {...register("message")}
          />
          {errors.message ? (
            <p className="field-error">{errors.message.message}</p>
          ) : null}
        </div>
      </div>
      <label className="contact-consent">
        <input type="checkbox" {...register("kvkk")} />
        <span>
          <Link href="/kvkk" target="_blank">
            KVKK Aydınlatma Metni
          </Link>
          ’ni okudum; mesajıma dönüş yapılması için verilerimin işlenmesini
          onaylıyorum. *
        </span>
      </label>
      {errors.kvkk ? (
        <p className="field-error">{errors.kvkk.message}</p>
      ) : null}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Web sitesi</label>
        <input
          id="contact-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
      {response ? (
        <p
          className={response.ok ? "contact-success" : "contact-error"}
          role="status"
        >
          {response.message}
          {response.reference ? ` Referans: ${response.reference}` : ""}
        </p>
      ) : null}
      <button type="submit" disabled={isSubmitting}>
        <Send size={17} aria-hidden="true" />
        {isSubmitting ? "Gönderiliyor" : "Mesajı Gönder"}
      </button>
    </form>
  );
}
