import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";

const menuItems = [
  {
    category: "Starters",
    items: [
      { name: "Burrata & Heirloom Tomato", desc: "San Marzano tomato, basil oil, aged balsamic", price: "$18" },
      { name: "French Onion Soup", desc: "Caramelized onion, gruyère crostini", price: "$14" },
      { name: "Tuna Tartare", desc: "Avocado, sesame, soy citrus dressing", price: "$22" },
    ],
  },
  {
    category: "Mains",
    items: [
      { name: "Wagyu Beef Tenderloin", desc: "Red wine jus, roasted vegetables, truffle mash", price: "$58" },
      { name: "Pan-Seared Sea Bass", desc: "Saffron risotto, lemon butter, capers", price: "$42" },
      { name: "Truffle Tagliatelle", desc: "Wild mushrooms, parmesan cream, black truffle", price: "$36" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Chocolate Fondant", desc: "Molten center, gold leaf, vanilla gelato", price: "$16" },
      { name: "Crème Brûlée", desc: "Tahitian vanilla, caramelized sugar", price: "$14" },
      { name: "Seasonal Fruit Tart", desc: "Pastry cream, fresh berries, mint", price: "$15" },
    ],
  },
];

const images = [dish1, dish2, dish3];

const MenuSection = () => (
  <section id="menu" className="py-24 px-6">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Curated Selections</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Our Menu</h2>
        <div className="divider-gold mx-auto" />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {menuItems.map((section, i) => (
          <div key={section.category}>
            <div className="mb-8 overflow-hidden rounded-sm">
              <img
                src={images[i]}
                alt={section.category}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-6 text-center">
              {section.category}
            </h3>
            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.name} className="border-b border-border pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-heading text-lg text-foreground">{item.name}</h4>
                    <span className="font-body text-primary font-bold">{item.price}</span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MenuSection;
