import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anirudh Bocha | Machine Learning Engineer",
  description: "Machine Learning Engineer at Samsung Research building systems where computation is a runtime decision. Focused on on-device LLM adaptation, zeroth-order optimization, and efficient inference.",
  keywords: ["Anirudh Bocha", "Machine Learning", "ML Engineer", "Samsung Research", "On-Device Training", "Zeroth-Order Optimization", "LLM Adaptation", "Speech Processing"],
  authors: [{ name: "Anirudh Bocha", url: "https://Anirudh1023.github.io" }],
  creator: "Anirudh Bocha",
  metadataBase: new URL("https://Anirudh1023.github.io"),
  openGraph: {
    type: "website",
    url: "https://Anirudh1023.github.io",
    title: "Anirudh Bocha | Machine Learning Engineer",
    description: "Machine Learning Engineer at Samsung Research building systems where computation is a runtime decision.",
    siteName: "Anirudh Bocha Research",
    images: [{ url: "/profile.jpg", width: 800, height: 800, alt: "Anirudh Bocha" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anirudh Bocha | Machine Learning Engineer",
    description: "Machine Learning Engineer at Samsung Research building systems where computation is a runtime decision.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
