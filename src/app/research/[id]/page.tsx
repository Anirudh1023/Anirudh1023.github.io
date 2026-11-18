import type { Metadata } from "next";
import { siteContent } from "@/content/site";
import ThreadPageClient from "./ThreadPageClient";

const THREAD_ALIASES: Record<string, string> = {
  "beyond-backprop": "beyond-backpropagation",
  "speech": "speech-representations",
  "collaborative": "collaborative-inference",
  "heterogeneous": "heterogeneous-execution",
  "multimodal": "active-multimodal-reasoning",
};

export function generateStaticParams() {
  const ids = siteContent.researchThreads.map((t) => ({ id: t.id }));
  const aliases = [
    { id: "beyond-backprop" },
    { id: "speech" },
    { id: "collaborative" },
    { id: "heterogeneous" },
    { id: "multimodal" },
  ];
  return [...ids, ...aliases];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const resolvedId = THREAD_ALIASES[id] || id;
  const thread = siteContent.researchThreads.find((t) => t.id === resolvedId);

  if (!thread) {
    return {
      title: "Research Threads | Anirudh Bocha",
    };
  }

  const title = `${thread.title} | Research Threads | Anirudh Bocha`;
  const description = `${thread.question} ${thread.homepageDesc}`;

  return {
    title,
    description,
    openGraph: {
      title: `${thread.title} | Anirudh Bocha`,
      description,
      type: "article",
      url: `https://Anirudh1023.github.io/research/${thread.id}`,
      siteName: "Anirudh Bocha Research",
    },
    twitter: {
      card: "summary_large_image",
      title: `${thread.title} | Anirudh Bocha`,
      description,
    },
  };
}

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ThreadPageClient id={id} />;
}
