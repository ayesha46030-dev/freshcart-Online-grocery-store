import GroceryNavbar from "@/components/grocery/GroceryNavbar";
import GroceryFooter from "@/components/grocery/GroceryFooter";
import ProductCard from "@/components/grocery/ProductCard";
import { bestDeals, featuredProducts } from "@/data/products";
import dealsHero from "@/assets/deals-hero.jpg";

const Deals = () => (
  <div className="min-h-screen bg-background">
    <GroceryNavbar />
    {/* Hero */}
    <div className="relative h-52 md:h-64 overflow-hidden">
      <img src={dealsHero} alt="Deals" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/70 flex flex-col items-center justify-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">Today's Best Deals</h1>
        <p className="font-body text-primary-foreground/80 mt-2">Save big on fresh groceries every day</p>
      </div>
    </div>
    <div className="container mx-auto px-6 py-12">
      <h2 className="font-heading text-2xl font-bold text-foreground mb-6">🔥 Flash Deals</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {bestDeals.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-6">More Savings</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {featuredProducts.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
    <GroceryFooter />
  </div>
);

export default Deals;
