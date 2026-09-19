import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Tag } from "lucide-react";
import { buildMetadata, getBlogCategories, getPostsByCategory } from "@/sanity/queries";
import { BlogCard } from "@/components/blog-card";

export const revalidate = 30;

export async function generateStaticParams() {
  const categories = await getBlogCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const { name } = await getPostsByCategory(category);
  return buildMetadata(
    { title: `${name} Articles`, description: `Browse APM Energy blog posts about ${name}.` },
    `${name} Articles`,
    `Browse APM Energy blog posts about ${name} — guides, tips and news.`,
    `/blog/category/${category}`,
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const [{ name, posts }, categories] = await Promise.all([
    getPostsByCategory(category),
    getBlogCategories(),
  ]);
  if (!posts.length) notFound();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950" data-testid="blog-category-page">
      <section className="relative py-24 md:py-28 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-slate-900" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white mb-6" data-testid="category-back-link">
            <ArrowLeft className="h-4 w-4" /> All Posts
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Tag className="h-4 w-4 text-sky-400" /> Category
          </div>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">{name}</h1>
          <p className="mt-3 text-slate-300">{posts.length} {posts.length === 1 ? "article" : "articles"}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-2.5 justify-center mb-14">
            <Link href="/blog" className="px-4 py-2 rounded-full text-sm font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm hover:bg-primary hover:text-white transition-colors">
              All Posts
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition-colors ${
                  c.slug === category
                    ? "bg-primary text-white"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white"
                }`}
              >
                {c.name} <span className="opacity-60">({c.count})</span>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
