"use client";

import {
  Sprout,
  Search,
  Flower2,
  Apple,
  Leaf,
  TreePine,
  Trees,
  Flower,
  X,
} from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { name: "All", icon: Sprout },
  { name: "Flower", icon: Flower2 },
  { name: "Fruit", icon: Apple },
  { name: "Medicinal", icon: Leaf },
  { name: "Timber", icon: TreePine },
  { name: "Shade", icon: Trees },
  { name: "Ornamental", icon: Flower },
  { name: "Bamboo", icon: Sprout },
];

const UpcommingHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const currentCategory = searchParams.get("category") || "All";
  const currentSearch = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState(currentCategory);
  const [isSearchOpen, setIsSearchOpen] = useState(Boolean(currentSearch));
  const [searchValue, setSearchValue] = useState(currentSearch);


  const updateQueryParams = (newCategory, newSearch) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newCategory && newCategory !== "All") {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }

    if (newSearch && newSearch.trim() !== "") {
      params.set("search", newSearch.trim());
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    updateQueryParams(categoryName, searchValue);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    updateQueryParams(activeCategory, val);
  };

  return (
    <div>
      <div className="mb-7 sm:mb-9">
        <div className="flex items-center justify-between gap-3">
          {/* LEFT CONTENT */}
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold tracking-wide text-emerald-700 sm:px-4 sm:py-1.5 sm:text-xs">
              <Sprout className="size-3 sm:size-3.5" />
              GROW TOGETHER, GO GREENER
            </span>

            <h1 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 sm:mt-4 sm:text-4xl">
              Upcoming <span className="text-emerald-600">Events</span>
            </h1>

            <p className="mt-1.5 max-w-2xl text-[10px] leading-relaxed text-slate-500 sm:mt-2 sm:text-base">
              Discover upcoming tree-planting events and be part of a greener
              tomorrow.
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative mt-8 flex shrink-0 items-center sm:mt-8">
            {isSearchOpen && (
              <input
                type="text"
                autoFocus
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search events..."
                className="mr-2 h-10 w-[140px] rounded-full border border-emerald-200 bg-white px-4 text-xs text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 sm:w-[220px] sm:text-sm"
              />
            )}

            <button
              type="button"
              onClick={() => {
                if (isSearchOpen && searchValue) {
                  setSearchValue("");
                  updateQueryParams(activeCategory, "");
                }
                setIsSearchOpen((prev) => !prev);
              }}
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md shadow-emerald-700/20 transition-all duration-300 hover:bg-emerald-400 sm:size-11"
            >
              {isSearchOpen ? (
                <X className="size-4 sm:size-5" />
              ) : (
                <Search className="size-4 sm:size-5" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-5 h-px w-full bg-emerald-100" />
      </div>

      {/* CATEGORY FILTER */}
      <div className="mb-7 sm:mb-9">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 sm:text-lg">
              Explore Categories
            </h2>

            <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">
              Choose your favorite plant category
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-bold text-emerald-700 sm:text-xs">
            {categories.length} Categories
          </span>
        </div>

        {/* CATEGORY BUTTONS */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.name;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => handleCategoryClick(category.name)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[10px] font-bold transition-all duration-300 sm:gap-2.5 sm:px-5 sm:py-3 sm:text-xs ${
                  isActive
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-700/20"
                    : "border-emerald-100 bg-white text-slate-600 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <Icon className="size-3.5 sm:size-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UpcommingHeader;