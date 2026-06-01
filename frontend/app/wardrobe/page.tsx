"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WardrobePage() {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

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
    }

    setImages((prev) => [...prev, ...uploadedUrls]);

    setUploading(false);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white p-10">
      <h1 className="text-5xl font-bold">My Wardrobe</h1>

      <p className="text-gray-400 mt-3">
        Upload and manage your clothing collection.
      </p>
      <button
        className="bg-purple-600 px-4 py-2 rounded-xl mt-4"
        onClick={async () => {
            const { data, error } = await supabase
            .storage
            .from("clothes")
            .list();

            console.log("DATA:", data);
            console.log("ERROR:", error);
        }}
        >
        Test Supabase
        </button>

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
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-[#13131A] p-4 rounded-3xl"
          >
            <img
              src={image}
              alt={`Clothing ${index}`}
              className="rounded-2xl w-full h-64 object-cover"
            />

            <p className="mt-3 text-gray-300">
              Clothing Item {index + 1}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}