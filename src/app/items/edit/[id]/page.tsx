"use client";
import { useParams } from "next/navigation";
import DatePicker from "react-datepicker";
import { api } from "~/trpc/react";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface DateItem {
  id: number;
  date: Date;
  itemId: number | null;
}

interface ItemData {
  id: number;
  name: string;
  dates: DateItem[];
}

export default function EditPage() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [addDateError, setAddDateError] = useState("");
  const { id } = useParams();
  const router = useRouter();
  const utils = api.useUtils();
  const { data, isLoading } = api.item.getById.useQuery({
    id: parseInt(id as string),
  });

  const addDate = api.item.addDate.useMutation({
    onSuccess: async () => {
      await utils.item.getById.invalidate({ id: parseInt(id as string) });
      router.refresh();
      setDate(new Date());
      setAddDateError("");
    },
    onError: (e) => {
      console.log(e.message);
      setAddDateError(e.message);
    },
  });

  if (!data) {
    return <div>No data found.</div>;
  }

  const itemData: ItemData = data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date == null) return;
    const expiryDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    addDate.mutate({ date: expiryDate, id: parseInt(id as string) });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div>
        <p className="text-xl font-bold">{itemData?.name}</p>
        {itemData?.dates?.map((date) => {
          return (
            <p className="" key={date.id}>
              {date.date.toDateString()}
            </p>
          );
        })}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <DatePicker
            className="text-black placeholder:text-black"
            selected={date}
            onChange={(date: Date | null) => setDate(date)}
          />
          <button
            className="rounded-md bg-white p-2 font-bold text-slate-900 hover:bg-green-400"
            type="submit"
          >
            Add Date
          </button>
          {addDateError && (
            <p className="rounded-md bg-red-800 p-2 font-bold text-red-400">
              {addDateError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
