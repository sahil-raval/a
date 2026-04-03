import { Button } from "@/components/ui/button";

export default function Trade() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-8 text-center">B2B Trade Partnership</h1>
        <div className="prose prose-stone max-w-none">
          <p className="text-lg text-muted-foreground text-center leading-relaxed mb-16">
            FLX Diamonds partners exclusively with established jewellery manufacturers, diamond traders, and retailers. 
            We provide precision sourcing, consistent supply, and expert advisory.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-primary border-b border-border pb-4">Who Can Partner</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Diamond Traders seeking reliable GIA-certified inventory.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Jewellery Manufacturers requiring precise parcels and consistent grading.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>High-end Retailers looking for bespoke sourcing for client requests.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-primary border-b border-border pb-4">The FLX Advantage</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Direct access to primary cutting facilities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Rigorous quality control beyond standard GIA grading.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Specialized expertise in IF to FL conversion opportunities.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-muted/30 p-8 md:p-12 text-center border border-border/50">
            <h3 className="font-serif text-3xl text-primary mb-4">Apply for Trade Account</h3>
            <p className="text-muted-foreground mb-8">Access our full inventory, trade pricing, and advisory services.</p>
            <Button className="rounded-none bg-primary text-white h-14 px-8 uppercase tracking-wider text-sm">
              Begin Application
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
