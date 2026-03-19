import { Truck, ShieldCheck, Percent, Headphones } from "lucide-react";
import patternBg from "@/assets/pattern-bg.png";

const benefits = [
  { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery available" },
  { icon: ShieldCheck, title: "Best Quality", desc: "Handpicked fresh products" },
  { icon: Percent, title: "Big Savings", desc: "Daily deals & discounts" },
  { icon: Headphones, title: "24/7 Support", desc: "We're here to help" },
];

const StoreBenefits = () => (
  <section className="relative py-10 px-6 bg-card border-t border-border overflow-hidden">
    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '350px' }} />
    <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
      {benefits.map((b) => (
        <div key={b.title} className="flex items-center gap-3 justify-center">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <b.icon className="text-primary" size={20} />
          </div>
          <div>
            <h4 className="font-heading font-bold text-foreground text-sm">{b.title}</h4>
            <p className="font-body text-xs text-muted-foreground">{b.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default StoreBenefits;
