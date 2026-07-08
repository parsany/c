import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Head from "next/head";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import Posts from "@/public/content/materials/PostsPage.json";

interface PostDetailProps {
  post: any;
  allPosts: any[];
}

export default function PostDetail({ post, allPosts }: PostDetailProps) {
  const router = useRouter();
  const [showOtherBlogs, setShowOtherBlogs] = useState(false);

  if (!post) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm font-mono text-theme-muted">
        Loading...
      </div>
    );
  }

  const estimateReadTime = (body: string) => {
    const words = (body || "").split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const otherPosts = allPosts.filter((p) => p.slug !== post.slug);

  return (
    <article className="max-w-2xl mx-auto py-12">
      <Head>
        <title>{post.title} | Parsa</title>
        <meta name="description" content={post.description} />
      </Head>

      <div className="flex items-center justify-between mb-8">
        <Link
          href="/posts"
          className="inline-flex items-center space-x-2 text-xs font-mono text-theme-muted hover:text-theme-text transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to writings</span>
        </Link>
      </div>

      <header className="space-y-4 mb-8">
        <div className="flex items-center space-x-2 text-xs font-mono text-theme-muted">
          <span className="flex items-center space-x-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(post.date)}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{estimateReadTime(post.body)} min read</span>
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-theme-text">{post.title}</h1>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-theme-accentLight text-theme-accentText border border-theme-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="max-w-none text-theme-secondary text-sm md:text-base leading-relaxed space-y-6">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-xl font-bold text-theme-text mt-8 mb-4 border-b border-theme-border pb-2" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-lg font-semibold text-theme-text mt-6 mb-3" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-base font-semibold text-theme-text mt-5 mb-2" {...props} />
            ),
            p: ({ node, ...props }) => <p className="mb-4 text-theme-secondary leading-relaxed" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-2 text-theme-secondary" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-2 text-theme-secondary" {...props} />,
            li: ({ node, ...props }) => <li className="pl-1" {...props} />,
            code: ({ node, ...props }) => (
              <code className="bg-theme-btnExploreBg text-theme-text border border-theme-border px-1.5 py-0.5 rounded text-xs font-mono" {...props} />
            ),
            pre: ({ node, ...props }) => (
              <pre className="bg-theme-btnExploreBg border border-theme-border rounded-lg p-4 overflow-x-auto text-xs font-mono my-4" {...props} />
            ),
          }}
        >
          {post.body}
        </ReactMarkdown>
      </div>

      <footer className="mt-16 pt-8 border-t border-theme-border flex items-center justify-between text-xs font-mono text-theme-muted">
        <Link href="/" className="hover:text-theme-text transition-colors">
          &larr; Back to home
        </Link>
        <Link href="/posts" className="hover:text-theme-text transition-colors">
          All writings &rarr;
        </Link>
      </footer>
    </article>
  );
}

export async function getStaticPaths() {
  const activePosts = Posts.filter((post) => post.active !== false);
  const paths = activePosts.map((post) => ({
    params: { id: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const post = Posts.find((item) => item.slug === params.id) || null;

  if (!post || post.active === false) {
    return {
      notFound: true,
    };
  }

  const activePosts = Posts.filter((post) => post.active !== false);

  return {
    props: {
      post,
      allPosts: activePosts,
    },
  };
}
