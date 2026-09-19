import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { buildMetadata, getBlogPosts, getBlogCategories } from "@/sanity/queries";
import { BlogCard, formatDate } from "@/components/blog-card";

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(
    { title: "Blog", description: "Insights, guides and news on solar, batteries, EV charging and energy efficiency from APM Energy." },
    "Blog",
    "Insights, guides and news on solar, batteries, EV charging and energy efficiency from APM Energy.",
    "/blog",
  );
}

export default async function BlogIndex() {
  const [posts, categories] = await Promise.all([getBlogPosts(), getBlogCategories()]);
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950" data-testid="blog-page">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Newspaper className="h-4 w-4 text-sky-400" /> APM Energy Blog
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">Energy Insights & Guides</h1>
          <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Practical advice on solar, batteries, EV charging and getting the most from your energy system.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Category filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2.5 justify-center mb-14" data-testid="blog-category-filters">
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-primary text-white shadow-sm" data-testid="category-chip-all">
                All Posts
              </span>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/category/${c.slug}`}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm hover:bg-primary hover:text-white transition-colors"
                  data-testid={`category-chip-${c.slug}`}
                >
                  {c.name} <span className="opacity-60">({c.count})</span>
                </Link>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-24" data-testid="blog-empty">
              <Newspaper className="mx-auto h-12 w-12 text-slate-400" />
              <p className="mt-4 text-lg text-slate-500">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group grid md:grid-cols-2 gap-8 mb-16 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-lg hover:shadow-2xl transition-all"
                  data-testid={`blog-featured-${featured.slug}`}
                >
                  <div className="relative h-64 md:h-full min-h-[280px] overflow-hidden">
                    <Image
                      src={featured.coverImageUrl || "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2064&auto=format&fit=crop"}
                      alt={featured.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {(featured as any).category && (
                      <span className="absolute top-4 left-4 text-xs font-semibold text-white bg-primary/90 backdrop-blur px-3 py-1.5 rounded-full">
                        {(featured as any).category}
                      </span>
                    )}
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(featured.tags || []).slice(0, 3).map((t) => (
                        <span key={t} className="text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-2.5 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">{featured.excerpt}</p>
                    <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{formatDate(featured.publishedAt)}</span>
                      <span>·</span>
                      <span>{featured.author}</span>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                      Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
