import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import type { BlogPostContent } from "@/sanity/fallbacks";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2064&auto=format&fit=crop";

export function formatDate(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-AU", { year: "numeric", month: "short", day: "numeric" });
}

export function BlogCard({ post }: { post: BlogPostContent }) {
  const tags = (post as any).tags as string[] | undefined;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all"
      data-testid={`blog-card-${post.slug}`}
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={post.coverImageUrl || FALLBACK_IMG}
          alt={post.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {(post as any).category && (
          <span className="absolute top-3 left-3 text-xs font-semibold text-white bg-primary/90 backdrop-blur px-2.5 py-1 rounded-full">
            {(post as any).category}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {(tags || []).slice(0, 2).map((t) => (
            <span key={t} className="text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3 flex-1">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{post.author}</span>
        </div>
      </div>
    </Link>
  );
}
