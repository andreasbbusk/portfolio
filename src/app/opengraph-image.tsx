import { ImageResponse } from "next/og";

export const alt = "Andreas Busk Mikkelsen portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// OG for now, will change to actual image later.

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background:
            "radial-gradient(circle at 80% 10%, #f97316 0%, #09090a 60%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 74,
            lineHeight: 1,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          Andreas Busk Mikkelsen
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 34,
            lineHeight: 1.2,
            opacity: 0.9,
          }}
        >
          Frontend engineer building modern web experiences
        </div>
      </div>
    ),
    size,
  );
}
