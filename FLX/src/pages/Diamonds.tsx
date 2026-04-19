import { useState } from "react";
import { motion } from "framer-motion";
import { DiamondCard } from "@/components/DiamondCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const sampleDiamonds = [
  { id: 1, shape: "Round Brilliant", image: "/diamond-1.png", carat: "1.52", color: "D", clarity: "VVS1", cut: "Excellent" },
  { id: 2, shape: "Oval Cut", image: "/diamond-2.png", carat: "2.01", color: "E", clarity: "VS1", cut: "Excellent" },
  { id: 3, shape: "Emerald Cut", image: "/diamond-3.png", carat: "3.15", color: "F", clarity: "VVS2", cut: "Excellent" },
  { id: 4, shape: "Pear Cut", image: "/diamond-4.png", carat: "1.80", color: "G", clarity: "VVS1", cut: "Excellent" },
  { id: 5, shape: "Radiant Cut", image: "/diamond-5.png", carat: "2.50", color: "D", clarity: "VS2", cut: "Excellent" },
  { id: 6, shape: "Cushion Cut", image: "/diamond-6.png", carat: "4.00", color: "E", clarity: "VVS2", cut: "Excellent" },
  { id: 7, shape: "Round Brilliant", image: "/diamond-1.png", carat: "1.05", color: "F", clarity: "IF", cut: "Excellent" },
  { id: 8, shape: "Oval Cut", image: "/diamond-2.png", carat: "1.75", color: "D", clarity: "VVS2", cut: "Excellent" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Diamonds() {
  const [selectedDiamond, setSelectedDiamond] = useState<any>(null);

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">Diamond Inventory</h1>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Explore our curated selection of premium GIA certified natural and lab-grown diamonds. 
            For bespoke sourcing requests, please contact our advisory team.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="w-full lg:w-64 shrink-0 space-y-8"
          >
            <div>
              <h3 className="font-medium text-primary mb-4 uppercase tracking-wider text-sm border-b border-border pb-2">Shape</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <label className="flex items-center gap-2"><input type="checkbox" className="rounded-none border-border" data-testid="filter-shape-round" /> Round</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="rounded-none border-border" data-testid="filter-shape-oval" /> Oval</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="rounded-none border-border" data-testid="filter-shape-emerald" /> Emerald</label>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-primary mb-4 uppercase tracking-wider text-sm border-b border-border pb-2">Color</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <label className="flex items-center gap-2"><input type="checkbox" className="rounded-none border-border" data-testid="filter-color-d-f" /> D - F (Colorless)</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="rounded-none border-border" data-testid="filter-color-g-j" /> G - J (Near Colorless)</label>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-none border-primary text-primary" data-testid="btn-apply-filters">Apply Filters</Button>
          </motion.div>

          {/* Grid */}
          <div className="flex-1 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sampleDiamonds.map((d, i) => (
              <motion.div
                key={d.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.05 } }
                }}
              >
                <DiamondCard
                  {...d}
                  onRequestPrice={() => setSelectedDiamond(d)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedDiamond} onOpenChange={() => setSelectedDiamond(null)}>
        <DialogContent className="rounded-none sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Request Price</DialogTitle>
            <DialogDescription>
              Enquire about the {selectedDiamond?.carat}ct {selectedDiamond?.shape}. Our team will respond promptly.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-medium text-primary">Name</label>
              <Input className="rounded-none" placeholder="Full Name" data-testid="dialog-input-name" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-medium text-primary">Company / Email</label>
              <Input className="rounded-none" placeholder="Email Address" type="email" data-testid="dialog-input-email" />
            </div>
            <Button className="w-full rounded-none bg-primary hover:bg-primary/90 text-white h-12 uppercase tracking-wider text-sm mt-4" data-testid="dialog-btn-submit">
              Submit Enquiry
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
