import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Investment() {
  return (
    <div className="bg-background pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-8 text-center">Diamonds as an Asset Class</h1>
          
          <div className="prose prose-stone max-w-none">
            <p className="text-lg text-muted-foreground text-center leading-relaxed mb-16">
              For serious investors seeking tangible wealth preservation, FLX Diamonds offers bespoke advisory and sourcing for investment-grade stones.
            </p>

            <div className="bg-[#02274A] text-white p-8 md:p-12 mb-16 border-t-4 border-accent shadow-xl">
              <h2 className="font-serif text-3xl mb-6 text-white">The IF → FL Opportunity</h2>
              <p className="text-white/80 leading-relaxed mb-6">
                One of our strongest areas of expertise is working on Internally Flawless (IF) to Flawless (FL) diamond conversion opportunities. 
                Based on deep analysis of GIA certificate comments, we identify stones with technical potential for upgrade.
              </p>
              <p className="text-white/80 leading-relaxed">
                By carefully recutting these specific stones while maintaining the same carat weight bracket wherever technically achievable, 
                we unlock significant value premiums for our investment partners.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="border border-border p-6 text-center bg-white hover:border-accent transition-colors">
                <h4 className="font-serif text-xl text-primary mb-4">Wealth Preservation</h4>
                <p className="text-sm text-muted-foreground">Tangible, highly concentrated value resistant to inflation and currency fluctuations.</p>
              </div>
              <div className="border border-border p-6 text-center bg-white hover:border-accent transition-colors">
                <h4 className="font-serif text-xl text-primary mb-4">Rarity Premium</h4>
                <p className="text-sm text-muted-foreground">Focusing on D-Flawless and rare fancy colored diamonds with historically proven appreciation.</p>
              </div>
              <div className="border border-border p-6 text-center bg-white hover:border-accent transition-colors">
                <h4 className="font-serif text-xl text-primary mb-4">Private Advisory</h4>
                <p className="text-sm text-muted-foreground">Discreet sourcing, valuation, and liquidation strategies for private wealth clients.</p>
              </div>
            </div>

            <div className="text-center">
              <Button className="rounded-none bg-primary hover:bg-primary/90 text-white h-14 px-8 uppercase tracking-wider text-sm" data-testid="btn-investment-consultation">
                Schedule Investment Consultation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
