import heroImg from "@/assets/hero-restaurant.jpg";

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
    <img src={heroImg} alt="La Maison restaurant interior" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
    <div className="relative z-10 text-center px-6 animate-fade-up">
      <p className="font-body text-sm tracking-[0.4em] uppercase text-primary mb-4">
        Est. 2018
      </p>
      <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground">
        La Maison
      </h1>
      <div className="divider-gold mx-auto mb-6" />
      <p className="font-body text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-10">
        An exquisite culinary journey through the finest seasonal ingredients
      </p>
      <a
        href="#reservations"
        className="inline-block px-8 py-3 border border-primary text-primary font-body text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      >
        Reserve a Table
      </a>
    </div>
  </section>
);

export default Hero;
