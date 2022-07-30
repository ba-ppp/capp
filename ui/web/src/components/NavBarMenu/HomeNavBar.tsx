import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as DropIcon } from "asset/icons/arrow-drop-down.svg";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HomeNavBar() {
    return (
        <>
            <div className="bg-white h-[136px] shadow-nav fixed left-0 right-0 top-0">
                <div className="flex items-center content-center justify-around h-full">
                    <NavLink to="/">
                        <div className="flex text-5xl items-center">
                            <span className="text-main-800 font-black">
                                Image
                            </span>
                            <span className="text-bg-600 font-black">
                                Caption
                            </span>
                        </div>
                    </NavLink>

                    <div>
                        <ul className="flex space-x-8 text-2xl font-semibold list-none text-bg-600 ">
                            <li className="flex items-center">
                                <span className="flex items-center">
                                    Language
                                </span>
                                <DropIcon className="fill-bg-800 hover:fill-slate-400 " />
                            </li>
                            <li className="flex items-center">
                                <NavLink to="/help">Help</NavLink>
                            </li>
                            <li className="flex items-center">
                                <NavLink to="/about">About us</NavLink>
                            </li>
                            <li className="flex items-center">
                                <NavLink to="/upload">
                                    <button
                                        type="button"
                                        className="w-52 h-16 text-bg-200 bg-main-500 hover:bg-blue-800 rounded-3xl text-sm px-5 py-2.5 text-center mr-3 md:mr-0 "
                                    >
                                        Get started
                                    </button>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
