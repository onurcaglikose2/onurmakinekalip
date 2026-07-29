import {
  Component,
  FileScan,
  Maximize,
  Repeat2,
  RotateCw,
  ScanLine,
} from "lucide-react";
import type { Capability } from "@/content/capabilities";

const icons = {
  maximize: Maximize,
  scan: ScanLine,
  rotate: RotateCw,
  component: Component,
  file: FileScan,
  repeat: Repeat2,
};

export function CapabilityIcon({
  name,
  size = 24,
}: {
  name: Capability["icon"];
  size?: number;
}) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" size={size} strokeWidth={1.5} />;
}
