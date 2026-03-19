import { useState } from "react";
import { Search, User, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/categories" },
  { label: "Deals", to: "/deals" },
  { label: "Orders", to: "/orders" },
  { label: "Contact", to: "/contact" },
];

const GroceryNavbar = () => {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-card shadow-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl font-heading font-bold text-primary">🥬 FreshCart</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm font-body font-medium text-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center bg-secondary rounded-full px-4 py-2 flex-1 max-w-md mx-4">
          <Search size={18} className="text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Search for groceries..."
            className="bg-transparent outline-none text-sm font-body text-foreground w-full placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link to={user ? "/account" : "/auth"} className="text-foreground hover:text-primary transition-colors hidden sm:block">
            <User size={20} />
          </Link>
          <Link to="/wishlist" className="text-foreground hover:text-primary transition-colors hidden sm:block">
            <Heart size={20} />
          </Link>
          <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="lg:hidden text-foreground ml-1" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-card border-t border-border px-4 pb-4 space-y-3">
          <div className="flex items-center bg-secondary rounded-full px-4 py-2 md:hidden">
            <Search size={18} className="text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
            />
          </div>
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block text-sm font-body font-medium text-foreground hover:text-primary py-1"
            >
              {l.label}
            </Link>
          ))}
          {!user && (
            <Link to="/auth" onClick={() => setOpen(false)} className="block text-sm font-body font-semibold text-primary py-1">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default GroceryNavbar;
