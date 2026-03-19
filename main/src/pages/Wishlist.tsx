import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import GroceryNavbar from "@/components/grocery/GroceryNavbar";
import GroceryFooter from "@/components/grocery/GroceryFooter";
import ProductCard from "@/components/grocery/ProductCard";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Wishlist = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const fetch = async () => {
      const { data } = await supabase
        .from("wishlists")
        .select("product_id, products(*)")
        .eq("user_id", user.id);
      setProducts((data || []).map((w: any) => w.products).filter(Boolean));
      setLoading(false);
    };
    fetch();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <GroceryNavbar />
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-primary" size={28} />
          <h1 className="font-heading text-3xl font-bold text-foreground">My Wishlist</h1>
        </div>
        {!user ? (
          <div className="text-center py-20">
            <Heart className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="font-body text-muted-foreground mb-4">Sign in to see your wishlist.</p>
            <Link to="/auth" className="inline-block px-6 py-3 bg-primary text-primary-foreground font-body font-bold text-sm rounded-full hover:bg-primary/90 transition-colors">Sign In</Link>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-4 animate-pulse">
                <div className="aspect-square bg-secondary rounded-lg mb-3" />
                <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
                <div className="h-3 bg-secondary rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="font-body text-muted-foreground mb-4">Your wishlist is empty.</p>
            <Link to="/shop" className="inline-block px-6 py-3 bg-primary text-primary-foreground font-body font-bold text-sm rounded-full hover:bg-primary/90 transition-colors">Browse Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
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
      <GroceryFooter />
    </div>
  );
};

export default Wishlist;
