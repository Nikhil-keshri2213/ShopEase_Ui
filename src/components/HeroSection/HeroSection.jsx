import React from "react";
import HeroImg from "../../assets/img/hero-2.jpg";

function HeroSection() {
  return (
    <div className="relative flex items-center justify-start h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HeroImg})` }}></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

      <main className="relative z-10 px-6 lg:px-24 max-w-2xl">
        <h2 className="text-sm uppercase tracking-widest text-gray-200 font-medium">
          T-shirt / Top
        </h2>

        <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
          Summer <br /> Value Pack
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-gray-200 drop-shadow-md">
          Cool / Colorful / Comfy
        </p>

        <button className="mt-8 w-60 h-14 bg-white backdrop-blur-sm text-black font-semibold rounded-2xl shadow-md hover:bg-black hover:text-white transition duration-300">
          Explore Now
        </button>
      </main>
    </div>
  );
}

export default HeroSection;
