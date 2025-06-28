
import { Layout } from "@/components/layout";
import { VIPNumberCard } from "@/components/vip-number-card";
import { HeroCarousel } from "@/components/hero-carousel";
import { CustomerReviews } from "@/components/customer-reviews";
import { CategoriesSection } from "@/components/categories-section";
import { PriceRangeSection } from "@/components/price-range-section";
import { VIPNumbersSkeleton } from "@/components/vip-numbers-skeleton";
import { ErrorFallback } from "@/components/error-fallback";
import { Toaster } from "sonner";
import { useState, useRef, useEffect } from "react";
import { SearchSortControls } from "@/components/search-sort-controls";
import { useVIPNumbers } from "@/hooks/use-vip-numbers";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const Index = () => {
  const [searchType, setSearchType] = useState("anywhere");
  const [searchValue, setSearchValue] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const { data: vipNumbers, loading, error, searchNumbers, filterByPattern, filterByPriceRange, sortNumbers, retry } = useVIPNumbers();

  const handleSearch = async (type: string, value: string) => {
    setSearchType(type);
    setSearchValue(value);
    setHasSearched(true);
    // Clear filter selections when searching
    setSelectedCategory(null);
    setSelectedPriceRange(null);
    await searchNumbers(type, value);
  };

  const handleSort = (type: string) => {
    sortNumbers(type);
  };

  const handleCategoryFilter = async (flag: string, categoryLabel: string) => {
    setHasSearched(true);
    setSelectedCategory(categoryLabel);
    setSelectedPriceRange(null); // Clear price range selection
    if (flag) {
      await filterByPattern(flag);
    } else {
      // Reset to all numbers when no category is selected
      setSelectedCategory(null);
      retry();
    }
  };

  const handlePriceFilter = async (minPrice: number, maxPrice: number, rangeLabel: string) => {
    setHasSearched(true);
    setSelectedPriceRange(rangeLabel);
    setSelectedCategory(null); // Clear category selection
    if (minPrice === 0 && maxPrice === Number.MAX_SAFE_INTEGER) {
      // Reset to all numbers when no price filter is applied
      setSelectedPriceRange(null);
      retry();
    } else {
      await filterByPriceRange(minPrice, maxPrice);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedPriceRange(null);
    setSearchValue("");
    setSearchType("anywhere");
    setHasSearched(false);
    retry();
  };

  // Auto-scroll to cards section after search/filter operations
  useEffect(() => {
    if (hasSearched && !loading && cardsRef.current) {
      cardsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [hasSearched, loading, vipNumbers]);

  return (
    <Layout>
      <Toaster position="bottom-right" />
      <main>
        <HeroCarousel />
        
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-skyBlue to-skyBlue-dark text-transparent bg-clip-text animate-fade-in">
              Buy VIP Mobile Numbers
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 animate-fade-in">
              Stand out from the crowd with our premium collection of VIP numbers. Easy to remember, 
              prestigious to own, and perfect for business or personal use.
            </p>
          </div>
        </section>

        <CategoriesSection 
          onCategoryFilter={handleCategoryFilter} 
          selectedCategory={selectedCategory}
        />
        <PriceRangeSection 
          onPriceFilter={handlePriceFilter}
          selectedPriceRange={selectedPriceRange}
        />

        {/* Reset Filters Button */}
        {(selectedCategory || selectedPriceRange || searchValue) && (
          <div className="flex justify-center py-4">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        )}

        <section ref={cardsRef} className="py-6">
          <SearchSortControls onSearch={handleSearch} onSort={handleSort} />
          
          {loading && <VIPNumbersSkeleton />}
          
          {error && <ErrorFallback error={error} onRetry={retry} />}
          
          {!loading && !error && (
            <>
              {vipNumbers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No matching numbers found. Try a different search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
                  {vipNumbers.map((number) => (
                    <VIPNumberCard key={number.id} number={number} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>
      
      <CustomerReviews />
    </Layout>
  );
};

export default Index;
