import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anirudh Bocha | Machine Learning Engineer",
  description: "Machine Learning Engineer at Samsung Research India. Work spans LLM fine-tuning and inference, speculative decoding, runtime systems, and speech processing.",
  keywords: ["Anirudh Bocha", "Machine Learning", "ML Engineer", "Samsung Research", "On-Device Training", "Zeroth-Order Optimization", "LLM Adaptation", "Speech Processing"],
  authors: [{ name: "Anirudh Bocha", url: "https://Anirudh1023.github.io" }],
  creator: "Anirudh Bocha",
  metadataBase: new URL("https://Anirudh1023.github.io"),
  openGraph: {
    type: "website",
    url: "https://Anirudh1023.github.io",
    title: "Anirudh Bocha | Machine Learning Engineer",
    description: "Machine Learning Engineer at Samsung Research India. Work spans LLM fine-tuning and inference, speculative decoding, runtime systems, and speech processing.",
    siteName: "Anirudh Bocha Research",
    images: [{ url: "/profile.jpg", width: 800, height: 800, alt: "Anirudh Bocha" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anirudh Bocha | Machine Learning Engineer",
    description: "Machine Learning Engineer at Samsung Research India. Work spans LLM fine-tuning and inference, speculative decoding, runtime systems, and speech processing.",
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
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+O+3F/e6dM2b82oMxg4A" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
