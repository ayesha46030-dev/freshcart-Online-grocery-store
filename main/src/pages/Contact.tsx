import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import GroceryNavbar from "@/components/grocery/GroceryNavbar";
import GroceryFooter from "@/components/grocery/GroceryFooter";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    if (error) toast.error("Failed to send message. Please try again.");
    else {
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <GroceryNavbar />
      <div className="container mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="space-y-6">
            <p className="font-body text-muted-foreground">Have a question or feedback? We'd love to hear from you.</p>
            {[
              { icon: Mail, label: "support@freshcart.com" },
              { icon: Phone, label: "+1 (800) 123-4567" },
              { icon: MapPin, label: "123 Fresh Street, Green City, CA 94103" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <item.icon className="text-primary" size={18} />
                </div>
                <span className="font-body text-sm text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
            <input type="email" placeholder="Your Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
            <textarea placeholder="Your Message" rows={4} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary text-sm font-body text-foreground placeholder:text-muted-foreground outline-none resize-none focus:ring-2 focus:ring-primary/30" />
            <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-body font-bold hover:bg-primary/90 transition-colors disabled:opacity-50">
              <Send size={14} /> {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <GroceryFooter />
    </div>
  );
};

export default Contact;
