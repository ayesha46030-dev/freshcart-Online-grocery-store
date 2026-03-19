import ProductCard from "./ProductCard";
import { bestDeals } from "@/data/products";

const BestDeals = () => (
  <section id="deals" className="py-12 px-6 bg-secondary/30">
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Best Deals <span className="text-muted-foreground">›</span>
        </h2>
        <a href="#deals" className="text-sm font-body text-primary font-semibold hover:underline">
          Browse All Deals ›
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bestDeals.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  </section>
);

export default BestDeals;
