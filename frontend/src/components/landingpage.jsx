import React from 'react';

export default function HeroSection6() {
    return (
      <div className="fixed overflow-hidden w-screen h-screen text-white">
        <div className="absolute inset-0 -z-0 opacity-90 w-full min-h-screen">
          <img src="/4k-space-background-8i7qa8k0drvwnv35.jpg" className="object-cover w-full h-full" alt="Background" />
        </div>
        {/* <div className="absolute -top-[700px] -left-[100px]">
          <img src="/Gradient3.svg" className="relative" alt="Gradient" />
        </div>
        <div className="absolute opacity-80 md:opacity-100 -top-[700px] -right-[1000px] sm:-top-[500px] sm:-right-[800px]">
          <img src="/gradient1.svg" className="relative" alt="Gradient" />
        </div> */}
  
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
  
        {/* <div className="absolute -bottom-[800px] -left-[600px] sm:-bottom-[700px] sm:-left-[500px]">
          <img src="/gradient.svg" className="relative" alt="Gradient" />
        </div>
        <div className="absolute -bottom-[350px] left-[450px]">
          <img src="/Gradient2.svg" className="relative" alt="Gradient" />
        </div> */}
      </div>
    );
  }
  