
import React from "react";
import { Button } from "@/components/ui/button";

const priceRanges = [
  { label: "0-1500", min: 0, max: 1500 },
  { label: "1501-3000", min: 1501, max: 3000 },
  { label: "3001-5000", min: 3001, max: 5000 },
  { label: "5001-10000", min: 5001, max: 10000 },
  { label: "10001-30000", min: 10001, max: 30000 },
  { label: "30001-50000", min: 30001, max: 50000 },
  { label: "50001-100000", min: 50001, max: 100000 },
  { label: "100000-1000000", min: 100000, max: 1000000 }
];

interface PriceRangeSectionProps {
  onPriceFilter?: (minPrice: number, maxPrice: number, rangeLabel: string) => void;
  selectedPriceRange?: string | null;
}

export function PriceRangeSection({ onPriceFilter, selectedPriceRange }: PriceRangeSectionProps) {
  const handleRangeClick = (range: { label: string; min: number; max: number }) => {
    const isCurrentlySelected = selectedPriceRange === range.label;
    const newSelection = isCurrentlySelected ? null : range.label;
    
    if (onPriceFilter) {
      if (newSelection) {
        onPriceFilter(range.min, range.max, range.label);
      } else {
        onPriceFilter(0, Number.MAX_SAFE_INTEGER, "");
      }
    }
    
    console.log("Price range selected:", range.label);
  };

  const formatPriceRange = (range: { label: string; min: number; max: number }) => {
    const formatPrice = (price: number) => {
      if (price >= 100000) return `₹${(price / 100000).toFixed(0)}L`;
      if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`;
      return `₹${price}`;
    };
    
    return `${formatPrice(range.min)} - ${formatPrice(range.max)}`;
  };

  return (
    <section className="py-6 border-t border-border">
      <div className="container">
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            Filter by Price Range
          </h3>
          <p className="text-sm text-muted-foreground">
            Select your budget range to find suitable VIP numbers
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {priceRanges.map((range) => (
            <Button
              key={range.label}
              variant={selectedPriceRange === range.label ? "default" : "outline"}
              size="sm"
              className={`transition-all duration-200 hover:scale-105 ${
                selectedPriceRange === range.label 
                  ? "bg-skyBlue hover:bg-skyBlue-dark text-white" 
                  : "hover:bg-skyBlue/10 hover:border-skyBlue"
              }`}
              onClick={() => handleRangeClick(range)}
            >
              {formatPriceRange(range)}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
