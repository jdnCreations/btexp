import AddItems from "~/app/_components/add-item";
import { getServerAuthSession } from "~/server/auth";

export default async function AllItems() {
  const session = await getServerAuthSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {session?.user ? (
        <div>
          <AddItems />
        </div>
      ) : (
        <div>
          Please <a href="api/auth/signin">login.</a>
        </div>
      )}
    </main>
  );
}
