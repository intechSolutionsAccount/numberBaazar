import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { businessNumber } from "@/lib/owner"

export function FixedWhatsAppButton() {
  const handleWhatsAppClick = () => {
     // Compose the message
    const message = `Hi, I'm interested in purchasing the VIP number.\nPlease assist me with the next steps.`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/${businessNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed bottom-12 left-5 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="h-[57px] w-[57px] rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg transition-all duration-300 hover:scale-110 p-0 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp
          style={{
            width: '39px',
            height: '39px',
            color: 'white',
            flexShrink: 0,
          }}
        />
        <span className="sr-only">Contact us on WhatsApp</span>
      </Button>
    </div>
  );
}
