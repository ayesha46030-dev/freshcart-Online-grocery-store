import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import ProductCard from "./ProductCard";
import { customerFavorites } from "@/data/products";

const CustomerFavorites = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });
  };

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Customer Favorites <span className="text-muted-foreground">›</span>
          </h2>
          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {customerFavorites.map((p) => (
            <div key={p.id} className="min-w-[200px] max-w-[220px] flex-shrink-0">
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFavorites;
