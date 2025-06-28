
import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { businessNumber, ownerInfo } from "@/lib/owner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Compose the WhatsApp message
    const whatsappMessage = `*New Contact Form Submission*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Message:*\n${message}\n\n` +
      `Please respond at your earliest convenience.`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/${businessNumber}?text=${encodedMessage}`, '_blank');
    
    // Show success message and reset form
    setTimeout(() => {
      toast.success("Redirected to WhatsApp! Your message is ready to send.");
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-skyBlue to-skyBlue-dark text-transparent bg-clip-text">
              Contact Us
            </h1>
            <p className="text-muted-foreground">
              Have a question or need assistance? We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Our Contact Details</h2>
                <p className="text-muted-foreground">Feel free to reach out to us directly</p>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+91 {ownerInfo.mobile_no}</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{ownerInfo.email_id}</p>
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    {ownerInfo.Address.line1}<br />
                    {ownerInfo.Address.line2}<br />
                    {ownerInfo.Address.line3}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold">Business Hours</h3>
                <p className="text-muted-foreground">Monday to Saturday: 9:00 AM - 6:00 PM</p>
                <p className="text-muted-foreground">Sunday: Closed</p>
              </div>
            </div>

            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
