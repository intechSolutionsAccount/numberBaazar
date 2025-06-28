
import { Layout } from "@/components/layout";
import { VIPNumberCard } from "@/components/vip-number-card";
import { Toaster } from "sonner";
import { useState, useEffect, useMemo, useRef } from "react";
import { SearchSortControls } from "@/components/search-sort-controls";
import { VIPNumbersSkeleton } from "@/components/vip-numbers-skeleton";
import { ErrorFallback } from "@/components/error-fallback";
import { vipNumbersApi } from "@/services/vip-numbers-api";
import { VIPNumber } from "@/hooks/use-cart";

const Premium = () => {
  const [searchType, setSearchType] = useState("anywhere");
  const [searchValue, setSearchValue] = useState("");
  const [sortType, setSortType] = useState("");
  const [allNumbers, setAllNumbers] = useState<VIPNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const cardsRef = useRef<HTMLElement>(null);

  // Fetch all VIP numbers on component mount
  useEffect(() => {
    const fetchAllNumbers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await vipNumbersApi.getVIPNumbers();
        setAllNumbers(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch VIP numbers");
        setAllNumbers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNumbers();
  }, []);

  const filteredAndSortedNumbers = useMemo(() => {
    let result = [...allNumbers];

    // Apply search filtering
    if (searchValue) {
      const searchValueWithoutSpaces = searchValue.replace(/\s/g, "");
      
      result = result.filter(number => {
        const mobileNumberDigits = number.mobile_number.replace(/\s/g, "").replace(/\+/g, "");
        
        switch (searchType) {
          case "startWith":
            return mobileNumberDigits.startsWith(searchValueWithoutSpaces);
          case "endWith":
            return mobileNumberDigits.endsWith(searchValueWithoutSpaces);
          case "anywhere":
          default:
            return mobileNumberDigits.includes(searchValueWithoutSpaces);
        }
      });
    }

    // Apply sorting
    if (sortType) {
      result.sort((a, b) => {
        if (sortType === "highToLow") {
          return b.discounted_price - a.discounted_price;
        } else {
          return a.discounted_price - b.discounted_price;
        }
      });
    }

    return result;
  }, [allNumbers, searchType, searchValue, sortType]);

  const handleSearch = (type: string, value: string) => {
    setSearchType(type);
    setSearchValue(value);
    setHasSearched(true);
  };

  const handleSort = (type: string) => {
    setSortType(type);
    setHasSearched(true);
  };

  // Auto-scroll to cards section after search/sort operations
  useEffect(() => {
    if (hasSearched && !loading && cardsRef.current) {
      cardsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [hasSearched, loading, filteredAndSortedNumbers]);

  const retry = () => {
    const fetchAllNumbers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await vipNumbersApi.getVIPNumbers();
        setAllNumbers(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch VIP numbers");
        setAllNumbers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNumbers();
  };

  return (
    <Layout>
      <Toaster position="bottom-right" />
      <main>
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-skyBlue to-skyBlue-dark text-transparent bg-clip-text animate-fade-in">
              Premium VIP Numbers
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 animate-fade-in">
              Our complete collection of VIP numbers. Browse through all available 
              numbers and find the perfect match for your needs.
            </p>
          </div>
        </section>

        <section ref={cardsRef} className="py-6">
          <SearchSortControls onSearch={handleSearch} onSort={handleSort} />
          
          {loading && <VIPNumbersSkeleton />}
          
          {error && <ErrorFallback error={error} onRetry={retry} />}
          
          {!loading && !error && (
            <>
              {filteredAndSortedNumbers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No matching numbers found. Try a different search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredAndSortedNumbers.map((number) => (
                    <VIPNumberCard key={number.id} number={number} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default Premium;
