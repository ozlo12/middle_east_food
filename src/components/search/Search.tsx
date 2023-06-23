"use client";

import SearchIcon from "@/icons/Search";
import fuzzy from "fuzzy";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounced from "@/hooks/use-debounced";
import classes from "./Search.module.scss";

interface SearchProps {
  products: { title: string; id: string }[];
}

const searchOptions = {
  extract(el: { title: string; id: string }) {
    return el.title.toLowerCase();
  },
};
export default function Search({ products }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredProducts, setFilteredProducts] = useState<typeof products>([]);

  const { debouned } = useDebounced(500);

  const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(ev.target.value);
  };

  useEffect(() => {
    debouned(() => {
      if (!searchTerm.trim()) return setFilteredProducts([]);
      const results = fuzzy.filter(
        searchTerm.toLowerCase(),
        products,
        searchOptions
      );
      const matches = results.map((e) => e.original);
      setFilteredProducts([...matches].slice(0, 5));
    });
  }, [searchTerm, products]);

  return (
    <div className={classes.search}>
      <div className={`input-group `}>
        <span className="input-group-text">
          <SearchIcon />
        </span>
        <input
          onChange={handleInput}
          value={searchTerm}
          className="form-control"
          placeholder="Search Product"
        />
      </div>
      <div className={`list-group ${classes.search__box}`}>
        {filteredProducts.map((e) => (
          <Link className="list-group-item" href={"/meals/" + e.id}>
            {e.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
