"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

export default function WardrobePage() {
  const [clothes, setClothes] =
    useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] =
    useState<string>("");
  const [showModal, setShowModal] =
    useState(false);

  const [pendingImageUrl, setPendingImageUrl] =
    useState("");

  const [clothingName, setClothingName] =
    useState("");

  const [category, setCategory] =
    useState("Top Wear");
  const [selectedCategory, setSelectedCategory] =
    useState("");
  const topWear =
    clothes.filter(
      (item) => item.category === "Top Wear"
    );

  const bottomWear =
    clothes.filter(
      (item) => item.category === "Bottom Wear"
    );

  const footwear =
    clothes.filter(
      (item) => item.category === "Footwear"
    );

  const accessories =
    clothes.filter(
      (item) => item.category === "Accessories"
    );
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUserId(user.id);

    loadClothes(user.id);
  };
  const loadClothes = async (
    currentUserId: string
  ) => {
    const { data, error } = await supabase
      .from("clothes")
      .select("*")
      .eq("user_id", currentUserId);

    if (error) {
      console.error(error);
      return;
    }

    setClothes(data || []);
  };
  const deleteClothing = async (
    clothingId: string
  ) => {
    console.log("DELETE CLICKED", clothingId);

    const { error } = await supabase
      .from("clothes")
      .delete()
      .eq("id", clothingId);

    if (error) {
      alert(error.message);
      console.error(error);
      return;
    }

    alert("Deleted");

    loadClothes(userId);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files) return;

    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const fileName =
        `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;

      const { error } = await supabase.storage
        .from("clothes")
        .upload(fileName, file);

      if (error) {
        console.error(error);
        continue;
      }

      const { data } = supabase.storage
        .from("clothes")
        .getPublicUrl(fileName);

      setPendingImageUrl(data.publicUrl);

      setClothingName("");

      setShowModal(true);
      
    }

    loadClothes(userId);

    setUploading(false);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white p-10">
      <Navbar />
      <div className="flex items-start justify-between mt-6">
        <div>
          <h1 className="text-5xl font-bold">
            My Wardrobe
          </h1>

          <p className="text-gray-400 mt-3">
            Upload and manage your clothing collection.
          </p>
        </div>

        <div>
        <input
          id="clothes-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <label
          htmlFor="clothes-upload"
          className="
            inline-flex
            items-center
            gap-2
            px-5
            py-3
            rounded-full
            bg-white/5
            border
            border-white/10
            backdrop-blur-xl
            cursor-pointer
            hover:border-purple-500
            hover:bg-white/10
            transition-all
          "
        >
          <span className="text-lg">+</span>
          <span>Add Clothing</span>
        </label>
        {uploading && (
          <p className="mt-3 text-purple-400">
            Uploading...
          </p>
        )}
          </div>
        </div>
      {selectedCategory === "" && (
        <div className="grid md:grid-cols-2 gap-6 mt-12">

          <div
            onClick={() => setSelectedCategory("Top Wear")}
            className="
              bg-white/5
              backdrop-blur-xl
              rounded-3xl
              p-5
              min-h-[180px]
              border
              border-white/10
              cursor-pointer
              hover:border-purple-500
              hover:bg-white/10
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            <h2 className="text-2xl font-semibold">
              Top Wear
            </h2>

            <p className="text-gray-400 mt-2">
              {topWear.length} Items
            </p>

            <div className="flex flex-row items-center mt-6">
              {topWear.slice(0, 3).map((item, index) => (
                <img
                  key={item.id}
                  src={item.image_url}
                  alt=""
                  className="
                    w-20
                    h-20
                    object-cover
                    rounded-2xl
                    border
                    border-white/10
                    shadow-lg
                  "
                  style={{
                    marginLeft: index === 0 ? 0 : -18,
                    zIndex: 10 - index,
                  }}
                />
              ))}
            </div>

            <div className="mt-5 text-purple-400">
              View Collection →
            </div>
          </div>

          <div
            onClick={() => setSelectedCategory("Bottom Wear")}
            className="
              bg-white/5
              backdrop-blur-xl
              rounded-3xl
              p-5
              min-h-[180px]
              border
              border-white/10
              cursor-pointer
              hover:border-blue-500
              hover:bg-white/10
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            <h2 className="text-2xl font-semibold">
              Bottom Wear
            </h2>

            <p className="text-gray-400 mt-2">
              {bottomWear.length} Items
            </p>

            <div className="flex flex-row items-center mt-6">
              {bottomWear.slice(0, 3).map((item, index) => (
                <img
                  key={item.id}
                  src={item.image_url}
                  alt=""
                  className="
                    w-20
                    h-20
                    object-cover
                    rounded-2xl
                    border
                    border-white/10
                    shadow-lg
                  "
                  style={{
                    marginLeft: index === 0 ? 0 : -18,
                    zIndex: 10 - index,
                  }}
                />
              ))}
            </div>

            <div className="mt-5 text-blue-400">
              View Collection →
            </div>
          </div>

          <div
            onClick={() => setSelectedCategory("Footwear")}
            className="
              bg-white/5
              backdrop-blur-xl
              rounded-3xl
              p-5
              min-h-[180px]
              border
              border-white/10
              cursor-pointer
              hover:border-green-500
              hover:bg-white/10
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            <h2 className="text-2xl font-semibold">
              Footwear
            </h2>

            <p className="text-gray-400 mt-2">
              {footwear.length} Items
            </p>

            <div className="flex flex-row items-center mt-6">
              {footwear.slice(0, 3).map((item, index) => (
                <img
                  key={item.id}
                  src={item.image_url}
                  alt=""
                  className="
                    w-20
                    h-20
                    object-cover
                    rounded-2xl
                    border
                    border-white/10
                    shadow-lg
                  "
                  style={{
                    marginLeft: index === 0 ? 0 : -18,
                    zIndex: 10 - index,
                  }}
                />
              ))}
            </div>

            <div className="mt-5 text-green-400">
              View Collection →
            </div>
          </div>

          <div
            onClick={() => setSelectedCategory("Accessories")}
            className="
              bg-white/5
              backdrop-blur-xl
              rounded-3xl
              p-5
              min-h-[180px]
              border
              border-white/10
              cursor-pointer
              hover:border-orange-500
              hover:bg-white/10
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            <h2 className="text-2xl font-semibold">
              Accessories
            </h2>

            <p className="text-gray-400 mt-2">
              {accessories.length} Items
            </p>

            <div className="flex flex-row items-center mt-6">
              {accessories.slice(0, 3).map((item, index) => (
                <img
                  key={item.id}
                  src={item.image_url}
                  alt=""
                  className="
                    w-20
                    h-20
                    object-cover
                    rounded-2xl
                    border
                    border-white/10
                    shadow-lg
                  "
                  style={{
                    marginLeft: index === 0 ? 0 : -18,
                    zIndex: 10 - index,
                  }}
                />
              ))}
            </div>
              {accessories.slice(0, 3).map((item, index) => (
                <img
                  key={item.id}
                  src={item.image_url}
                  alt=""
                  className="
                    w-20
                    h-20
                    object-cover
                    rounded-2xl
                    border
                    border-white/10
                    shadow-lg
                  "
                  style={{
                    marginLeft: index === 0 ? 0 : -18,
                    zIndex: 10 - index,
                  }}
                />
              ))}
            

            <div className="mt-5 text-orange-400">
              View Collection →
            </div>
          </div>

        </div>
      )}
      {selectedCategory !== "" && (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {clothes
          .filter(
            (item) =>
              item.category === selectedCategory
          )
          .map((item) => (
          <div
            key={item.id}
            className="bg-[#13131A] p-4 rounded-3xl border border-transparent hover:border-purple-500 hover:scale-[1.02] transition-all duration-300"
          >
            <img
              src={item.image_url}
              alt={item.name}
              className="rounded-2xl w-full h-64 object-cover shadow-lg"
            />

            <p className="mt-3 text-white font-medium truncate">
              {item.name}
            </p>

            <button
              onClick={() => deleteClothing(item.id)}
              className="mt-3 w-full bg-red-600 hover:bg-red-700 px-3 py-2 rounded-xl transition-all"
            >
              Delete
            </button>
          </div>
        ))}
          </div>
      
      )}
      
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#13131A]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-md">

            <h2 className="text-3xl font-bold mb-6">
              Add Clothing
            </h2>

            <img
              src={pendingImageUrl}
              alt="Preview"
              className="w-full h-64 object-cover rounded-2xl mb-6"
            />

            <input
              value={clothingName}
              onChange={(e) =>
                setClothingName(e.target.value)
              }
              placeholder="Clothing Name"
              className="w-full bg-[#1C1C24] p-4 rounded-xl mb-4"
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full bg-[#1C1C24] p-4 rounded-xl mb-6"
            >
              <option>Top Wear</option>
              <option>Bottom Wear</option>
              <option>Footwear</option>
              <option>Accessories</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-700 py-3 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  const { error } = await supabase
                    .from("clothes")
                    .insert({
                      user_id: userId,
                      name: clothingName,
                      image_url: pendingImageUrl,
                      category: category,
                    });

                  if (error) {
                    alert(error.message);
                    return;
                  }

                  setShowModal(false);

                  setClothingName("");

                  setCategory("Top Wear");

                  loadClothes(userId);
                }}
                className="flex-1 bg-purple-600 py-3 rounded-xl"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}