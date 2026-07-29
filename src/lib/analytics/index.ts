"use client";

export type AnalyticsEvent =
  | "quote_form_view"
  | "quote_form_start"
  | "quote_form_validation_error"
  | "quote_form_submit"
  | "quote_form_success"
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  | "machine_detail_view"
  | "project_filter_use"
  | "file_upload_start"
  | "file_upload_success";

type GtagWindow = Window & {
  gtag?: (
    command: "event",
    eventName: AnalyticsEvent,
    params?: Record<string, string | number | boolean>,
  ) => void;
};

export function track(
  eventName: AnalyticsEvent,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", eventName, params);
}
