
import { Layout } from "@/components/layout";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowRight } from "lucide-react";
import { calculateLuckyNumber } from "@/utils/calculate-lucky-number";
import { formatCurrency } from "@/utils/format-currency";
import { Link } from "react-router-dom";
import { businessNumber } from "@/lib/owner"

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  
  const totalPrice = cart.reduce((acc, item) => acc + item.discounted_price, 0);

  const handleCheckoutOnWhatsApp = () => {
    
    // Compose the message
    let message = "Hi, I'm interested in buying the following VIP numbers:\n\n";
    
    // Add each number with its price
    cart.forEach(item => {
      message += `${item.mobile_number} - ₹${formatCurrency(item.discounted_price)}\n`;
    });
    
    // Add the total
    message += `\nTotal: ₹${formatCurrency(totalPrice)}\n\nPlease guide me with the next steps.`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/${businessNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-skyBlue to-skyBlue-dark text-transparent bg-clip-text">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some VIP numbers to your cart to continue.</p>
            <Button asChild>
              <Link to="/">Browse VIP Numbers</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-4">Mobile Number</th>
                    <th className="p-4 hidden sm:table-cell">Lucky Number</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-4 font-medium">{item.mobile_number}</td>
                      <td className="p-4 hidden sm:table-cell">
                        {calculateLuckyNumber(item.mobile_number)}
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="font-medium">₹{formatCurrency(item.discounted_price)}</div>
                          {item.discounted_price < item.price && (
                            <div className="text-sm text-muted-foreground line-through">
                              ₹{formatCurrency(item.price)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove from cart"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Total</div>
                  <div className="text-2xl font-bold">₹{formatCurrency(totalPrice)}</div>
                </div>
                
                <Button onClick={handleCheckoutOnWhatsApp} className="flex items-center gap-2">
                  Checkout on WhatsApp <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
