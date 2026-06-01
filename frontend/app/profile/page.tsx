"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {

  const [bodyImage, setBodyImage] =
    useState<string | null>(null);

  const [faceImage, setFaceImage] =
    useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [userId, setUserId] =
    useState<string>("");
  useEffect(() => {
    getUser();
  }, []);
  const loadModel = async (
    currentUserId: string
  ) => {
    const { data, error } = await supabase
      .from("user_models")
      .select("*")
      .eq("user_id", currentUserId)
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .single();

    if (error || !data) return;

    setBodyImage(data.body_photo_url);
    setFaceImage(data.face_photo_url);
  };
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUserId(user.id);
      loadModel(user.id);
    }
    
  };

  const uploadBodyPhoto = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const fileName =
      `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;

    const { error } = await supabase.storage
      .from("user-models")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("user-models")
      .getPublicUrl(fileName);

    setBodyImage(data.publicUrl);
  };
  const uploadFacePhoto = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const fileName =
      `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;

    const { error } = await supabase.storage
      .from("user-models")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("user-models")
      .getPublicUrl(fileName);

    setFaceImage(data.publicUrl);
  };
  const saveModel = async () => {
    if (!bodyImage || !faceImage) {
      alert("Upload both images first");
      return;
    }

    const { error } = await supabase
      .from("user_models")
      .insert({
        user_id: userId,
        body_photo_url: bodyImage,
        face_photo_url: faceImage,
      });

    if (error) {
      alert(error.message);
      return;
    }

    setSaved(true);
  };
  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white p-10">
      <Navbar />
      <h1 className="text-5xl font-bold">
        My Model
      </h1>

      <p className="text-gray-400 mt-3">
        Upload your body and face photos.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div className="bg-[#13131A] p-6 rounded-3xl border border-transparent hover:border-purple-500 transition-all">
          <h2 className="text-2xl font-bold">
            Body Photo
          </h2>

          <input
            type="file"
            className="mt-4"
            accept="image/*"
            onChange={uploadBodyPhoto}
          />
          {bodyImage && (
            <img
              src={bodyImage}
              alt="Body"
              className="mt-4 rounded-2xl w-full h-[400px] object-cover shadow-xl"
            />
          )}
        </div>

        <div className="bg-[#13131A] p-6 rounded-3xl border border-transparent hover:border-purple-500 transition-all">
          <h2 className="text-2xl font-bold">
            Face Photo
          </h2>

          <input
            type="file"
            className="mt-4"
            accept="image/*"
            onChange={uploadFacePhoto}
          />
          {faceImage && (
            <img
              src={faceImage}
              alt="Face"
              className="mt-4 rounded-2xl w-full h-[400px] object-cover shadow-xl"
            />
          )}
        </div>
      </div>
      <div className="mt-8">
      <button
        onClick={saveModel}
        className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl transition-all text-lg font-semibold"
      >
        Save Model
      </button>

      {saved && (
        <p className="text-green-400 mt-4 text-lg font-medium">
          Model saved successfully
        </p>
      )}
    </div>
    </main>
  );
}