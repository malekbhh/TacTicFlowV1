import React from "react";
import NavbarHome from "../components/NavbarHome";

function Home() {
  return (
    <div className="">
      <NavbarHome />

      <div className="relative translate-y-48  -translate-x-11">
        <svg
          height="800"
          width="1679"
          viewBox="0 0 1679 840"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 778.267C104.185 689.267 419.554 338.165 709.24 509.766C1071.35 724.267 1296.12 986.268 1550.73 732.767C1805.33 479.266 1623.25 120.264 1433.97 43.7638C1282.54 -17.4365 1148.67 3.59694 1100.66 21.7637"
            stroke="white"
            stroke-width="5"
            stroke-dasharray="20 20"
          />
        </svg>
      </div>

      <div className="text-white absolute text-3xl w-846 h-155 adivsolute my-0 mx-[!important] top-220 left-[93px] leading-[80px] inline-block whitespace-pre-wrap [text-shadow:-5px_10px_4px_rgba(0,_0,_0,_0.25)] mq450:text-[29px] mq450:leading-[48px] mq1050:text-[38px] mq1050:leading-[64px] font-bold">
        <p className="m-0">{`Empower Your Projects, Streamline  `}</p>
        <p className="m-0">
          <span>{`with `}</span>
          <span className="text-50px">TacticFlow</span>
        </p>

        <p className="text-lg mt-10 text-shadow-none">Take the first step</p>
        <input
          className="h-10 rounded-2xl text-sm  w-80 text-dimgray px-4 font-normal"
          placeholder="Email"
        />

        <button className=" h-10 bg-[#FFC107] text-[#212177]  items-center text-xl w-40 hover:text-white pb-1  text-midnightblue  justify-center font-medium m-6 rounded-xl  shadow-[-6px_8px_10px_rgba(0,_0,_0,_0.4)]">
          Sign up
        </button>
      </div>

      <div className=" absolute top-80 right-0  flex flex-row gap-5 px-40">
        <img className="h-80" src="/homepic.png" alt="homepic" />
      </div>
      <img
        className="w-126 h-144.9 absolute my-0 mx-[!important] top-[125px] right-[520px] object-contain z-[3]"
        loading="eager"
        alt=""
        src="/group@2x.png"
      />
    </div>
  );
}
export default Home;
