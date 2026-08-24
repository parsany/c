import type { Metadata, Viewport } from "next";
import ClientLayout from "@/components/ClientLayout";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Parsa | Full-Stack Software Engineer & Portfolio",
  description:
    "Hi, I'm Parsa. I'm a Full-Stack Software Engineer building web apps and distributed backend systems with TypeScript, Next.js, and NestJS.",
  keywords: [
    "Parsa",
    "Software Engineer",
    "Full-Stack Developer",
    "TypeScript",
    "Next.js",
    "NestJS",
    "React",
    "Portfolio",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Parsa | Full-Stack Software Engineer",
    description:
      "Hi, I'm Parsa. I'm a Full-Stack Software Engineer building web apps and distributed backend systems with TypeScript, Next.js, and NestJS.",
    url: "https://parsany.com",
    siteName: "Parsa Portfolio",
    type: "website",
  },
  alternates: {
    canonical: "https://parsany.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://parsany.com/#person",
      "name": "Parsa",
      "jobTitle": "Full-Stack Software Engineer",
      "url": "https://parsany.com",
      "sameAs": [
        "https://github.com/parsany",
        "https://www.linkedin.com/in/parsany/"
      ],
      "knowsAbout": [
        "TypeScript",
        "Next.js",
        "NestJS",
        "React",
        "Full-Stack Web Development",
        "Machine Learning"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://parsany.com/#website",
      "url": "https://parsany.com",
      "name": "Parsa Portfolio",
      "description":
        "Full-Stack Software Engineer building web applications and distributed backend systems with TypeScript, Next.js, and NestJS.",
      "publisher": {
        "@id": "https://parsany.com/#person"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="dark antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
