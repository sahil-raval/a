import { Link } from "wouter";

const articles = [
  {
    id: 1,
    title: "Understanding GIA Certificate Comments",
    date: "March 15, 2026",
    excerpt: "The true value of a diamond often lies in what the certificate comments reveal. A deep dive into interpreting GIA dossiers for investment potential.",
    category: "Expertise"
  },
  {
    id: 2,
    title: "IF to FL: The Hidden Opportunity in Diamond Grading",
    date: "February 28, 2026",
    excerpt: "How precise evaluation and masterful recutting can elevate an Internally Flawless stone to fully Flawless, unlocking significant premiums.",
    category: "Investment"
  },
  {
    id: 3,
    title: "Lab-Grown vs Natural: An Investment Perspective",
    date: "January 12, 2026",
    excerpt: "Navigating the diverging markets of lab-grown and natural diamonds. Where true long-term value resides for serious buyers.",
    category: "Market Insights"
  },
  {
    id: 4,
    title: "The Evolution of Diamond Sourcing",
    date: "December 05, 2025",
    excerpt: "From 1978 to today: How technology and AI are reshaping how we evaluate, cut, and trade premium stones globally.",
    category: "Innovation"
  }
];

export default function Journal() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-16 text-center">Journal & Insights</h1>
        
        <div className="space-y-12 border-t border-border pt-12">
          {articles.map((article) => (
            <article key={article.id} className="grid md:grid-cols-[1fr_3fr] gap-4 md:gap-12 group pb-12 border-b border-border">
              <div className="text-sm">
                <p className="text-accent uppercase tracking-widest font-medium mb-1">{article.category}</p>
                <p className="text-muted-foreground">{article.date}</p>
              </div>
              <div>
                <Link href={`/journal/${article.id}`}>
                  <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4 group-hover:text-accent transition-colors">
                    {article.title}
                  </h2>
                </Link>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                  {article.excerpt}
                </p>
                <Link 
                  href={`/journal/${article.id}`}
                  className="text-xs uppercase tracking-wider font-medium text-primary hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  Read Full Article <span className="text-accent">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
