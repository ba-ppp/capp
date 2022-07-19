import { RootState } from "app/store/store";
import { ReactComponent as ServiceIconDown } from "asset/icons/down-icon.svg";
import { ReactComponent as ServiceIconCap } from "asset/icons/caption-icon.svg";
import { ReactComponent as SupportViFlag } from "asset/images/vi-flag.svg";
import { ReactComponent as SupportEnFlag } from "asset/images/en-flag.svg";
import { ReactComponent as SupportUsFlag } from "asset/images/us-flag.svg";
import { ReactComponent as Laptop } from "asset/images/laptop.svg";
import LapKeyboard from "asset/images/lap-keyboard.png";

import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function HomePage() {
    const { isEnglish, textContent } = useSelector(
        (state: RootState) => state.content
    );

    const [activeNav, setActiveNav] = useState(1);

    const en = 0;
    const vi = 1;
    const [lang, setLang] = useState(isEnglish ? en : vi);

    return (
        <div className="bg-main-img bg-cover text-bg-800  py-16 px-4 mt-64 flex flex-col items-center">
            <div className="text-6xl">
                <span className="font-normal">
                    {textContent.intro[lang]}&nbsp;
                </span>
                <span className="font-extrabold">
                    {textContent.appName[lang]}
                </span>
            </div>
            <div className="font-normal w-1/3 text-2xl mt-7">
                <span className="flex text-center">
                    {textContent.descri[lang]}
                </span>
            </div>
            <NavLink to="/payment" className="w-full flex justify-center mt-16">
                <button
                    type="button"
                    className="w-52 h-16 text-bg-200 bg-main-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-2xl font-semibold px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {textContent.startFree[lang]}
                </button>
            </NavLink>
            <span className="mt-5 text-sm">{textContent.nologin[lang]}</span>
            <span className="mt-72 font-semibold text-5xl">
                {textContent.serTitle[lang]}
            </span>
            <div className="w-[792px] flex flex-col bg-white shadow-ser mt-14">
                <div className="flex justify-between items-center px-10 py-6">
                    <div className="flex">
                        <div className="p-3 m bg-bg-400 rounded-xl">
                            <ServiceIconCap width={55} height={55} />
                        </div>
                        <div className="flex flex-col ml-5 justify-center">
                            <span className="font-semibold text-2xl">
                                {textContent.serCap[lang]}
                            </span>
                            <span className="font-light text-sm">
                                {textContent.serCDes[lang]}
                            </span>
                        </div>
                    </div>
                    <NavLink to="/payment">
                        <button
                            type="button"
                            className="py-3 px-9 rounded-xl border-2 border-main-500 text-main-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm font-bold text-center mr-3 md:mr-0  dark:focus:ring-blue-800"
                        >
                            {textContent.more[lang]}
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
                                {textContent.serDown[lang]}
                            </span>
                            <span className="font-light text-sm">
                                {textContent.serDDes[lang]}
                            </span>
                        </div>
                    </div>
                    <NavLink to="/payment">
                        <button
                            type="button"
                            className="py-3 px-9 rounded-xl border-2 border-main-500 text-main-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm font-bold text-center mr-3 md:mr-0  dark:focus:ring-blue-800"
                        >
                            {textContent.more[lang]}
                        </button>
                    </NavLink>
                </div>
            </div>
            <span className="mt-32 font-semibold text-5xl">
                {textContent.supportLangTit[lang]}
            </span>
            <span className="mt-14 font-light text-3xl">
                {textContent.supportLangDes[lang]}
            </span>
            <div className="flex mt-[104px]">
                <div className="flex flex-col bg-white items-center mx-16 rounded-3xl w-[362px] h-[138px] border-4 border-bg-600">
                    <span className="text-2xl font-semibold mt-4">
                        {textContent.langViDes[lang]}
                    </span>
                    <span>
                        <SupportViFlag />
                    </span>
                </div>
                <div className="flex flex-col bg-white items-center mx-16 rounded-3xl w-[362px] h-[138px] border-4 border-bg-600">
                    <span className="text-2xl font-semibold mt-4">
                        {textContent.langEnDes[lang]}
                    </span>
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
            <NavLink to="/payment">
                <button
                    type="button"
                    className="w-[214px] h-[72px] rounded-[30px] mt-14 text-bg-200 bg-main-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  text-2xl font-semibold px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {textContent.start[lang]}
                </button>
            </NavLink>
            <div className="mt-[138px] mx-6 flex items-center justify-center">
                <div className="text-main-800 flex flex-col">
                    <span className="font-extrabold text-[64px] leading-[96px]">
                        {textContent.guideTit[lang]}
                    </span>
                    <span className="font-light text-2xl">
                        {textContent.guideDes[lang]}
                    </span>
                </div>
                <span>
                    <Laptop />
                </span>
            </div>
            <div className="flex justify-between ml-32 rounded-l-full mt-44 w-full bg-main-600">
                <div className="flex flex-col justify-center ml-36 text-bg-200">
                    <span className="font-extrabold text-[64px] leading-[96px]">
                        {textContent.lapTit[lang]}
                    </span>
                    <span className="font-light text-2xl">
                        {textContent.lapDes[lang]}
                    </span>
                </div>
                <img src={LapKeyboard} alt="loading..." className="w-3/5 " />
            </div>
        </div>
    );
}
