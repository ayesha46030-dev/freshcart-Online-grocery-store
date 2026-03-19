import GroceryNavbar from "@/components/grocery/GroceryNavbar";
import GroceryHero from "@/components/grocery/GroceryHero";
import ServiceHighlights from "@/components/grocery/ServiceHighlights";
import FeaturedProducts from "@/components/grocery/FeaturedProducts";
import PromoBanner from "@/components/grocery/PromoBanner";
import BestDeals from "@/components/grocery/BestDeals";
import CustomerFavorites from "@/components/grocery/CustomerFavorites";
import StoreBenefits from "@/components/grocery/StoreBenefits";
import GroceryFooter from "@/components/grocery/GroceryFooter";
import Chatbot from "@/components/Chatbot";

const Index = () => (
  <div className="min-h-screen bg-background">
    <GroceryNavbar />
    <GroceryHero />
    <ServiceHighlights />
    <FeaturedProducts />
    <PromoBanner />
    <BestDeals />
    <CustomerFavorites />
    <StoreBenefits />
    <GroceryFooter />
    <Chatbot />
  </div>
);

export default Index;
