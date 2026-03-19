import { useState, useEffect } from "react";
import { User, Package, Heart, MapPin, CreditCard, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import GroceryNavbar from "@/components/grocery/GroceryNavbar";
import GroceryFooter from "@/components/grocery/GroceryFooter";

const menuItems = [
  { icon: Package, label: "My Orders", desc: "Track and manage your orders", link: "/orders" },
  { icon: Heart, label: "Wishlist", desc: "Your saved items", link: "/wishlist" },
  { icon: MapPin, label: "Delivery Addresses", desc: "Manage your addresses" },
  { icon: CreditCard, label: "Payment Methods", desc: "Manage payment options" },
];

const Account = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ full_name: string; phone: string } | null>(null);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name, phone").eq("id", user.id).single()
      .then(({ data }) => {
        if (data) {
          setProfile(data);
          setFullName(data.full_name || "");
          setPhone(data.phone || "");
        }
      });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update({ full_name: fullName, phone, updated_at: new Date().toISOString() }).eq("id", user.id);
    if (error) toast.error("Failed to update profile");
    else {
      toast.success("Profile updated!");
      setProfile({ full_name: fullName, phone });
      setEditing(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("Signed out successfully");
  };

  if (!user) return (
    <div className="min-h-screen bg-background">
      <GroceryNavbar />
      <div className="container mx-auto px-6 py-20 text-center">
        <User className="mx-auto text-muted-foreground mb-4" size={48} />
        <p className="font-body text-muted-foreground mb-4">Sign in to view your account.</p>
        <Link to="/auth" className="inline-block px-6 py-3 bg-primary text-primary-foreground font-body font-bold text-sm rounded-full hover:bg-primary/90 transition-colors">Sign In</Link>
      </div>
      <GroceryFooter />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <GroceryNavbar />
      <div className="container mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">My Account</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 text-center shadow-sm">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <User className="text-primary" size={40} />
              </div>
              {editing ? (
                <div className="space-y-3">
                  <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full px-3 py-2 rounded-lg bg-secondary text-sm font-body text-foreground outline-none text-center" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full px-3 py-2 rounded-lg bg-secondary text-sm font-body text-foreground outline-none text-center" />
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-body font-bold">Save</button>
                    <button onClick={() => setEditing(false)} className="flex-1 py-2 border border-border rounded-lg text-sm font-body">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-heading font-bold text-foreground text-lg">{profile?.full_name || "User"}</h2>
                  <p className="font-body text-sm text-muted-foreground">{user.email}</p>
                  {profile?.phone && <p className="font-body text-sm text-muted-foreground">{profile.phone}</p>}
                  <button onClick={() => setEditing(true)} className="mt-3 text-primary text-sm font-body font-semibold hover:underline">Edit Profile</button>
                </>
              )}
              <button onClick={handleSignOut} className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border text-sm font-body text-muted-foreground hover:bg-secondary transition-colors">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
          <div className="md:col-span-2 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.link || "#"}
                className="flex items-center gap-4 bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow group"
              >
                <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <item.icon className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-sm">{item.label}</h3>
                  <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <GroceryFooter />
    </div>
  );
};

export default Account;
