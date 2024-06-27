"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";
import { ItemList } from "./item";

export function SearchItems() {
  const [query, setQuery] = useState("");
  const { data, isLoading, error } = api.item.search.useQuery({
    query,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search items..."
        className="rounded border p-2 font-bold text-purple-950"
      />
      {data && <ItemList items={data} search={true} />}
    </div>
  );
}
