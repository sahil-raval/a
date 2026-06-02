import { getIcon } from "@/sanity/icons";
import type { HomeContent } from "@/sanity/fallbacks";

interface FeaturesProps {
  title: string;
  subtitle: string;
  features: HomeContent["features"];
}

export function Features({ title, subtitle, features }: FeaturesProps) {
  return (
    <section
      className="py-16 sm:py-24 bg-white dark:bg-slate-950"
      data-testid="features-section"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4 rounded-full bg-primary/10 text-primary mb-6">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
