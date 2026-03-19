import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const GroceryFooter = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-foreground text-background py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-heading text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 font-body text-sm opacity-80">
            <li><a href="#" className="hover:opacity-100 transition-opacity">Home</a></li>
            <li><a href="#shop" className="hover:opacity-100 transition-opacity">Shop</a></li>
            <li><a href="#deals" className="hover:opacity-100 transition-opacity">Deals</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">About Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg font-bold mb-4">Support</h3>
          <ul className="space-y-2 font-body text-sm opacity-80">
            <li><a href="#" className="hover:opacity-100 transition-opacity">FAQ</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Shipping Policy</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Returns</a></li>
            <li><a href="#contact" className="hover:opacity-100 transition-opacity">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg font-bold mb-4">Categories</h3>
          <ul className="space-y-2 font-body text-sm opacity-80">
            <li><a href="#" className="hover:opacity-100 transition-opacity">Fruits & Vegetables</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Dairy & Eggs</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Bakery</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Meat & Seafood</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg font-bold mb-4">Newsletter</h3>
          <p className="font-body text-sm opacity-80 mb-3">
            Subscribe for exclusive deals and updates.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) {
                toast.success("Subscribed successfully!");
                setEmail("");
              }
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-3 py-2 rounded-lg text-sm text-foreground bg-background outline-none placeholder:text-muted-foreground"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-3 mt-4">
            <Facebook size={18} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
            <Twitter size={18} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
            <Instagram size={18} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
            <Youtube size={18} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-6 border-t border-background/20 text-center">
        <p className="font-body text-xs opacity-60">
          © {new Date().getFullYear()} FreshCart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default GroceryFooter;
