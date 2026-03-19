import strawberries from "@/assets/products/strawberries.png";
import bananas from "@/assets/products/bananas.png";
import eggs from "@/assets/products/eggs.png";
import almondMilk from "@/assets/products/almond-milk.png";
import avocados from "@/assets/products/avocados.png";
import bread from "@/assets/products/bread.png";
import broccoli from "@/assets/products/broccoli.png";
import apples from "@/assets/products/apples.png";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  discount?: number;
  category: string;
}

export const featuredProducts: Product[] = [
  { id: "f1", name: "Fresh Strawberries", image: strawberries, price: 5.99, rating: 4.5, reviews: 9536, category: "Fruits" },
  { id: "f2", name: "Organic Bananas", image: bananas, price: 1.99, rating: 4.7, reviews: 13042, category: "Fruits" },
  { id: "f3", name: "Farm Fresh Eggs", image: eggs, price: 3.49, rating: 4.3, reviews: 3356, category: "Dairy" },
  { id: "f4", name: "Almond Milk", image: almondMilk, price: 5.59, rating: 4.6, reviews: 8721, category: "Dairy" },
  { id: "f5", name: "Fresh Broccoli", image: broccoli, price: 2.99, rating: 4.4, reviews: 4102, category: "Vegetables" },
];

export const bestDeals: Product[] = [
  { id: "d1", name: "Organic Honeycrisp Apples", image: apples, price: 1.98, originalPrice: 4.99, rating: 4.8, reviews: 39536, discount: 55, category: "Fruits" },
  { id: "d2", name: "Whole Grain Bread", image: bread, price: 2.49, originalPrice: 4.99, rating: 4.5, reviews: 15210, discount: 50, category: "Bakery" },
  { id: "d3", name: "Organic Avocados", image: avocados, price: 3.49, originalPrice: 4.99, rating: 4.6, reviews: 39935, discount: 30, category: "Fruits" },
  { id: "d4", name: "Fresh Broccoli", image: broccoli, price: 1.99, originalPrice: 3.99, rating: 4.3, reviews: 44934, discount: 50, category: "Vegetables" },
];

export const customerFavorites: Product[] = [
  { id: "c1", name: "Organic Avocados", image: avocados, price: 1.99, rating: 4.9, reviews: 9083, category: "Fruits" },
  { id: "c2", name: "Farm Fresh Eggs", image: eggs, price: 3.49, rating: 5.0, reviews: 9089, category: "Dairy" },
  { id: "c3", name: "Whole Grain Bread", image: bread, price: 4.39, rating: 4.8, reviews: 5571, category: "Bakery" },
  { id: "c4", name: "Fresh Broccoli", image: broccoli, price: 2.99, rating: 4.7, reviews: 9210, category: "Vegetables" },
];
