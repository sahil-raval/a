import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { buildMetadata, getBlogPost, getAllBlogSlugs, getRelatedPosts, categorySlug } from "@/sanity/queries";
import { siteUrl } from "@/sanity/env";
import { PortableTextRenderer } from "@/components/portable-text";
import { BlogCard } from "@/components/blog-card";

export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return buildMetadata(
    (post as any).seo,
    post.title,
    post.excerpt || "",
    `/blog/${slug}`,
  );
}

function formatDate(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const related = await getRelatedPosts(slug, 3);
  const category = (post as any).category as string | undefined;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: post.author || "APM Energy" },
    publisher: { "@type": "Organization", name: "APM Energy" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${slug}` },
    keywords: (post as any).seo?.keywords?.join(", "),
  };

  return (
    <article className="min-h-screen bg-white dark:bg-slate-950" data-testid="blog-post-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <header className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-slate-900 text-white overflow-hidden">
        {post.coverImageUrl && (
          <>
            <Image src={post.coverImageUrl} alt={post.title} fill unoptimized className="object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-900" />
          </>
        )}
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white mb-6" data-testid="blog-back-link">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <div className="flex flex-wrap gap-2 mb-5">
            {category && (
              <Link
                href={`/blog/category/${categorySlug(category)}`}
                className="text-xs font-semibold uppercase tracking-wide text-white bg-primary px-2.5 py-1 rounded-full hover:opacity-90"
                data-testid="post-category-link"
              >
                {category}
              </Link>
            )}
            {(post.tags || []).map((t) => (
              <span key={t} className="text-xs font-semibold uppercase tracking-wide text-sky-300 bg-white/10 px-2.5 py-1 rounded-full">{t}</span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">{post.title}</h1>
          <div className="mt-6 flex items-center gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span>By {post.author}</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {post.excerpt && (
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 font-light border-l-4 border-primary pl-6">
              {post.excerpt}
            </p>
          )}
          <div className="prose-lg">
            <PortableTextRenderer value={(post as any).body} />
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-primary text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to power your home smarter?</h2>
            <p className="text-blue-100 mb-6">Get a free, no-obligation quote from our team of accredited experts.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-bold px-6 py-3 hover:bg-slate-100 transition-colors">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-16 md:py-20" data-testid="related-posts">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">
              You might also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
