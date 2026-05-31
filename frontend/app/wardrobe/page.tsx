"use client";

import { useState } from "react";

export default function WardrobePage() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white p-10">
      <h1 className="text-5xl font-bold">My Wardrobe</h1>

      <p className="text-gray-400 mt-3">
        Upload clothing items to your wardrobe.
      </p>

      <div className="mt-10">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {image && (
        <div className="mt-10">
          <img
            src={image}
            alt="Uploaded clothing"
            className="w-64 rounded-3xl"
          />
        </div>
      )}
    </main>
  );
}