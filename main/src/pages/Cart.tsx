import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import GroceryNavbar from "@/components/grocery/GroceryNavbar";
import GroceryFooter from "@/components/grocery/GroceryFooter";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <GroceryNavbar />
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="text-primary" size={28} />
          <h1 className="font-heading text-3xl font-bold text-foreground">Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="font-body text-muted-foreground mb-4">Your cart is empty.</p>
            <Link to="/shop" className="inline-block px-6 py-3 bg-primary text-primary-foreground font-body font-bold text-sm rounded-full hover:bg-primary/90 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
                  <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                    <img src={item.image} alt={item.name} className="max-h-16 max-w-16 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-foreground text-sm truncate">{item.name}</h3>
                    <p className="font-heading font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="font-body font-semibold text-sm w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-heading font-bold text-foreground w-16 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 h-fit shadow-sm">
              <h2 className="font-heading font-bold text-foreground text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 font-body text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span className="text-primary font-semibold">Free</span></div>
                <div className="border-t border-border pt-3 flex justify-between font-heading font-bold text-foreground text-base">
                  <span>Total</span><span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Link to="/checkout" className="mt-6 w-full py-3 bg-primary text-primary-foreground rounded-lg font-body font-bold text-sm hover:bg-primary/90 transition-colors block text-center">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
      <GroceryFooter />
    </div>
  );
};

export default Cart;
