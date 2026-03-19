import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import GroceryNavbar from "@/components/grocery/GroceryNavbar";
import GroceryFooter from "@/components/grocery/GroceryFooter";
import ProductCard from "@/components/grocery/ProductCard";
import { supabase } from "@/integrations/supabase/client";

const categories = ["All", "Fruits", "Vegetables", "Dairy", "Bakery", "Beverages", "Pantry"];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    fetchProducts();
  }, [category, sort]);

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase.from("products").select("*");
    if (category !== "All") query = query.eq("category", category);
    if (sort === "price_asc") query = query.order("price", { ascending: true });
    else if (sort === "price_desc") query = query.order("price", { ascending: false });
    else if (sort === "rating") query = query.order("rating", { ascending: false });
    else query = query.order("created_at", { ascending: false });

    const { data } = await query;
    setProducts(data || []);
    setLoading(false);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <GroceryNavbar />
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Shop All Products</h1>
          <div className="flex items-center bg-secondary rounded-full px-4 py-2 w-full md:max-w-sm">
            <Search size={18} className="text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm font-body text-foreground w-full placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="md:w-56 shrink-0">
            <div className="bg-card rounded-2xl border border-border p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal size={16} className="text-primary" />
                <h3 className="font-heading font-bold text-foreground text-sm">Filters</h3>
              </div>
              <div className="space-y-2">
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">Category</p>
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                      category === c ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="mt-6 space-y-2">
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">Sort By</p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-secondary text-sm font-body text-foreground outline-none"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border p-4 animate-pulse">
                    <div className="aspect-square bg-secondary rounded-lg mb-3" />
                    <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
                    <div className="h-3 bg-secondary rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-body text-muted-foreground">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    image={p.image_url}
                    price={Number(p.price)}
                    originalPrice={p.original_price ? Number(p.original_price) : undefined}
                    rating={Number(p.rating)}
                    reviews={p.reviews_count}
                    discount={p.discount ?? undefined}
                    category={p.category}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <GroceryFooter />
    </div>
  );
};

export default Shop;
