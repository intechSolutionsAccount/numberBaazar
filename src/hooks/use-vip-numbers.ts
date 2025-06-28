
import { useState, useEffect } from "react";
import { VIPNumber } from "@/hooks/use-cart";
import { vipNumbersApi, VIPNumbersResponse } from "@/services/vip-numbers-api";

export const useVIPNumbers = () => {
  const [data, setData] = useState<VIPNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNumbers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await vipNumbersApi.getVIPNumbers();
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const searchNumbers = async (searchType: string, searchValue: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await vipNumbersApi.searchVIPNumbers(searchType, searchValue);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const filterByPattern = async (patternFlag: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await vipNumbersApi.getVIPByPattern(patternFlag);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Pattern filtering failed");
    } finally {
      setLoading(false);
    }
  };

  const filterByPriceRange = async (minPrice: number, maxPrice: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await vipNumbersApi.getVIPByPriceRange(minPrice, maxPrice);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Price filtering failed");
    } finally {
      setLoading(false);
    }
  };

  const sortNumbers = (sortType: string) => {
    const sorted = [...data].sort((a, b) => {
      if (sortType === "highToLow") {
        return b.discounted_price - a.discounted_price;
      } else {
        return a.discounted_price - b.discounted_price;
      }
    });
    setData(sorted);
  };

  const retry = () => {
    fetchNumbers();
  };

  useEffect(() => {
    fetchNumbers();
  }, []);

  return {
    data,
    loading,
    error,
    searchNumbers,
    filterByPattern,
    filterByPriceRange,
    sortNumbers,
    retry
  };
};
