"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { api } from "~/trpc/react";

export default function AddItems() {
  const { data, isLoading, error } = api.item.getAll.useQuery();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (isSubmitted && inputRef.current) {
      inputRef.current.focus();
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  const createItem = api.item.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setDate(new Date());
    },
  });

  return (
    <>
      <div>
        <h1 className="flex items-center justify-center pb-4 text-lg font-bold">
          Add Products
        </h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (date == null) return;
          const expiryDate = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
          );
          createItem.mutate({ name, expiryDate });
          setIsSubmitted(true);
        }}
        className="flex flex-col gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full border-none px-4 py-2 text-black focus:outline-none focus:ring"
        />
        <DatePicker
          onChange={(date: Date | null) => setDate(date)}
          className=" rounded-full px-4 py-2 text-black focus:outline-none focus:ring"
          selected={date}
          placeholderText="Expiry Date"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createItem.isPending}
        >
          {createItem.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}
