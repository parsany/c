import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writings | Parsa",
  description:
    "Parsa's writing on software engineering, machine learning experiments, and things I found interesting enough to write up.",
  openGraph: {
    title: "Writings | Parsa",
    description:
      "Parsa's writing on software engineering, machine learning experiments, and things I found interesting enough to write up.",
    url: "https://parsany.com/posts/",
    siteName: "Parsa Niavand Portfolio",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Parsa Niavand — Writings" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writings | Parsa",
    description:
      "Parsa's writing on software engineering, machine learning experiments, and things I found interesting enough to write up.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://parsany.com/posts/",
  },
};

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
