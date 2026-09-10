"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Posts from "@/public/content/materials/PostsPage.json";
import { useLanguage } from "@/context/LanguageContext";

interface Post {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  body: string;
  active?: boolean;
}

export default function LatestWritings() {
  const { t } = useLanguage();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    const sorted = [...Posts]
      .filter((post) => post.active !== false)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
    setRecentPosts(sorted as Post[]);
  }, []);

  return (
    <section className="pt-8 md:pt-12 pb-12 border-b border-theme-border" id="writings">
      <h2 className="text-xl font-bold tracking-tight text-theme-text mb-6">{t.writings.sectionTitle}</h2>
      <ul className="space-y-4 pl-1 mb-6">
        {recentPosts.map((post) => (
          <li key={post.id} className="flex items-start space-x-3">
            <span className="text-theme-accent text-[8px] mt-2 select-none">■</span>
            <Link
              href={`/posts/${post.slug}`}
              className="text-theme-secondary hover:text-theme-accent transition-colors border-b border-theme-border/60 hover:border-theme-accent leading-relaxed text-sm md:text-base"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/posts"
        className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-theme-accent hover:text-theme-accentHover transition-colors"
      >
        <span>{t.writings.viewAll}</span>
        <ArrowRight className="h-3 w-3" />
      </Link>
    </section>
  );
}

