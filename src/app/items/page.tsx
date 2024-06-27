import { getServerAuthSession } from "~/server/auth";
import { ShowItems } from "../_components/show-items";
import { SearchItems } from "../_components/search-items";

export default async function AllItems() {
  const session = await getServerAuthSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {session?.user ? (
        <div>
          <SearchItems />
          <ShowItems />
        </div>
      ) : (
        <div>
          Please <a href="api/auth/signin">login.</a>
        </div>
      )}
    </main>
  );
}
