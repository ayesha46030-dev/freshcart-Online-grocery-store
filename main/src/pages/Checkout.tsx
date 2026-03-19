import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, Phone, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import GroceryNavbar from "@/components/grocery/GroceryNavbar";
import GroceryFooter from "@/components/grocery/GroceryFooter";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { items, totalPrice, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please sign in to place an order"); navigate("/auth"); return; }
    if (items.length === 0) { toast.error("Your cart is empty"); return; }
    setSubmitting(true);

    const { data: order, error } = await supabase.from("orders").insert({
      user_id: user.id,
      total: totalPrice,
      shipping_address: address,
      phone,
      notes,
      status: "pending",
    }).select().single();

    if (error || !order) { toast.error("Failed to place order"); setSubmitting(false); return; }

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      product_image: item.image,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) { toast.error("Failed to save order items"); setSubmitting(false); return; }

    // Clear cart
    items.forEach((item) => removeFromCart(item.id));
    toast.success("Order placed successfully! 🎉");
    navigate("/orders");
    setSubmitting(false);
  };

  if (items.length === 0) return (
    <div className="min-h-screen bg-background">
      <GroceryNavbar />
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="font-body text-muted-foreground mb-4">Your cart is empty.</p>
        <Link to="/shop" className="inline-block px-6 py-3 bg-primary text-primary-foreground font-body font-bold text-sm rounded-full hover:bg-primary/90 transition-colors">
          Go Shopping
        </Link>
      </div>
      <GroceryFooter />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <GroceryNavbar />
      <div className="container mx-auto px-6 py-8">
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm font-body text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft size={16} /> Back to Cart
        </Link>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Info */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="font-heading font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-primary" /> Delivery Address
              </h2>
              <textarea
                placeholder="Enter your full delivery address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-secondary text-sm font-body text-foreground placeholder:text-muted-foreground outline-none resize-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="font-heading font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                <Phone size={18} className="text-primary" /> Contact Information
              </h2>
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="font-heading font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-primary" /> Order Notes (optional)
              </h2>
              <textarea
                placeholder="Any special instructions for your delivery?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-lg bg-secondary text-sm font-body text-foreground placeholder:text-muted-foreground outline-none resize-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-card rounded-2xl border border-border p-6 h-fit shadow-sm sticky top-24">
            <h2 className="font-heading font-bold text-foreground text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-contain bg-secondary rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-foreground truncate">{item.name}</p>
                    <p className="font-body text-xs text-muted-foreground">×{item.quantity}</p>
                  </div>
                  <span className="font-heading font-bold text-sm text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2 font-body text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span className="text-primary font-semibold">Free</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-heading font-bold text-foreground text-base">
                <span>Total</span><span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full py-3 bg-primary text-primary-foreground rounded-lg font-body font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
      <GroceryFooter />
    </div>
  );
};

export default Checkout;
