import { Apple, Milk, Wheat, Fish, Carrot, Cherry, Egg, Coffee } from "lucide-react";
import GroceryNavbar from "@/components/grocery/GroceryNavbar";
import GroceryFooter from "@/components/grocery/GroceryFooter";
import categoriesHero from "@/assets/categories-hero.jpg";

const categories = [
  { icon: Apple, name: "Fruits", count: 124, color: "bg-red-50 text-red-500" },
  { icon: Carrot, name: "Vegetables", count: 98, color: "bg-orange-50 text-orange-500" },
  { icon: Milk, name: "Dairy & Eggs", count: 56, color: "bg-blue-50 text-blue-500" },
  { icon: Wheat, name: "Bakery", count: 43, color: "bg-amber-50 text-amber-600" },
  { icon: Fish, name: "Meat & Seafood", count: 67, color: "bg-cyan-50 text-cyan-600" },
  { icon: Cherry, name: "Frozen Foods", count: 89, color: "bg-purple-50 text-purple-500" },
  { icon: Coffee, name: "Beverages", count: 112, color: "bg-yellow-50 text-yellow-600" },
  { icon: Egg, name: "Organic", count: 78, color: "bg-green-50 text-green-600" },
];

const Categories = () => (
  <div className="min-h-screen bg-background">
    <GroceryNavbar />
    {/* Hero */}
    <div className="relative h-52 md:h-64 overflow-hidden">
      <img src={categoriesHero} alt="Fresh produce" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-background">Shop by Category</h1>
      </div>
    </div>
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <div key={cat.name} className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow cursor-pointer group text-center">
            <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
              <cat.icon size={28} />
            </div>
            <h3 className="font-heading font-bold text-foreground text-sm">{cat.name}</h3>
            <p className="font-body text-xs text-muted-foreground mt-1">{cat.count} products</p>
          </div>
        ))}
      </div>
    </div>
    <GroceryFooter />
  </div>
);

export default Categories;
