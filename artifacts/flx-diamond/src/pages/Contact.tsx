import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-12 text-center">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div>
            <h2 className="font-serif text-2xl text-primary mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether you are looking to source specific stones, discuss a B2B partnership, 
              or explore investment-grade diamonds, our advisory team is ready to assist.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">Location</p>
                <p className="text-muted-foreground">Surat, Gujarat, India</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">Phone</p>
                <p className="text-muted-foreground">+91 91042 90971</p>
                <p className="text-muted-foreground">+91 99982 17496</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">Email</p>
                <p className="text-muted-foreground">help@flxdiamond.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 border border-border shadow-sm">
            <h3 className="font-serif text-xl text-primary mb-6">Send an Enquiry</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">First Name</label>
                  <Input className="rounded-none border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Last Name</label>
                  <Input className="rounded-none border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                <Input type="email" className="rounded-none border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Company</label>
                <Input className="rounded-none border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
                <Textarea className="rounded-none border-border min-h-[120px]" />
              </div>
              <Button type="submit" className="w-full rounded-none bg-primary text-white h-12 uppercase tracking-wider text-sm mt-4">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
