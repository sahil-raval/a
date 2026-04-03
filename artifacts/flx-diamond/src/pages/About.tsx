import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function About() {
  return (
    <div className="bg-background min-h-screen">
      {/* 1. Page Hero */}
      <section className="bg-primary text-white pt-40 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="font-serif text-5xl md:text-7xl mb-6"
          >
            Heritage. Mastery. Quiet Confidence.
          </motion.h1>
        </div>
      </section>

      {/* 2. Babu Vekariya Story */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <img 
              src="/babu-portrait.png" 
              alt="Babu Vekariya, Master Diamond Craftsman" 
              className="w-full h-auto object-cover grayscale-[30%] shadow-2xl"
            />
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <h2 className="font-serif text-4xl text-primary mb-8">The Craftsman's Journey</h2>
            <div className="prose prose-stone text-muted-foreground leading-relaxed">
              <p>
                Our foundation begins with Babu Vekariya, whose journey started in 1978 at the age of 12. 
                What began as passion for the craft became a lifelong mastery of diamonds — from rough to polished, 
                from technical precision to exceptional finishing, and from traditional knowledge to rare problem-solving skill.
              </p>
              <p>
                Over the years, his work and reputation earned the trust of respected industry names including 
                KGK Diamond, Venus Jewellery, Excell Overseas, and other jewellery and watch brands seeking highly 
                specialised custom stones and uncommon diamond solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Our Story */}
      <section className="py-24 bg-muted/30 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-4xl text-primary">Where Heritage Meets Innovation</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            FLXDIAMONDS was built with a clear vision: to bring old-world diamond mastery into a modern, 
            high-precision, high-trust sourcing business. Based in Geelong, Victoria, Australia, we serve serious buyers globally.
          </p>
        </div>
      </section>

      {/* 4. What We Stand For */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <h3 className="font-serif text-2xl text-primary">We Understand Diamonds</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Beyond the certificate. We read the stone, understanding its true potential and hidden value.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <h3 className="font-serif text-2xl text-primary">We Understand Value</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Precision regrinding and strategic sourcing to maximize commercial and investment returns.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <h3 className="font-serif text-2xl text-primary">We Understand Discretion</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Operating as the quiet, trusted partner for serious B2B buyers and private wealth clients.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. Our Promise */}
      <section className="py-24 bg-primary text-white text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl text-white/90 leading-tight">
            "We work as the quiet partner behind the decision — helping serious buyers source with clarity, protect their standards, and move with confidence."
          </h2>
        </div>
      </section>

      {/* 6 & 7. Innovation & B2B */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-primary">Innovation Forward</h2>
            <p className="text-muted-foreground leading-relaxed">
              While our foundation is built on traditional mastery, our operations are powered by modern technology. 
              We utilize advanced AI and ML tools to augment our craftsmanship, ensuring unparalleled precision in 
              evaluation and cutting strategies.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-primary">B2B Partnership Opportunities</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We offer structured partnership opportunities for diamond traders, suppliers, jewellers, and serious 
              industry professionals seeking reliable access to our IF to FL conversion service and premium inventory.
            </p>
            <Link href="/contact">
              <Button className="rounded-none bg-primary hover:bg-primary/90 text-white uppercase tracking-wider text-sm px-8 h-12" data-testid="btn-about-contact">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Closing */}
      <section className="py-24 bg-muted/50 text-center px-6 border-t border-border">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="font-serif text-4xl text-primary">Ready to elevate your sourcing?</h2>
          <Link href="/contact">
            <Button className="rounded-none bg-primary hover:bg-primary/90 text-white uppercase tracking-wider text-sm px-10 h-14" data-testid="btn-about-final-contact">
              Begin the Conversation →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
