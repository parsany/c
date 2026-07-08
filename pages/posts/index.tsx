import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Search, Calendar, Clock, ArrowLeft } from "lucide-react";
import Posts from "@/public/content/materials/PostsPage.json";

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

export default function BlogArchive() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const estimateReadTime = (body: string) => {
    const words = (body || "").split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const activePosts = Posts.filter((post) => post.active !== false);

  const allTags = Array.from(new Set(activePosts.flatMap((post) => post.tags)));

  const filteredPosts = activePosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Head>
        <title>Writings | Parsa</title>
        <meta
          name="description"
          content="Parsa's writing on software engineering, machine learning experiments, and things I found interesting enough to write up."
        />
      </Head>

      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-mono text-theme-muted hover:text-theme-text transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to home</span>
      </Link>

      <header className="space-y-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-theme-text">Writings</h1>
        <p className="text-theme-secondary text-sm">
          Things I built, broke, and eventually figured out.
        </p>
      </header>

      <div className="space-y-6 mb-10">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-theme-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-theme-btnExploreBg border border-theme-border rounded-lg text-theme-text placeholder-theme-muted outline-none focus:border-theme-accent transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 select-none">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-all border ${selectedTag === null
              ? "bg-theme-accent text-white dark:text-theme-bg border-theme-accent font-bold"
              : "bg-theme-btnExploreBg text-theme-muted border-theme-border hover:border-theme-accent/60"
              }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-all border ${selectedTag === tag
                ? "bg-theme-accent text-white dark:text-theme-bg border-theme-accent font-bold"
                : "bg-theme-btnExploreBg text-theme-muted border-theme-border hover:border-theme-accent/60"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {filteredPosts.length === 0 ? (
          <p className="text-sm font-mono text-theme-muted py-8 text-center border border-dashed border-theme-border rounded-lg">
            No articles match your criteria.
          </p>
        ) : (
          filteredPosts.map((post) => {
            const readTime = estimateReadTime(post.body);
            return (
              <article
                key={post.id}
                onClick={() => router.push(`/posts/${post.slug}`)}
                className="group flex flex-col space-y-2.5 cursor-pointer pb-6 border-b border-theme-border last:border-0"
              >
                <div className="flex items-center space-x-2 text-[10px] font-mono text-theme-muted">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(post.date)}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{readTime}m read</span>
                  </span>
                </div>

                <h2 className="text-lg font-bold text-theme-text group-hover:text-theme-accent transition-colors leading-tight">
                  {post.title}
                </h2>

                <p className="text-theme-secondary text-sm leading-relaxed line-clamp-2">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[9px] font-mono font-semibold rounded bg-theme-accentLight text-theme-accentText border border-theme-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
