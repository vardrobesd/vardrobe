export default function TryOnPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white p-10">
      <h1 className="text-5xl font-bold">Try-On Studio</h1>

      <p className="text-gray-400 mt-3">
        Generate realistic AI outfit previews.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        
        <div className="bg-[#13131A] rounded-3xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Wardrobe
          </h2>

          <div className="space-y-3">
            <div className="bg-[#1C1C24] p-4 rounded-xl">
              Blue Shirt
            </div>

            <div className="bg-[#1C1C24] p-4 rounded-xl">
              Black Jeans
            </div>

            <div className="bg-[#1C1C24] p-4 rounded-xl">
              White Sneakers
            </div>
          </div>
        </div>

        <div className="bg-[#13131A] rounded-3xl p-6 flex items-center justify-center min-h-[450px]">
          <div className="text-center">
            <div className="w-40 h-60 bg-[#1C1C24] rounded-3xl mx-auto"></div>

            <p className="text-gray-400 mt-4">
              User Model Preview
            </p>
          </div>
        </div>

        <div className="bg-[#13131A] rounded-3xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Generate
          </h2>

          <button className="w-full bg-purple-600 py-3 rounded-xl">
            Generate Look
          </button>

          <p className="text-gray-400 text-sm mt-4">
            AI generated outfit will appear here.
          </p>
        </div>

      </div>
    </main>
  );
}
