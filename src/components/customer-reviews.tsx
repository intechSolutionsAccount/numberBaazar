
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ravi Patil",
    avatar: "RP",
    review: "Fantastic experience. Very easy to get my VIP number. The process was smooth and the customer service was excellent!"
  },
  {
    id: 2,
    name: "Samir Shaikh",
    avatar: "SS",
    review: "Loved it. Everything was smooth and trustworthy. Got my lucky number within minutes of ordering."
  },
  {
    id: 3,
    name: "Rohit Deshpande",
    avatar: "RD",
    review: "Amazing collection of VIP numbers. Found the perfect number for my business. Highly recommended!"
  },
  {
    id: 4,
    name: "Priya Shinde",
    avatar: "PS",
    review: "The numerology calculations helped me choose the right number. Very satisfied with the service quality."
  },
  {
    id: 5,
    name: "Arjun Kamble",
    avatar: "AK",
    review: "Quick delivery and authentic numbers. The team was very professional and helpful throughout."
  },
  {
    id: 6,
    name: "Onkar Pawar",
    avatar: "OP",
    review: "Best platform for VIP numbers! Clean interface, fair pricing, and excellent customer support."
  },
  {
    id: 7,
    name: "Divya Kadam",
    avatar: "DK",
    review: "I purchased a number that adds up to my lucky number—and ever since, I've genuinely felt luck shifting in my favor. Highly recommend!"
  },
  {
    id: 8,
    name: "Manohar Gaikwad",
    avatar: "MG",
    review: "Impressed with the variety and quality. Got my dream number at a reasonable price. Will recommend to friends!"
  }
];

export function CustomerReviews() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-skyBlue to-skyBlue-dark text-transparent bg-clip-text">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect VIP numbers with us
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-skyBlue text-white font-semibold">
                      {review.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "{review.review}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
