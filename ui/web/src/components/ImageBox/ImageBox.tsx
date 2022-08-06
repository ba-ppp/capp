import React from "react";
import LapKeyboard from "asset/images/mobile.png";
import { ReactComponent as OptIcon } from "asset/icons/option-icon.svg";

export default function ImageBox() {
    return (
        <div>
            <div className="flex w-full justify-center">
                <div className="w-72 h-64 mx-12 my-8 bg-bg-200">
                    <div className="shadow-img flex justify-center items-center">
                        <img
                            src={LapKeyboard}
                            alt="loading..."
                            className="object-contain h-48"
                        />
                    </div>
                    <div className="flex justify-around items-center h-16">
                        <div className="text-green-400 font-bold text-xl">
                            A cat with green eyes
                        </div>
                        <span>
                            <OptIcon className="fill-bg-800 hover:fill-slate-400" />
                        </span>
                        <div> </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
