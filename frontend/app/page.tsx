import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white">
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-3xl font-bold text-purple-500">
          Vardrobe
        </h1>

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

      <section
        className="relative flex flex-col items-center justify-center text-center mt-24 px-6"
      >
        <div className="hero-glow" />
        <h1 className="text-8xl font-medium tracking-[-0.05em] max-w-5xl leading-none">
          YOUR DIGITAL
          <br />
          WARDROBE.
          <br />
          <span className="gradient-text">
            POWERED BY AI.
          </span>
        </h1>

        <p className="text-gray-400 text-xl mt-8 max-w-2xl">
          Upload your clothes. Try them on instantly.
          Build your digital wardrobe.
        </p>

        <div className="flex gap-4 mt-10">
          <Link href="/signup">
            <button className="gradient-button px-6 py-3 rounded-xl text-white">
              Get Started
            </button>
          </Link>

          <button className="border border-gray-700 px-6 py-3 rounded-xl">
            Watch Demo
          </button>
        </div><div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl">
        <div className="bg-[#13131A] p-6 rounded-3xl hover:scale-105 hover:border hover:border-purple-500 transition-all duration-300">
          <h3 className="font-semibold">Upload Photo</h3>
        </div>

        <div className="bg-[#13131A] p-6 rounded-3xl hover:scale-105 hover:border hover:border-purple-500 transition-all duration-300">
          <h3 className="font-semibold">Upload Clothes</h3>
        </div>

        <div className="bg-[#13131A] p-6 rounded-3xl hover:scale-105 hover:border hover:border-purple-500 transition-all duration-300">
          <h3 className="font-semibold">AI Try-On</h3>
        </div>

        <div className="bg-[#13131A] p-6 rounded-3xl hover:scale-105 hover:border hover:border-purple-500 transition-all duration-300">
          <h3 className="font-semibold">Save Looks</h3>
        </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl w-full">
        <div className="bg-[#13131A] p-8 rounded-3xl">
          <h2 className="text-4xl font-bold">
            AI
          </h2>
          <p className="text-gray-400 mt-2">
            Virtual Try-On
          </p>
        </div>

        <div className="bg-[#13131A] p-8 rounded-3xl">
          <h2 className="text-4xl font-bold">
            100%
          </h2>
          <p className="text-gray-400 mt-2">
            Digital Wardrobe
          </p>
        </div>

        <div className="bg-[#13131A] p-8 rounded-3xl">
          <h2 className="text-4xl font-bold">
            24/7
          </h2>
          <p className="text-gray-400 mt-2">
            Outfit Planning
          </p>
        </div>
      </div>
      
        
      </section>
    </main>
  );
}