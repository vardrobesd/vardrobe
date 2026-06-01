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

      uploadedUrls.push(data.publicUrl);
      const { error: dbError } = await supabase
        .from("clothes")
        .insert({
          user_id: userId,
          name: file.name,
          image_url: data.publicUrl,
        });

      if (dbError) {
        alert(dbError.message);
        console.error(dbError);
      }
    }

    loadClothes(userId);

    setUploading(false);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white p-10">
      <Navbar />
      <h1 className="text-5xl font-bold">My Wardrobe</h1>

      <p className="text-gray-400 mt-3">
        Upload and manage your clothing collection.
      </p>
      

      <div className="mt-8">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        {uploading && (
          <p className="mt-3 text-purple-400">
            Uploading...
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {clothes.map((item) => (
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
    </main>
  );
}