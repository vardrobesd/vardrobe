import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white">
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold">V.</h1>

        <div className="flex gap-6 items-center">
          <button>Features</button>
          <button>About</button>

          <Link href="/login">
            <button>Login</button>
          </Link>

          <Link href="/signup">
            <button className="bg-purple-600 px-4 py-2 rounded-xl">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center mt-24 px-6">
        <h1 className="text-6xl font-bold max-w-4xl">
          YOUR WARDROBE.
          <br />
          YOUR BODY.
          <br />
          POWERED BY AI.
        </h1>

        <p className="text-gray-400 text-xl mt-8 max-w-2xl">
          Upload your clothes. Try them on instantly.
          Build your digital wardrobe.
        </p>

        <div className="flex gap-4 mt-10">
          <button className="bg-purple-600 px-6 py-3 rounded-xl">
            Get Started
          </button>

          <button className="border border-gray-700 px-6 py-3 rounded-xl">
            Watch Demo
          </button>
        </div><div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl">
        <div className="bg-[#13131A] p-6 rounded-3xl">
          <h3 className="font-semibold">Upload Photo</h3>
        </div>

        <div className="bg-[#13131A] p-6 rounded-3xl">
          <h3 className="font-semibold">Upload Clothes</h3>
        </div>

        <div className="bg-[#13131A] p-6 rounded-3xl">
          <h3 className="font-semibold">AI Try-On</h3>
        </div>

        <div className="bg-[#13131A] p-6 rounded-3xl">
          <h3 className="font-semibold">Save Looks</h3>
        </div>
      </div>
        
      </section>
    </main>
  );
}