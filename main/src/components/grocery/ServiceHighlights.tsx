import { Truck, Leaf, Headphones } from "lucide-react";

const highlights = [
  { icon: Truck, title: "Free Delivery", desc: "On orders over $50" },
  { icon: Leaf, title: "Fresh & Organic", desc: "Products sourced worldwide" },
  { icon: Headphones, title: "24/7 Customer Support", desc: "We're always here for you" },
];

const ServiceHighlights = () => (
  <section className="py-6 border-b border-border bg-card">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {highlights.map((h) => (
        <div
          key={h.title}
          className="flex items-center gap-4 justify-center p-4 rounded-xl"
        >
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <h.icon className="text-primary" size={22} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-foreground text-sm">{h.title}</h3>
            <p className="font-body text-xs text-muted-foreground">{h.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ServiceHighlights;
