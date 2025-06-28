
import { supabase } from "@/integrations/supabase/client";

export interface VIPNumbersResponse {
  data: any[];
  total: number;
  success: boolean;
}

export const vipNumbersApi = {
  async getVIPNumbers(): Promise<VIPNumbersResponse> {
    try {
      const { data, error, count } = await supabase
        .from('vip_number_flags')
        .select('*', { count: 'exact' });
      
      if (error) throw error;
      
      return {
        data: data || [],
        total: count || 0,
        success: true
      };
    } catch (error) {
      console.error('Error fetching VIP numbers:', error);
      throw new Error("Failed to fetch VIP numbers. Please try again.");
    }
  },

  async searchVIPNumbers(searchType: string, searchValue: string): Promise<VIPNumbersResponse> {
    try {
      let query = supabase.from('vip_number_flags').select('*', { count: 'exact' });

      if (searchValue) {
        const searchValueWithoutSpaces = searchValue.replace(/\s/g, "");
        
        switch (searchType) {
          case "startWith":
            query = query.like('mobile_number', `${searchValueWithoutSpaces}%`);
            break;
          case "endWith":
            query = query.like('mobile_number', `%${searchValueWithoutSpaces}`);
            break;
          case "anywhere":
          default:
            query = query.like('mobile_number', `%${searchValueWithoutSpaces}%`);
            break;
        }
      }

      const { data, error, count } = await query;
      
      if (error) throw error;

      return {
        data: data || [],
        total: count || 0,
        success: true
      };
    } catch (error) {
      console.error('Error searching VIP numbers:', error);
      throw new Error("Search failed. Please try again.");
    }
  },

  async getVIPByPattern(patternFlag: string): Promise<VIPNumbersResponse> {
    try {
      const { data, error } = await supabase
        .rpc('get_vip_by_pattern', { pattern_flag: patternFlag });
      
      if (error) throw error;
      
      return {
        data: data || [],
        total: data?.length || 0,
        success: true
      };
    } catch (error) {
      console.error('Error fetching VIP numbers by pattern:', error);
      throw new Error("Failed to fetch VIP numbers by pattern. Please try again.");
    }
  },

  async getVIPByPriceRange(minPrice: number, maxPrice: number): Promise<VIPNumbersResponse> {
    try {
      const { data, error, count } = await supabase
        .from('vip_number_flags')
        .select('*', { count: 'exact' })
        .gte('discounted_price', minPrice)
        .lte('discounted_price', maxPrice);
      
      if (error) throw error;
      
      return {
        data: data || [],
        total: count || 0,
        success: true
      };
    } catch (error) {
      console.error('Error fetching VIP numbers by price range:', error);
      throw new Error("Failed to fetch VIP numbers by price range. Please try again.");
    }
  }
};
