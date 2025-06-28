
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowDown, ArrowUp } from "lucide-react";

export interface SearchSortProps {
  onSearch: (searchType: string, searchValue: string) => void;
  onSort: (sortType: string) => void;
}

export const SearchSortControls = ({ onSearch, onSort }: SearchSortProps) => {
  const [searchType, setSearchType] = useState("anywhere");
  const [searchValue, setSearchValue] = useState("");
  const [sortType, setSortType] = useState("");

  const handleSearch = () => {
    onSearch(searchType, searchValue);
  };

  const handleSortChange = (value: string) => {
    setSortType(value);
    onSort(value);
  };

  return (
    <div className="mb-6 space-y-4 md:space-y-0 md:flex md:space-x-4 md:items-end">
      <div className="space-y-2 flex-1">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium">Search Type</p>
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger>
                <SelectValue placeholder="Select search type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anywhere">Anywhere</SelectItem>
                <SelectItem value="startWith">Start With</SelectItem>
                <SelectItem value="endWith">End With</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium">Enter Number Pattern</p>
            <Input
              type="text"
              placeholder="Enter number pattern..."
              value={searchValue}
              onChange={(e) => {
                // Only allow numerical input
                const value = e.target.value.replace(/[^0-9]/g, "");
                setSearchValue(value);
              }}
            />
          </div>
          
          <Button 
            className="mt-2 sm:mt-0" 
            onClick={handleSearch}
          >
            <Search className="mr-2 h-4 w-4" />
            Search Number
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Sort By</p>
        <Select value={sortType} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="highToLow">
              Price: High to Low
              <ArrowDown className="ml-2 h-4 w-4 inline" />
            </SelectItem>
            <SelectItem value="lowToHigh">
              Price: Low to High
              <ArrowUp className="ml-2 h-4 w-4 inline" />
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
