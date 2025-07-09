
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { calculateSumTotal } from "@/utils/calculate-sum-total";
import { formatCurrency } from "@/utils/format-currency";
import { useCart, VIPNumber } from "@/hooks/use-cart";
import { ShoppingCart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { businessNumber } from "@/lib/owner"

interface VIPNumberCardProps {
  number: VIPNumber;
}

export function VIPNumberCard({ number }: VIPNumberCardProps) {
  const { addToCart } = useCart();
  const { twoDigitSum, oneDigitSum } = calculateSumTotal(number.mobile_number);
  
  const handleBuyNow = () => {
    
    // Compose the message
    const message = `Hi, I'm interested in purchasing\n the VIP number: +91 ${number.mobile_number}. \nPlease assist me with the next steps.`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/${businessNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:bg-skyBlue hover:scale-[1.02] hover:shadow-lg group focus-within:bg-skyBlue focus-within:scale-[1.02] focus-within:shadow-lg w-full">
      <CardHeader className="bg-muted/50 py-3">
        <div className="text-center">
          <div className="flex justify-between items-end">
            <div>
              <span className="font-bold text-lg text-primary group-hover:text-white group-focus-within:text-white">₹{formatCurrency(number.discounted_price)}</span>
              {number.discounted_price < number.price && (
                <span className="ml-2 text-lg text-muted-foreground line-through group-hover:text-white/70 group-focus-within:text-white/70">₹{formatCurrency(number.price)}</span>
              )}
            </div>
            
            {number.discounted_price < number.price && (
              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-semibold px-2 py-1 rounded group-hover:bg-white/20 group-hover:text-white group-focus-within:bg-white/20 group-focus-within:text-white">
                {Math.round((1 - number.discounted_price / number.price) * 100)}% OFF
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold group-hover:text-white group-focus-within:text-white tracking-wide">
            +91 {number.mobile_number}
          </h3>
          
          <div className="flex justify-center items-center py-2">
            <span className="text-xl font-medium group-hover:text-white group-focus-within:text-white">
              {/* Sum Total = <span className="font-bold">{twoDigitSum} → {oneDigitSum}</span> */}
              Sum Total = <span className="font-bold">{twoDigitSum} = {oneDigitSum}</span>
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Button 
          variant="outline" 
          className="flex-1 text-sm group-hover:bg-black group-hover:border-black group-hover:text-white group-focus-within:bg-black group-focus-within:border-black group-focus-within:text-white hover:bg-black hover:border-black hover:text-white transition-all duration-300 ease-in-out"
          onClick={handleBuyNow}
        >
          <FaWhatsapp className="text-green-500" />
          Buy Now
        </Button>
        <Button 
          className="flex-1 text-sm group-hover:bg-black group-hover:text-white group-focus-within:bg-black group-focus-within:text-white hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
          onClick={() => addToCart(number)}
        >
          <ShoppingCart className="mr-1 h-3 w-3" /> 
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
