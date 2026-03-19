import { useEffect, useState } from "react";
import { Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import GroceryNavbar from "@/components/grocery/GroceryNavbar";
import GroceryFooter from "@/components/grocery/GroceryFooter";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const statusConfig: Record<string, { icon: any; color: string; label: string }> = {
  pending: { icon: Clock, color: "text-yellow-500 bg-yellow-50", label: "Pending" },
  confirmed: { icon: CheckCircle, color: "text-blue-500 bg-blue-50", label: "Confirmed" },
  delivering: { icon: Truck, color: "text-primary bg-primary/10", label: "On the Way" },
  delivered: { icon: CheckCircle, color: "text-primary bg-primary/10", label: "Delivered" },
  cancelled: { icon: XCircle, color: "text-destructive bg-destructive/10", label: "Cancelled" },
};

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const fetch = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setOrders(data || []);
      setLoading(false);
    };
    fetch();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <GroceryNavbar />
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Package className="text-primary" size={28} />
          <h1 className="font-heading text-3xl font-bold text-foreground">My Orders</h1>
        </div>
        {!user ? (
          <div className="text-center py-20">
            <Package className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="font-body text-muted-foreground mb-4">Sign in to see your orders.</p>
            <Link to="/auth" className="inline-block px-6 py-3 bg-primary text-primary-foreground font-body font-bold text-sm rounded-full hover:bg-primary/90 transition-colors">Sign In</Link>
          </div>
        ) : loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-6 animate-pulse">
                <div className="h-5 bg-secondary rounded w-1/3 mb-3" />
                <div className="h-4 bg-secondary rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Clock className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="font-body text-muted-foreground mb-2">No orders yet.</p>
            <p className="font-body text-sm text-muted-foreground mb-6">Start shopping to see your orders here!</p>
            <Link to="/shop" className="inline-block px-6 py-3 bg-primary text-primary-foreground font-body font-bold text-sm rounded-full hover:bg-primary/90 transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const cfg = statusConfig[order.status] || statusConfig.pending;
              const Icon = cfg.icon;
              return (
                <div key={order.id} className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="font-body text-xs text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
                      <p className="font-body text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold ${cfg.color}`}>
                      <Icon size={14} /> {cfg.label}
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {(order.order_items || []).map((item: any) => (
                      <div key={item.id} className="flex items-center gap-3">
                        {item.product_image && <img src={item.product_image} alt={item.product_name} className="w-10 h-10 object-contain bg-secondary rounded" />}
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm text-foreground truncate">{item.product_name}</p>
                          <p className="font-body text-xs text-muted-foreground">×{item.quantity}</p>
                        </div>
                        <span className="font-heading text-sm font-bold text-foreground">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-body text-sm text-muted-foreground">Total</span>
                    <span className="font-heading font-bold text-foreground">${Number(order.total).toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <GroceryFooter />
    </div>
  );
};

export default Orders;
