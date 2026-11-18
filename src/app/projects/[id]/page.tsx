// Server component — provides generateStaticParams & generateMetadata for static export
import type { Metadata } from "next";
import { siteContent, ResearchProject } from "@/content/site";
import ProjectPageClient from "./ProjectPageClient";

const ALIASES: Record<string, string> = {
  "whispered-speech": "wesper",
  "speech-disfluency": "speech-reps",
  "cpu-npu-training": "cpu-npu",
  "zo": "subspace-zo",
  "hybrid": "hybrid-llm-inference",
  "waveform": "waveform-wizard",
  "nfuse": "n-fuse",
};

export function generateStaticParams() {
  const ids = siteContent.projects.map((p) => ({ id: p.id }));
  // Add brief alias paths so both URL variants statically generate cleanly
  const aliases = [
    { id: "whispered-speech" },
    { id: "speech-disfluency" },
    { id: "cpu-npu-training" },
    { id: "zo" },
    { id: "hybrid" },
    { id: "waveform" },
    { id: "nfuse" },
  ];
  return [...ids, ...aliases];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const resolvedId = ALIASES[id] || id;
  const project = siteContent.projects.find((p) => p.id === resolvedId);

  if (!project) {
    return {
      title: "Research | Anirudh Bocha",
    };
  }

  const title = `${project.title} | Anirudh Bocha`;
  const description =
    project.claim ||
    (project.article?.intro ? project.article.intro.slice(0, 160) + "..." : "Research project by Anirudh Bocha");

  return {
    title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: "article",
      url: `https://Anirudh1023.github.io/projects/${project.id}`,
      siteName: "Anirudh Bocha Research",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProjectPageClient id={id} />;
}
