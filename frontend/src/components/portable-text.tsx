import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-5 text-lg">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-5 italic text-slate-600 dark:text-slate-400 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-6 text-lg text-slate-700 dark:text-slate-300 marker:text-primary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-6 text-lg text-slate-700 dark:text-slate-300 marker:text-primary">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-slate-900 dark:text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-sm font-mono">{children}</code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const external = href.startsWith("http");
      return (
        <Link
          href={href}
          className="text-primary underline underline-offset-2 hover:opacity-80"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const url = urlForImage(value);
      if (!url) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
            <Image src={url} alt={value?.alt || ""} fill unoptimized className="object-cover" />
          </div>
          {value?.caption && (
            <figcaption className="mt-2 text-center text-sm text-slate-500">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PortableTextRenderer({ value }: { value: unknown }) {
  if (!value) return null;
  return <PortableText value={value as never} components={components} />;
}
