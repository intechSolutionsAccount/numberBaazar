
import React from "react";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Mirror Numbers", flag: "is_mirror" },
  { name: "Semi Mirror Numbers", flag: "is_semi_mirror" },
  { name: "Two Digit Numbers", flag: "is_two_digit" },
  { name: "Three Digit Numbers", flag: "is_three_digit" },
  { name: "Counting VIP Numbers", flag: "is_counting" },
  { name: "786 Numbers", flag: "is_786" },
  { name: "108 Numbers", flag: "is_108" },
  { name: "Doubling Numbers", flag: "is_doubling" },
  { name: "ABABXYXY Numbers", flag: "is_ababxyxy" },
  { name: "ABABAB numbers", flag: "is_ababab" },
  { name: "Start ABAB numbers", flag: "is_start_abab" },
  { name: "Middle ABAB numbers", flag: "is_middle_abab" },
  { name: "Ending ABAB numbers", flag: "is_end_abab" },
  { name: "ABCABCABC Numbers", flag: "is_abcabcabc" },
  { name: "ABCABC numbers", flag: "is_abcabc" },
  { name: "AAABBBNumbers", flag: "is_aaabbb" },
  { name: "Triple Numbers", flag: "is_triple" },
  { name: "Tetra Numbers", flag: "is_tetra" },
  { name: "Penta Numbers", flag: "is_penta" },
  { name: "Hexa Numbers", flag: "is_hexa" },
  { name: "Septa Numbers", flag: "is_septa" },
  { name: "Octa Numbers", flag: "is_octa" },
  { name: "Unique Numbers", flag: "is_unique" },
  { name: "Without 248 Numbers", flag: "is_without_248" }
];

interface CategoriesSectionProps {
  onCategoryFilter?: (flag: string, categoryLabel: string) => void;
  selectedCategory?: string | null;
}

export function CategoriesSection({ onCategoryFilter, selectedCategory }: CategoriesSectionProps) {
  const handleCategoryClick = (category: { name: string; flag: string }) => {
    const isCurrentlySelected = selectedCategory === category.name;
    const newSelection = isCurrentlySelected ? null : category.name;
    
    if (onCategoryFilter) {
      onCategoryFilter(isCurrentlySelected ? "" : category.flag, newSelection || "");
    }
    
    console.log("Category selected:", category.name, "Flag:", category.flag);
  };

  return (
    <section id="categories" className="py-8 bg-muted/30">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-skyBlue to-skyBlue-dark text-transparent bg-clip-text">
            Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse VIP numbers by category to find the perfect match for your needs
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((category) => (
            <Button
              key={category.flag}
              variant={selectedCategory === category.name ? "default" : "outline"}
              className={`h-auto py-3 px-2 text-xs sm:text-sm transition-all duration-200 hover:scale-105 ${
                selectedCategory === category.name 
                  ? "bg-skyBlue hover:bg-skyBlue-dark text-white" 
                  : "hover:bg-skyBlue/10 hover:border-skyBlue"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <span className="text-center leading-tight">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
