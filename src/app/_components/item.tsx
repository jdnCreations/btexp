"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";

interface ItemProps {
  name: string;
  id: number;
  search?: boolean;
  onItemChecked: (id: number) => void;
}

const Item: React.FC<ItemProps> = ({ name, id, onItemChecked, search }) => {
  const markAsChecked = api.item.markChecked.useMutation({
    onSuccess: () => {
      onItemChecked(id);
    },
    onError: (error) => {
      console.error("Error marking item as checked: ", error);
    },
  });

  const handleMarkedAsChecked = async () => {
    markAsChecked.mutate({ itemId: id });
  };

  return (
    <div className="flex justify-between text-xl font-bold text-indigo-500">
      <p>{name}</p>
      {search ? null : <button onClick={handleMarkedAsChecked}>x</button>}
    </div>
  );
};

interface ItemListProps {
  items:
    | {
        id: number;
        name: string;
      }[]
    | undefined;
  search: boolean;
}

export const ItemList: React.FC<ItemListProps> = ({ items, search }) => {
  const [displayedItems, setDisplayedItems] = useState(items);

  const handleItemChecked = (checkedItemId: number) => {
    // Filter out the checked item from displayedItems
    const updatedItems = displayedItems?.filter(
      (item) => item.id !== checkedItemId,
    );
    setDisplayedItems(updatedItems);
  };

  return (
    <div>
      {displayedItems?.map((item) => (
        <Item
          key={item.id}
          name={item.name}
          id={item.id}
          onItemChecked={handleItemChecked}
          search={search}
        />
      ))}
    </div>
  );
};

export default Item;
