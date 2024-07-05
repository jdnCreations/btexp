import { useState } from "react";
import { api } from "~/trpc/react";

export function useSearchItems() {
  const [query, setQuery] = useState("");
  const { data, isLoading, error } = api.item.search.useQuery(
    {
      query,
    },
    {
      enabled: query !== "",
    },
  );

  console.log("Query:", query);
  console.log("Data:", data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Search Input:", e.target.value);
    setQuery(e.target.value);
  };

  return { query, data, isLoading, error, handleSearch };
}
