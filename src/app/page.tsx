import { getServerAuthSession } from "~/server/auth";

import ExpiringToday from "./_components/expiring-today";
import { SearchItems } from "./_components/search-items";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b  from-slate-900 to-[#15162c] pt-8 text-white">
      {session?.user ? (
        <div>
          <div className="pb-4">
            <Link
              href={"items/add"}
              className="text-xl font-bold text-blue-500"
            >
              Add new Products
            </Link>
          </div>
          <ExpiringToday />

          <div className="py-6">
            <p>Search for existing Items</p>
            <SearchItems />
          </div>
        </div>
      ) : (
        <div>
          Please <a href="api/auth/signin">login.</a>
        </div>
      )}
    </main>
  );
}
