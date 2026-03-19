import { useState } from "react";
import { Clock, MapPin, Phone } from "lucide-react";

const Reservations = () => {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "", guests: "2", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", date: "", time: "", guests: "2", message: "" });
  };

  return (
    <section id="reservations" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Book Your Experience</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Reservations</h2>
          <div className="divider-gold mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full Name" className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email" className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              <input
                required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <select
                value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                ))}
              </select>
            </div>
            <textarea
              rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Special requests (optional)"
              className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              {submitted ? "✓ Request Sent" : "Request Reservation"}
            </button>
          </form>

          <div className="space-y-8 flex flex-col justify-center" id="contact">
            <div className="flex items-start gap-4">
              <MapPin className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-heading text-lg text-foreground mb-1">Location</h4>
                <p className="font-body text-muted-foreground">123 Gourmet Avenue, Downtown District</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-heading text-lg text-foreground mb-1">Hours</h4>
                <p className="font-body text-muted-foreground">Tue – Sat: 6:00 PM – 11:00 PM</p>
                <p className="font-body text-muted-foreground">Sun – Mon: Closed</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-heading text-lg text-foreground mb-1">Contact</h4>
                <p className="font-body text-muted-foreground">+1 (555) 234-5678</p>
                <p className="font-body text-muted-foreground">hello@lamaison.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservations;
