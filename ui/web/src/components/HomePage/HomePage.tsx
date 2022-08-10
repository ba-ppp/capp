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
        <div tw="absolute top-[30vh] left-0 w-full h-full">
          <div className="overflow-x-hidden flex flex-col items-center space-y-24">
            <div tw="flex flex-col items-center mb-20">
              <div className="text-6xl text-center">
                <span className="font-normal">A PLATFORM BUILT FOR&nbsp;</span>
                <span className="font-extrabold">IMAGE CAPTION</span>
              </div>
              <div className="font-normal w-1/2 text-2xl mt-7">
                <div className="text-center">
                  By using combination <b>Inception-V3</b> and <b>LSTM</b> this is a platform
                  to generate caption for each image
                </div>
              </div>
              <NavLink to="/library" className="flex justify-center mt-16">
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
              <div tw="flex flex-col">
                <div tw="flex flex-col items-center">
                  <div className="font-semibold text-5xl">Our Services</div>
                  <div className="w-[calc(70%)] lg:w-[calc(50%)]  flex flex-col bg-white shadow-ser mt-14 rounded-lg">
                    <div className="flex justify-between items-center px-10 py-6">
                      <div className="flex">
                        <div className="p-3 m bg-bg-400 rounded-xl">
                          <ServiceIconCap width={55} height={55} />
                        </div>
                        <div className="flex flex-col ml-5 justify-center">
                          <span className="font-semibold text-2xl">
                            Caption
                          </span>
                          <span className="font-light text-sm">
                            Caption your image.
                          </span>
                        </div>
                      </div>
                      <NavLink to="/payment">
                        <button
                          type="button"
                          className="py-3 w-full px-9 rounded-xl border-2 border-main-500 text-main-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm font-bold text-center mr-3 md:mr-0  dark:focus:ring-blue-800"
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
                          <span className="font-semibold text-2xl">
                            Download
                          </span>
                          <span className="font-light text-sm">
                            Download image and caption.
                          </span>
                        </div>
                      </div>
                      <NavLink to="/payment">
                        <button
                          type="button"
                          className="max-h-[48px] py-3 w-full px-9 rounded-xl border-2 border-main-500 text-main-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm font-bold text-center mr-3 md:mr-0  dark:focus:ring-blue-800"
                        >
                          Learn more
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>

                <div tw="flex flex-col items-center">
                  <div className="mt-32 font-semibold text-5xl">
                    Supported Languages
                  </div>
                  <div className="mt-14 font-light text-3xl">
                    Languages we support
                  </div>

                  <div className="flex mt-[104px]">
                    <div className="w-[15rem] flex flex-col bg-white items-center mx-16 rounded-3xl lg:w-[20rem] xl:w-[36rem] h-[138px] border-4 border-bg-600">
                      <span className="text-2xl font-semibold mt-4">
                        VietNam
                      </span>
                      <span>
                        <SupportViFlag />
                      </span>
                    </div>
                    <div className="w-[15rem] flex flex-col bg-white items-center justify-center px-5 mx-16 rounded-3xl lg:w-[20rem] xl:w-[36rem] h-[138px] border-4 border-bg-600">
                      <span className="text-2xl font-semibold">English</span>
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
                </div>

                <div
                  className="mt-20 flex items-center justify-center w-full p-10 rounded-t-[5rem]"
                  tw="border[2px solid #242f9b]"
                >
                  <div className="text-main-800 flex flex-col">
                    <span className="font-extrabold text-[64px] leading-[96px]">
                      HOW IT WORKS?
                    </span>
                    <span className="font-light text-2xl">
                      Simple guideline, diversely platform to download
                    </span>
                  </div>
                  <span>
                    <Laptop className="w-[30rem] lg:w-[40rem] xl:w-[50rem] 2xl:w-[60rem]" />
                  </span>
                </div>
                <div className="flex justify-between ml-32 rounded-l-full mt-44 bg-main-600">
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
                <div className="w-full justify-center items-center">
                  <div className="mt-32 flex items-center justify-around w-full">
                    <img
                      src={Mobile}
                      alt="loading..."
                      className="hidden xl:block w-[440px]"
                    />
                    <div className=" flex flex-col">
                      <div className="text-main-800 text-right font-extrabold text-[32px] leading-[96px]">
                        AVAILABLE ON SMARTPHONE
                      </div>
                      <div className="flex mt-10">
                        <div>
                          <img
                            src={AppStore}
                            alt="loading..."
                            className="max-w-[238px]"
                          />
                        </div>
                        <div>
                          <img
                            src={CHPlay}
                            alt="loading..."
                            className="max-w-[238px] ml-7"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-32 w-full mb-5 flex items-center ml-16 lg:ml-20">
                    <NavLink to="/" className="mx-16">
                      <div className="flex text-2xl md:text-5xl items-center">
                        <span className="text-main-800 font-black">Image</span>
                        <span className="text-bg-600 font-black">Caption</span>
                      </div>
                    </NavLink>
                    <div className="text-[10px] md:text-base lg:text-xl font-semibold">
                      <NavLink to="/service" className="mr-0.5 md:mr-5">
                        Terms of services
                      </NavLink>
                      <span className="border-x border-x-bg-800">
                        <NavLink to="/privacy" className="mx-2 md:mx-5">
                          Privacy
                        </NavLink>
                      </span>
                      <NavLink to="/about" className="ml-0.5 md:ml-5">
                        About us
                      </NavLink>
                    </div>
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
