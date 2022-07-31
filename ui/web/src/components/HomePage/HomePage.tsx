/** @jsxImportSource @emotion/react */
import React from "react";
import "twin.macro";
import { ReactComponent as ServiceIconDown } from "asset/icons/down-icon.svg";
import { ReactComponent as ServiceIconCap } from "asset/icons/caption-icon.svg";
import { ReactComponent as SupportViFlag } from "asset/images/vi-flag.svg";
import { ReactComponent as SupportEnFlag } from "asset/images/en-flag.svg";
import { ReactComponent as SupportUsFlag } from "asset/images/us-flag.svg";
import { ReactComponent as Laptop } from "asset/images/laptop.svg";
import LapKeyboard from "asset/images/lap-keyboard.png";
import Mobile from "asset/images/mobile.png";
import AppStore from "asset/icons/appstore-icon.png";
import CHPlay from "asset/icons/chplay-icon.png";
import { NavLink } from "react-router-dom";
import { CustomBackground } from "./CustomBackground";

export const HomePage = () => {
  return (
    <>
      <div className="absolute-full">
        <CustomBackground />
        <div
          style={{
            position: "absolute",
            top: "25rem",
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <div className="flex flex-col items-center space-y-24">
            <div tw="flex flex-col items-center mb-20">
              <div className="text-6xl">
                <span className="font-normal">A PLATFORM BUILT FOR&nbsp;</span>
                <span className="font-extrabold">IMAGE CAPTION</span>
              </div>
              <div className="font-normal w-1/3 text-2xl mt-7">
                <span className="flex text-center">
                  By using combination Inception-V3 and LSTM, we built a
                  platform to generate caption for each image
                </span>
              </div>
              <NavLink to="/upload" className="flex justify-center mt-16">
                <button
                  type="button"
                  className="w-52 h-16 text-bg-200 bg-main-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-2xl font-semibold px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Start for free
                </button>
              </NavLink>
              <span className="mt-5 text-sm">No login needed</span>
            </div>
            <div tw="bg-white z-10 w-full">
              <div tw="width[80%] m-auto flex flex-col items-center">
                <div className=" font-semibold text-5xl">Our Services</div>
                <div className="w-[792px] flex flex-col bg-white shadow-ser mt-14">
                  <div className="flex justify-between items-center px-10 py-6">
                    <div className="flex">
                      <div className="p-3 m bg-bg-400 rounded-xl">
                        <ServiceIconCap width={55} height={55} />
                      </div>
                      <div className="flex flex-col ml-5 justify-center">
                        <span className="font-semibold text-2xl">Caption</span>
                        <span className="font-light text-sm">
                          Caption your image.
                        </span>
                      </div>
                    </div>
                    <NavLink to="/payment">
                      <button
                        type="button"
                        className="py-3 px-9 rounded-xl border-2 border-main-500 text-main-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm font-bold text-center mr-3 md:mr-0  dark:focus:ring-blue-800"
                      >
                        Learn more
                      </button>
                    </NavLink>
                  </div>
                  <div className="flex justify-between items-center px-10 py-6 border-t border-bg-600">
                    <div className="flex">
                      <div className="p-3 m bg-bg-400 rounded-xl">
                        <ServiceIconDown width={55} height={55} />
                      </div>
                      <div className="flex flex-col ml-5 justify-center">
                        <span className="font-semibold text-2xl">Download</span>
                        <span className="font-light text-sm">
                          Download image and caption.
                        </span>
                      </div>
                    </div>
                    <NavLink to="/payment">
                      <button
                        type="button"
                        className="py-3 px-9 rounded-xl border-2 border-main-500 text-main-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm font-bold text-center mr-3 md:mr-0  dark:focus:ring-blue-800"
                      >
                        Learn more
                      </button>
                    </NavLink>
                  </div>
                </div>

                <span className="mt-32 font-semibold text-5xl">
                  Supported Languages
                </span>
                <span className="mt-14 font-light text-3xl">
                  Languages we support
                </span>
                <div className="flex mt-[104px]">
                  <div className="flex flex-col bg-white items-center mx-16 rounded-3xl w-[362px] h-[138px] border-4 border-bg-600">
                    <span className="text-2xl font-semibold mt-4">VietNam</span>
                    <span>
                      <SupportViFlag />
                    </span>
                  </div>
                  <div className="flex flex-col bg-white items-center mx-16 rounded-3xl w-[362px] h-[138px] border-4 border-bg-600">
                    <span className="text-2xl font-semibold mt-4">English</span>
                    <div className="flex">
                      <span className="mr-8">
                        <SupportEnFlag />
                      </span>
                      <span className="ml-8">
                        <SupportUsFlag />
                      </span>
                    </div>
                  </div>
                </div>
                <NavLink to="/upload">
                  <button
                    type="button"
                    className="w-[214px] h-[72px] rounded-[30px] mt-14 text-bg-200 bg-main-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  text-2xl font-semibold px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Get started
                  </button>
                </NavLink>
                <div className="mt-[138px] mx-6 flex items-center justify-center">
                  <div className="text-main-800 flex flex-col">
                    <span className="font-extrabold text-[64px] leading-[96px]">
                      HOW IT WORKS?
                    </span>
                    <span className="font-light text-2xl">
                      Simple guideline, diversely platform to download
                    </span>
                  </div>
                  <span>
                    <Laptop />
                  </span>
                </div>
                <div className="flex self-end justify-between ml-32 rounded-l-full mt-44 bg-main-600">
                  <div className="flex flex-col justify-center mx-36 text-bg-200">
                    <div className="font-extrabold text-[64px] leading-[96px] flex flex-col">
                      <span>AVAILABLE</span>
                      <span> ON WEBSITE</span>
                    </div>
                    <span className="font-light text-2xl">
                      No installation, no setup environment.
                    </span>
                  </div>
                  <img
                    src={LapKeyboard}
                    alt="loading..."
                    className="w-[949px]"
                  />
                </div>
                <div className="mt-32 flex items-center justify-around w-full">
                  <img src={Mobile} alt="loading..." className="w-[643px]" />
                  <div className="w-[550px] flex flex-col items-end">
                    <span className="text-main-800 text-right font-extrabold text-[64px] leading-[96px]">
                      AVAILABLE ON SMARTPHONE
                    </span>
                    <div className="flex mt-10">
                      <span>
                        <img
                          src={AppStore}
                          alt="loading..."
                          className="w-[238px]"
                        />
                      </span>
                      <span>
                        <img
                          src={CHPlay}
                          alt="loading..."
                          className="w-[238px] ml-7"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-32 w-full mb-5 flex items-center justify-start">
                  <NavLink to="/" className="mx-16">
                    <div className="flex  text-5xl items-center">
                      <span className="text-main-800 font-black">Image</span>
                      <span className="text-bg-600 font-black">Caption</span>
                    </div>
                  </NavLink>
                  <div className="text-2xl font-semibold">
                    <NavLink to="/service" className="mr-5">
                      Terms of services
                    </NavLink>
                    <span className="border-x border-x-bg-800">
                      <NavLink to="/privacy" className="mx-5">
                        Privacy
                      </NavLink>
                    </span>
                    <NavLink to="/about" className="ml-5">
                      About us
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
