import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const carouselSlides = [
  {
    id: 1,
    image: "/images/vip1.jpg",
    alt: "Person holding smartphone with VIP number display",
    title: "Premium VIP Numbers",
    subtitle: "Stand out with exclusive mobile numbers"
  },
  {
    id: 2,
    image: "/images/vip2.jpg",
    alt: "Luxury phone with golden number display",
    title: "Luxury Collection",
    subtitle: "Numbers that reflect your status"
  },
  {
    id: 3,
    image: "/images/vip3.jpg",
    alt: "Astrologer with numerology charts",
    title: "Lucky Numbers",
    subtitle: "Choose numbers with positive energy"
  },
  {
    id: 4,
    image: "/images/vip4.png",
    alt: "Modern luxury building with VIP signage",
    title: "VIP Lifestyle",
    subtitle: "Numbers for the distinguished"
  },
  {
    id: 5,
    image: "/images/vip5.webp",
    alt: "Businessman with premium mobile device",
    title: "Business Elite",
    subtitle: "Professional numbers for success"
  },
  {
    id: 6,
    image: "/images/vip6.webp",
    alt: "Starry night representing special numbers",
    title: "Special Edition",
    subtitle: "Rare and exclusive number patterns"
  }
];

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

function TypewriterText({ text, speed = 100, onComplete }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (isTyping && currentIndex === text.length) {
      setTimeout(() => {
        setIsTyping(false);
        setCurrentIndex(text.length);
      }, 1500);
    } else if (!isTyping && currentIndex > 0) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      }, speed / 2);
      return () => clearTimeout(timer);
    } else if (!isTyping && currentIndex === 0) {
      onComplete?.();
    }
  }, [currentIndex, isTyping, text, speed, onComplete]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
}

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textKey, setTextKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    setTextKey(prev => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    setTextKey(prev => prev + 1);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setTextKey(prev => prev + 1);
    setLastInteractionTime(Date.now());
  }, []);

  const handleUserInteraction = useCallback(() => {
    setLastInteractionTime(Date.now());
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
    setLastInteractionTime(Date.now());
  }, []);

  // Auto-advance logic with pause-on-interaction
  useEffect(() => {
    if (!isPlaying) {
      // Check if 5 seconds have passed since last interaction
      const checkResumeTimer = setInterval(() => {
        if (Date.now() - lastInteractionTime > 2000) {
          setIsPlaying(true);
        }
      }, 1000);
      return () => clearInterval(checkResumeTimer);
    }

    if (isPlaying) {
      const timer = setInterval(nextSlide, 2000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, lastInteractionTime, nextSlide]);

  const handleTextComplete = () => {
    // Text animation completed
  };

  return (
    <div 
      className="relative w-full mb-4 group"
      onMouseEnter={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      <div className="w-full">
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselSlides.map((slide, index) => (
              <div key={slide.id} className="min-w-full">
                <Card className="border-0">
                  <CardContent className="relative p-0 h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
                    {/* Blurred background layer */}
                    <div className="absolute inset-0 select-none">
                      <img
                        src={slide.image}
                        alt=""
                        className="w-full h-full object-cover filter blur-lg scale-110 opacity-50"
                        loading={index === 0 ? "eager" : "lazy"}
                        style={{
                          imageRendering: 'auto',
                          willChange: 'transform'
                        }}
                      />
                    </div>
                    
                    {/* Main sharp image with preserved aspect ratio */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className="max-w-full max-h-full object-contain transition-transform duration-700 hover:scale-[1.02]"
                        loading={index === 0 ? "eager" : "lazy"}
                        style={{
                          imageRendering: 'auto',
                          willChange: 'transform',
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)'
                        }}
                      />
                    </div>                 
                    {/* Text content overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {/* <div className="text-center text-white p-6 bg-black/30 rounded-lg backdrop-blur-sm animate-fade-in">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-skyBlue text-transparent bg-clip-text min-h-[1.2em]">
                          {index === currentSlide && (
                            <TypewriterText 
                              key={`title-${textKey}`}
                              text={slide.title} 
                              speed={27}
                              onComplete={handleTextComplete}
                            />
                          )}
                        </h2>
                        <p className="text-lg md:text-xl lg:text-2xl opacity-90 min-h-[1.5em]">
                          {index === currentSlide && (
                            <TypewriterText 
                              key={`subtitle-${textKey}`}
                              text={slide.subtitle} 
                              speed={27}
                            />
                          )}
                        </p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => {
              prevSlide();
              handleUserInteraction();
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => {
              nextSlide();
              handleUserInteraction();
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Play/Pause Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentSlide 
                  ? "bg-skyBlue scale-110" 
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              onClick={() => {
                goToSlide(index);
                handleUserInteraction();
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
