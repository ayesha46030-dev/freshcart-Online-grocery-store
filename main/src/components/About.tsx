const About = () => (
  <section id="about" className="py-24 px-6 bg-card">
    <div className="container mx-auto max-w-3xl text-center">
      <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Our Story</p>
      <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">About La Maison</h2>
      <div className="divider-gold mx-auto mb-10" />
      <p className="font-body text-lg leading-relaxed text-muted-foreground mb-6">
        Nestled in the heart of the city, La Maison has been a sanctuary for food lovers since 2018.
        Our chef brings over two decades of experience from Michelin-starred kitchens across Europe,
        crafting dishes that honor tradition while embracing innovation.
      </p>
      <p className="font-body text-lg leading-relaxed text-muted-foreground mb-10">
        Every ingredient is sourced from local farms and artisanal producers. We believe that the
        finest dining begins with the finest ingredients — simple, seasonal, and treated with respect.
      </p>
      <div className="grid grid-cols-3 gap-8">
        {[
          { num: "7", label: "Years of Excellence" },
          { num: "50+", label: "Seasonal Dishes" },
          { num: "12K", label: "Happy Guests" },
        ].map((s) => (
          <div key={s.label}>
            <p className="font-heading text-3xl md:text-4xl font-bold text-primary">{s.num}</p>
            <p className="font-body text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
