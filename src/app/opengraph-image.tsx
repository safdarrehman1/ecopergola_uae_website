import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

export const runtime = "nodejs";
export const alt = "Eco Pergola — Premium Aluminum & Glass Fabrication Dubai";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0E1512",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(31, 77, 58, 0.6) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(184, 137, 90, 0.4) 0%, transparent 50%)",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          color: "#F5F1EA",
        }}
      >
        {/* Brand Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              backgroundColor: "#1F4D3A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "30px",
              fontWeight: "bold",
              border: "2px solid rgba(184, 137, 90, 0.4)",
            }}
          >
            EP
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "34px",
                fontWeight: "bold",
                color: "#FFFFFF",
                letterSpacing: "-0.5px",
              }}
            >
              {siteConfig.name}
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#B8895A",
                textTransform: "uppercase",
                letterSpacing: "3px",
              }}
            >
              Dubai • UAE
            </span>
          </div>
        </div>

        {/* Center Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: "800",
              color: "#FFFFFF",
              lineHeight: "1.15",
              letterSpacing: "-1px",
            }}
          >
            Premium Aluminum & Glass Fabrication
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#C9CED2",
              lineHeight: "1.4",
            }}
          >
            Transforming Dubai&apos;s Skyline with Excellence • Over 10+ Years of Architectural Innovation
          </div>
        </div>

        {/* Footer Metrics */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "40px", fontSize: "16px", color: "#B8895A", fontWeight: "600" }}>
            <span>500+ Projects Completed</span>
            <span>•</span>
            <span>ISO Certified Quality</span>
            <span>•</span>
            <span>UAE Market Leader</span>
          </div>
          <div style={{ fontSize: "16px", color: "#C9CED2" }}>ecopergola.ae</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
