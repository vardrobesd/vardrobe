"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TryOnPage() {
  const [bodyImage, setBodyImage] =
    useState<string>("");
  const [clothes, setClothes] =
    useState<any[]>([]);
  const [selectedClothing, setSelectedClothing] =
    useState<any>(null);
  const [loading, setLoading] =
    useState(false);

  const [generatedImage, setGeneratedImage] =
    useState<string>("");

  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("user_models")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .single();

    if (data) {
      setBodyImage(data.body_photo_url);
      const { data: clothesData } =
        await supabase
          .from("clothes")
          .select("*")
          .eq("user_id", user.id);

      if (clothesData) {
        setClothes(clothesData);
      }
    }
  };
  const generateLook = async () => {
    if (!selectedClothing) {
      alert("Select clothing first");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setGeneratedImage(
        selectedClothing.image_url
      );

      setLoading(false);
    }, 2000);
  };
  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white p-10">
      <Navbar />
      <h1 className="text-5xl font-bold">Try-On Studio</h1>

      <p className="text-gray-400 mt-3">
        Generate realistic AI outfit previews.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        
        <div className="bg-[#13131A] rounded-3xl p-6 border border-transparent hover:border-purple-500 transition-all">
          <h2 className="text-2xl font-bold mb-6">
            Wardrobe
          </h2>

          <div className="space-y-3">
            {clothes.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  setSelectedClothing(item)
                }
                className={`p-3 rounded-xl cursor-pointer ${
                  selectedClothing?.id === item.id
                    ? "bg-purple-600 ring-2 ring-purple-400"
                    : "bg-[#1C1C24]"
                }`}
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-lg"
                />

                <p className="mt-2 text-sm">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#13131A] rounded-3xl p-6 border border-transparent hover:border-purple-500 transition-all">
          <div className="text-center">
            {bodyImage ? (
              <img
                src={bodyImage}
                alt="Model"
                className="w-56 h-80 object-cover rounded-3xl mx-auto shadow-2xl"
              />
            ) : (
              <div className="w-40 h-60 bg-[#1C1C24] rounded-3xl mx-auto"></div>
            )}

            <p className="text-gray-400 mt-4">
              User Model Preview
            </p>
            {selectedClothing && (
              <p className="mt-2 text-purple-400">
                Selected:
                {" "}
                {selectedClothing.name}
              </p>
            )}
          </div>
        </div>

        <div className="bg-[#13131A] rounded-3xl p-6 border border-transparent hover:border-purple-500 transition-all">
          <h2 className="text-2xl font-bold mb-6">
            Generate
          </h2>

          <button
            onClick={generateLook}
            className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl transition-all text-lg font-semibold"
          >
            Generate Look
          </button>
          {loading && (
            <p className="mt-4 text-purple-400">
              Generating...
            </p>
          )}

          {generatedImage && (
            <img
              src={generatedImage}
              alt="Generated"
              className="mt-4 rounded-xl"
            />
          )}

          {selectedClothing ? (
            <div className="mt-4">
              <img
                src={selectedClothing.image_url}
                alt={selectedClothing.name}
                className="w-full h-64 object-cover rounded-2xl shadow-xl"
              />

              <p className="mt-2 text-sm">
                {selectedClothing.name}
              </p>
            </div>
          ) : (
            <p className="text-gray-400 text-sm mt-4">
              Select a clothing item first.
            </p>
          )}
        </div>

      </div>
    </main>
  );
}
