"use client";

import { api } from "~/trpc/react";
import { ItemList } from "./item";

export function ShowItems() {
  const { data, isLoading, error } = api.item.getAll.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <ItemList items={data} search={false} />;
}
