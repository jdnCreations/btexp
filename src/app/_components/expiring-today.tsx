"use client";
import { api } from "~/trpc/react";
import { ItemList } from "./item";

const ExpiringToday = () => {
  const { data, error, isLoading } = api.item.getExpiringToday.useQuery();
  let expiredItems = false;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data?.length && data.length > 0) {
    expiredItems = true;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      {expiredItems ? (
        <>
          <p>
            The following items have expired or are expiring today and need to
            be checked
          </p>
          <ItemList items={data} search={false} />
        </>
      ) : (
        <p>No items to check today :)</p>
      )}
    </>
  );
};

export default ExpiringToday;
