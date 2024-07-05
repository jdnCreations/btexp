"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";
import { ItemList } from "./item";
import { useSearchItems } from "../helpers/useSearchItems";

export function SearchItems({ clickable }: { clickable: boolean }) {
  const { query, data, isLoading, error, handleSearch } = useSearchItems();
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search items..."
        className="rounded border p-2 font-bold text-purple-950"
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <ItemList items={data} search={true} clickable={clickable} />}
    </div>
  );
}
