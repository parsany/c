import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Posts from "@/public/content/materials/PostsPage.json";
import PostDetailClient from "@/components/PostDetailClient";

export async function generateStaticParams() {
  const activePosts = Posts.filter((post) => post.active !== false);
  if (activePosts.length === 0) {
    return [{ id: "_draft" }];
  }
  return activePosts.map((post) => ({
    id: post.slug,
  }));
}

function getPostOgImage(body: string): string {
  const match = body.match(/!\[[^\]]*\]\((\/[^)\s]+)\)/);
  return match ? match[1] : "/og-image.png";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = Posts.find((item) => item.slug === id);
  if (!post || post.active === false) {
    return {
      title: "Post Not Found | Parsa",
    };
  }
  const ogImage = getPostOgImage(post.body || "");
  return {
    title: `${post.title} | Parsa`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://parsany.com/posts/${post.slug}/`,
      siteName: "Parsa Niavand Portfolio",
      type: "article",
      publishedTime: post.date,
      authors: ["Parsa Niavand"],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://parsany.com/posts/${post.slug}/`,
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = Posts.find((item) => item.slug === id);

  if (!post || post.active === false) {
    notFound();
  }

  const ogImage = getPostOgImage(post.body || "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": `https://parsany.com${ogImage}`,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Parsa Niavand",
      "url": "https://parsany.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://parsany.com/posts/${post.slug}/`
    },
    "url": `https://parsany.com/posts/${post.slug}/`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostDetailClient post={post} />
    </>
  );
}

