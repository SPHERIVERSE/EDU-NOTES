import { useState } from "react";
import { Search, Filter, X } from "lucide-react";

export default function SearchBar({ onSearch, placeholder = "Search notes...", showModuleFilter = false }) {
  const [query, setQuery] = useState("");
  const [module, setModule] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = () => {
    onSearch(query, module);
  };

  const handleClear = () => {
    setQuery("");
    setModule("");
    onSearch("", "");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all duration-200">
          <Search className="w-5 h-5 text-gray-400 ml-4" />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500"
          />
          
          {showModuleFilter && (
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`p-2 mr-2 rounded-lg transition-colors duration-200 ${
                isFilterOpen || module 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
          )}
          
          {(query || module) && (
            <button
              onClick={handleClear}
              className="p-2 mr-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          
          <button
            onClick={handleSearch}
            className="btn-primary mr-2 py-2 px-4 text-sm"
          >
            Search
          </button>
        </div>

        {/* Module Filter Dropdown */}
        {showModuleFilter && isFilterOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-slide-up z-10">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Module
            </label>
            <input
              type="text"
              placeholder="Enter module name..."
              value={module}
              onChange={(e) => setModule(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field"
            />
          </div>
        )}
      </div>
    </div>
  );
}
