import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import patternBg from "@/assets/pattern-bg.png";

const PromoBanner = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: email.trim() });
    if (error?.code === "23505") toast.info("You're already subscribed!");
    else if (error) toast.error("Something went wrong. Try again.");
    else { toast.success("You're subscribed! Check your email for the offer."); setEmail(""); }
    setSubmitting(false);
  };

  return (
    <section className="py-10 px-6">
      <div className="container mx-auto">
        <div className="relative bg-primary rounded-2xl px-6 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '300px' }} />
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-foreground/10 rounded-full blur-2xl" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-primary-foreground/10 rounded-full blur-2xl" />
          <h2 className="relative z-10 font-heading text-2xl md:text-3xl font-bold text-primary-foreground text-center md:text-left">
            Get 20% Off On Your First Order!
          </h2>
          <form onSubmit={handleSubmit} className="relative z-10 flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="flex-1 md:w-72 px-4 py-3 rounded-lg text-sm font-body bg-primary-foreground text-foreground placeholder:text-muted-foreground outline-none"
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg text-sm font-body font-bold hover:bg-accent/90 transition-colors whitespace-nowrap disabled:opacity-50"
            >
              {submitting ? "..." : "Get Offer"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
