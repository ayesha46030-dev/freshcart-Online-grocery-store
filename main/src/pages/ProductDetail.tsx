import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, ArrowLeft, Minus, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import GroceryNavbar from "@/components/grocery/GroceryNavbar";
import GroceryFooter from "@/components/grocery/GroceryFooter";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data } = await supabase.from("products").select("*").eq("id", id).single();
      setProduct(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  useEffect(() => {
    if (!user || !id) return;
    supabase.from("wishlists").select("id").eq("user_id", user.id).eq("product_id", id).maybeSingle()
      .then(({ data }) => setWishlisted(!!data));
  }, [user, id]);

  const toggleWishlist = async () => {
    if (!user) { toast.error("Please sign in to add to wishlist"); return; }
    if (wishlisted) {
      await supabase.from("wishlists").delete().eq("user_id", user.id).eq("product_id", id);
      setWishlisted(false);
      toast.success("Removed from wishlist");
    } else {
      await supabase.from("wishlists").insert({ user_id: user.id, product_id: id });
      setWishlisted(true);
      toast.success("Added to wishlist");
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < qty; i++) {
      addToCart({ id: product.id, name: product.name, price: Number(product.price), image: product.image_url });
    }
    toast.success(`Added ${qty}x ${product.name} to cart`);
  };

  if (loading) return (
    <div className="min-h-screen bg-background">
      <GroceryNavbar />
      <div className="container mx-auto px-6 py-12 animate-pulse">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-square bg-secondary rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 bg-secondary rounded w-3/4" />
            <div className="h-4 bg-secondary rounded w-1/2" />
            <div className="h-10 bg-secondary rounded w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-background">
      <GroceryNavbar />
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="font-body text-muted-foreground">Product not found.</p>
        <Link to="/shop" className="text-primary font-semibold hover:underline mt-2 inline-block">Back to Shop</Link>
      </div>
      <GroceryFooter />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <GroceryNavbar />
      <div className="container mx-auto px-6 py-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm font-body text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft size={16} /> Back to Shop
        </Link>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-card rounded-2xl border border-border p-8 flex items-center justify-center aspect-square relative">
            {product.discount && (
              <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-lg">
                -{product.discount}% OFF
              </span>
            )}
            <img src={product.image_url} alt={product.name} className="max-h-full max-w-full object-contain" />
          </div>
          <div className="space-y-5">
            <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-body rounded-full">{product.category}</span>
            <h1 className="font-heading text-3xl font-bold text-foreground">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-body">({product.reviews_count?.toLocaleString()} reviews)</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-3xl font-bold text-primary">${Number(product.price).toFixed(2)}</span>
              {product.original_price && (
                <span className="font-body text-lg text-muted-foreground line-through">${Number(product.original_price).toFixed(2)}</span>
              )}
            </div>
            {product.description && (
              <p className="font-body text-muted-foreground leading-relaxed">{product.description}</p>
            )}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-secondary transition-colors"><Minus size={16} /></button>
                <span className="px-4 py-2 font-body font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-secondary transition-colors"><Plus size={16} /></button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-lg font-body font-bold text-sm hover:bg-primary/90 transition-colors">
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button onClick={toggleWishlist} className={`p-3 rounded-lg border transition-colors ${wishlisted ? "bg-accent/10 border-accent text-accent" : "border-border text-muted-foreground hover:bg-secondary"}`}>
                <Heart size={18} className={wishlisted ? "fill-current" : ""} />
              </button>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-body text-foreground">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {product.in_stock ? "In Stock — Ready for delivery" : "Out of Stock"}
              </div>
              <p className="text-xs font-body text-muted-foreground">Free delivery on orders over $50</p>
            </div>
          </div>
        </div>
      </div>
      <GroceryFooter />
    </div>
  );
};

export default ProductDetail;
