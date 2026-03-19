import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

const ProductCard = ({ id, name, image, price, originalPrice, rating, reviews, discount }: Product) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-4 hover:shadow-md transition-shadow group relative min-w-[180px] flex flex-col">
      {discount && (
        <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-lg z-10">
          -{discount}%
        </span>
      )}
      <Link to={`/product/${id}`} className="aspect-square flex items-center justify-center p-3 mb-3 cursor-pointer">
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>
      <Link to={`/product/${id}`}>
        <h4 className="font-body font-semibold text-foreground text-sm mb-1 truncate hover:text-primary transition-colors">{name}</h4>
      </Link>
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            }
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">({reviews.toLocaleString()})</span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="font-heading font-bold text-foreground">${price.toFixed(2)}</span>
        {originalPrice && (
          <span className="text-xs text-muted-foreground line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>
      <button
        onClick={() => addToCart({ id, name, price, image })}
        className="mt-auto w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-body font-semibold hover:bg-primary/90 transition-colors"
      >
        <ShoppingCart size={14} />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
