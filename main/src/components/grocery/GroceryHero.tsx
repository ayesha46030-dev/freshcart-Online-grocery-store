import heroImg from "@/assets/grocery-hero.png";
import patternBg from "@/assets/pattern-bg.png";

const GroceryHero = () => (
  <section className="relative overflow-hidden">
    {/* Pattern background */}
    <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '400px' }} />
    <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary" />
    <div className="container mx-auto flex flex-col md:flex-row items-center px-6 py-14 md:py-20 gap-8 relative z-10">
      <div className="flex-1 animate-fade-up">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
          Monthly Grocery Shopping Made Easy
        </h1>
        <p className="font-body text-lg text-muted-foreground mb-8 max-w-lg">
          Order fresh groceries online and have them delivered to your door. Quality products, unbeatable prices.
        </p>
        <a
          href="#shop"
          className="inline-block px-8 py-3 bg-primary text-primary-foreground font-body font-bold text-sm rounded-full hover:bg-primary/90 transition-colors shadow-lg"
        >
          Shop Now
        </a>
      </div>
      <div className="flex-1 flex justify-center animate-fade-in">
        <img
          src={heroImg}
          alt="Fresh groceries in a bag"
          className="max-w-xs md:max-w-sm lg:max-w-md w-full object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  </section>
);

export default GroceryHero;
