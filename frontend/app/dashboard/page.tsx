import { supabase } from "@/lib/supabase";
export default function DashboardPage() {
  console.log(supabase);
  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white p-10">
      <h1 className="text-5xl font-bold">Dashboard</h1>

      <p className="text-gray-400 mt-3">
        Welcome back to Vardrobe.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-10">
        <div className="bg-[#13131A] rounded-3xl p-6">
          <h2 className="text-3xl font-bold">0</h2>
          <p className="text-gray-400">Clothes Uploaded</p>
        </div>

        <div className="bg-[#13131A] rounded-3xl p-6">
          <h2 className="text-3xl font-bold">0</h2>
          <p className="text-gray-400">Try-Ons Generated</p>
        </div>

        <div className="bg-[#13131A] rounded-3xl p-6">
          <h2 className="text-3xl font-bold">1</h2>
          <p className="text-gray-400">Body Photos</p>
        </div>
      </div>
    </main>
  );
}