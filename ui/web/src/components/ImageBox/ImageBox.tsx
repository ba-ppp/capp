import React from "react";
import LapKeyboard from "asset/images/mobile.png";
import { ReactComponent as OptIcon } from "asset/icons/option-icon.svg";

export default function ImageBox() {
    return (
        <div className="shadow-img w-full min-w-[160px] bg-bg-200 rounded-lg">
            <div className="flex justify-center items-center">
                <img
                    src={LapKeyboard}
                    alt="loading..."
                    className="object-contain h-48"
                />
            </div>
            <div className="flex justify-around items-center p-2 cursor-pointer">
                <div className="text-mark-200 font-semibold text-xl hover:underline">
                    A cat with green eyesd da sdds sd sdassd adsd sdas s dasd
                    asddasd dasdasda sdad a
                </div>
                {/* <span>
                    <OptIcon className="fill-bg-800 hover:fill-slate-400" />
                </span> */}
                <div> </div>
            </div>
        </div>
    );
}
