import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loading... | Paradigma",
};

export default function LoadingPage() {
  return (
    <div className="animation_page">
      <div className="loader"></div>
    </div>
  );
}
