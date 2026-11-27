import type { Metadata, Viewport } from "next";
import ClientLayout from "@/components/ClientLayout";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://parsany.com"),
  title: "Parsa Niavand | Full-Stack Software Engineer & Portfolio",
  description:
    "Hi, I'm Parsa Niavand. I'm a Full-Stack Software Engineer building web apps and distributed backend systems with TypeScript, Next.js, and NestJS.",
  keywords: [
    "Parsa Niavand",
    "Parsa",
    "Software Engineer",
    "Full-Stack Developer",
    "TypeScript",
    "Next.js",
    "NestJS",
    "React",
    "Portfolio",
    "Web Development",
    "Freelance Developer",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Parsa Niavand | Full-Stack Software Engineer",
    description:
      "Hi, I'm Parsa Niavand. I'm a Full-Stack Software Engineer building web apps and distributed backend systems with TypeScript, Next.js, and NestJS.",
    url: "https://parsany.com/",
    siteName: "Parsa Niavand Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Parsa Niavand — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parsa Niavand | Full-Stack Software Engineer",
    description:
      "Hi, I'm Parsa Niavand. I'm a Full-Stack Software Engineer building web apps and distributed backend systems with TypeScript, Next.js, and NestJS.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://parsany.com/",
    types: {
      "text/plain": [
        { url: "https://parsany.com/llms.txt", title: "LLMs Context" },
        { url: "https://parsany.com/llms-full.txt", title: "LLMs Full Context" },
      ],
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://parsany.com/#person",
      "name": "Parsa Niavand",
      "givenName": "Parsa",
      "familyName": "Niavand",
      "jobTitle": "Full-Stack Software Engineer",
      "description":
        "Full-Stack Software Engineer specializing in TypeScript, Next.js, NestJS, and distributed backend systems. Building production-grade web applications and real-time systems.",
      "url": "https://parsany.com",
      "email": "vvsparsa@gmail.com",
      "image": "https://parsany.com/content/portrait.jpg",
      "sameAs": [
        "https://github.com/parsany",
        "https://www.linkedin.com/in/parsany/",
        "https://t.me/parsanid"
      ],
      "knowsAbout": [
        "TypeScript",
        "JavaScript",
        "Next.js",
        "NestJS",
        "React",
        "Node.js",
        "PostgreSQL",
        "Redis",
        "Prisma ORM",
        "Turborepo",
        "Socket.io",
        "tRPC",
        "Full-Stack Web Development",
        "Distributed Systems",
        "Real-time Applications",
        "Machine Learning",
        "PyTorch",
        "Convolutional Neural Networks",
        "Autoencoders",
        "REST APIs",
        "WebSockets",
        "Docker",
        "Python",
        "Tailwind CSS"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Full-Stack Software Engineer",
        "skills": "TypeScript, Next.js, NestJS, React, PostgreSQL, Redis, Socket.io, Python, Machine Learning"
      },
      "offers": {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full-Stack Web Development",
          "description": "Custom web application development using Next.js, NestJS, TypeScript, and modern infrastructure."
        }
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://parsany.com/#website",
      "url": "https://parsany.com",
      "name": "Parsa Niavand — Full-Stack Software Engineer",
      "description":
        "Portfolio of Parsa Niavand, a Full-Stack Software Engineer building web applications and distributed backend systems with TypeScript, Next.js, and NestJS.",
      "publisher": {
        "@id": "https://parsany.com/#person"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://parsany.com/projects?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://parsany.com/#profilepage",
      "url": "https://parsany.com",
      "name": "Parsa Niavand — Portfolio",
      "description":
        "Professional portfolio of Parsa Niavand, Full-Stack Software Engineer. View projects, CV, and contact information.",
      "mainEntity": {
        "@id": "https://parsany.com/#person"
      },
      "isPartOf": {
        "@id": "https://parsany.com/#website"
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
        <meta property="og:logo" content="https://parsany.com/apple-icon.png" />
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
