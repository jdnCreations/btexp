import Link from "next/link";

const HelpPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-black text-white">
      <h1 className="text-2xl font-bold">
        Here is how to use the BT Expiry List.
      </h1>

      <div className="flex gap-1">
        <p>When stock comes in, add all items in using </p>
        <Link href={"/items/add"} className="font-bold text-blue-500">
          Add items
        </Link>
      </div>

      <div>
        <p>
          On the{" "}
          <Link className="font-bold text-blue-500" href={"/"}>
            Home{" "}
          </Link>
          page, you will see a list of Products that are needing to be checked.
        </p>
        <p>
          These items are either past or on their expiry/best before/use by
          date.
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
