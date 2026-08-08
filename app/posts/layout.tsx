import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writings | Parsa",
  description:
    "Parsa's writing on software engineering, machine learning experiments, and things I found interesting enough to write up.",
  alternates: {
    canonical: "https://parsany.com/posts",
  },
};

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
