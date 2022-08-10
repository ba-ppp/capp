/** @jsxImportSource @emotion/react */
import React from "react";
import "twin.macro";
import { NavLink } from "react-router-dom";
import { ReactComponent as DropIcon } from "asset/icons/arrow_drop_down.svg";

export const HomeNavBar = () => {
    return (
        <div className="hidden lg:block bg-white h-[136px] z-20 shadow-nav fixed left-0 right-0 top-0">
            <div
                className="flex items-center justify-between h-full m-auto"
                tw="width[80%]"
            >
                <NavLink to="/">
                    <div className="flex text-5xl items-center">
                        <span className="text-main-800 font-black">Image</span>
                        <span className="text-bg-600 font-black">Caption</span>
                    </div>
                </NavLink>

                <div tw="uppercase">
                    <ul className="flex space-x-8 text-sm font-semibold list-none text-bg-600 ">
                        <li className="flex items-center" tw="p-2">
                            <span className="flex items-center">Language</span>
                            <DropIcon className="fill-bg-800 hover:fill-slate-400" />
                        </li>
                        <li className="flex items-center" tw="p-2">
                            <NavLink to="/help">Help</NavLink>
                        </li>
                        <li className="flex items-center" tw="p-2">
                            <NavLink to="/about">About us</NavLink>
                        </li>
                        <li className="flex items-center">
                            <NavLink to="/upload">
                                <button
                                    type="button"
                                    className="w-36 h-12 text-bg-200 bg-main-500 hover:bg-blue-800 rounded-2xl text-sm px-5 py-2.5 text-center mr-3 md:mr-0 "
                                >
                                    Get started
                                </button>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
