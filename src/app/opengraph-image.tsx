import { ImageResponse } from "next/og";

export const alt = "Onur Makine Kalıp — CNC işleme ve talaşlı imalat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#0b0f14",
        color: "#f8fafc",
        display: "flex",
        fontFamily: "sans-serif",
        height: "100%",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(214,154,90,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(214,154,90,.12) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          inset: 0,
          position: "absolute",
        }}
      />
      <div
        style={{
          borderLeft: "8px solid #b87333",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "64px",
          padding: "24px 0 24px 54px",
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ color: "#d69a5a", display: "flex", fontSize: 24 }}>
          CNC İŞLEME • TORNA • FREZE • ÖZEL ÜRETİM
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-3px",
              lineHeight: 1.05,
              maxWidth: 920,
            }}
          >
            Büyük Parçada Güç. Küçük Parçada Hassasiyet.
          </div>
          <div
            style={{
              color: "#aeb6c2",
              display: "flex",
              fontSize: 28,
              marginTop: 28,
            }}
          >
            ONUR MAKİNE KALIP — İSTANBUL
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
