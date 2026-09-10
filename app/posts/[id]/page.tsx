import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Posts from "@/public/content/materials/PostsPage.json";
import PostDetailClient from "@/components/PostDetailClient";

export async function generateStaticParams() {
  return Posts.map((post) => ({
    id: post.slug,
  }));
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
  return {
    title: `${post.title} | Parsa`,
    description: post.description,
    alternates: {
      canonical: `https://parsany.com/posts/${post.slug}`,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Parsa",
      "url": "https://parsany.com"
    },
    "url": `https://parsany.com/posts/${post.slug}`
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

