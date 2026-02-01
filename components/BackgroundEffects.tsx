"use client";

export default function BackgroundEffects() {
  return (
    <>
      {/* Grid Pattern */}
      <div className="bg-grid" aria-hidden="true" />

      {/* Gradient Blobs */}
      <div
        className="bg-gradient-blur bg-blob-1"
        style={{ top: "-200px", left: "-200px", background: "#6366f1" }}
        aria-hidden="true"
      />
      <div
        className="bg-gradient-blur bg-blob-2"
        style={{ top: "40%", right: "-300px", background: "#ec4899" }}
        aria-hidden="true"
      />
      <div
        className="bg-gradient-blur bg-blob-3"
        style={{ bottom: "10%", left: "20%", background: "#06b6d4" }}
        aria-hidden="true"
      />
    </>
  );
}
