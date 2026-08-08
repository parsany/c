import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Parsa | Personal Portfolio",
  description:
    "Hi, I'm Parsa. I'm a Full-Stack Software Engineer building web apps and distributed backend systems with TypeScript, Next.js, and NestJS.",
  keywords: [
    "Parsa",
    "Software Engineer",
    "TypeScript",
    "Next.js",
    "NestJS",
    "Full-Stack",
    "Portfolio",
  ],
  openGraph: {
    title: "Parsa | Full-Stack Software Engineer",
    description:
      "Hi, I'm Parsa. I'm a Full-Stack Software Engineer building web apps and distributed backend systems with TypeScript, Next.js, and NestJS.",
    type: "website",
  },
  alternates: {
    canonical: "https://parsany.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="dark antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
