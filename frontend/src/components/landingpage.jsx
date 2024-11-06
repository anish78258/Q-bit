import React from 'react';

export default function HeroSection6() {
    return (
      <div className="fixed overflow-hidden w-screen h-screen text-white">
        <div className="absolute inset-0 -z-0 opacity-90 w-full min-h-screen">
          <img src="/4k-space-background-8i7qa8k0drvwnv35.jpg" className="object-cover w-full h-full" alt="Background" />
        </div>
  
        <div className="flex justify-between w-full items-center relative z-10 px-2 sm:px-10 py-3">
          <div className="flex">
            <h1 className="text-lg sm:text-2xl font-bold">Q-BIT</h1>
          </div>
        <div>
          <button className="mr-4 text-sm sm:text-lg px-4 sm:px-0 sm:w-[200px] h-[48px] border-white border">
            ABOUT US
          </button>
          <button className="text-sm sm:text-lg px-4 sm:px-0 sm:w-[200px] h-[48px] border-white border">
            LOGIN
          </button>
        </div>
        </div>
  
        <div className="relative z-10 h-[80vh] flex flex-col justify-center items-center">
          <h1 className="AberMono text-5xl md:text-8xl">CRYPTO SPACE</h1>
          <div className="relative max-w-3xl my-5 text-center">
            <p className="Raleway-Medium text-2xl sm:text-[32px]">
              is a distributed gaming environment for the generations; brought to the metaverse.
            </p>
            <p className="Raleway-Regular py-5 text-2xl">
              A multiplayer, game-arcade metaverse, where players socialize and compete in the most
              popular arcade games.
            </p>
          </div>
          <button className="AberMono text-3xl bg-white text-black w-[320px] h-[60px]">
            GET STARTED
          </button>
        </div>
      </div>
    );
  }
  