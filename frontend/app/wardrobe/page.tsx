export default function WardrobePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white p-10">
      <h1 className="text-5xl font-bold">My Wardrobe</h1>

      <p className="text-gray-400 mt-3">
        Manage your clothing collection.
      </p>

      <div className="grid md:grid-cols-4 gap-6 mt-10">
        <div className="bg-[#13131A] p-8 rounded-3xl">
          <h2 className="text-xl font-semibold">👕 Shirts</h2>
          <p className="text-gray-400 mt-2">0 Items</p>
        </div>

        <div className="bg-[#13131A] p-8 rounded-3xl">
          <h2 className="text-xl font-semibold">👖 Pants</h2>
          <p className="text-gray-400 mt-2">0 Items</p>
        </div>

        <div className="bg-[#13131A] p-8 rounded-3xl">
          <h2 className="text-xl font-semibold">👟 Shoes</h2>
          <p className="text-gray-400 mt-2">0 Items</p>
        </div>

        <div className="bg-[#13131A] p-8 rounded-3xl">
          <h2 className="text-xl font-semibold">🧥 Jackets</h2>
          <p className="text-gray-400 mt-2">0 Items</p>
        </div>
      </div>

      <button className="mt-10 bg-purple-600 px-6 py-3 rounded-xl">
        Upload Clothing
      </button>
    </main>
  );
}
