import React from "react";
import LapKeyboard from "asset/images/mobile.png";
import { ReactComponent as OptIcon } from "asset/icons/option-icon.svg";

export default function ImageBox() {
    const text =
        "I want someone help me to get the highest level on English in Vietnam with my friend";
    const handleClicked = () => {
        let speakText = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speakText);
    };

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
                <div
                    title="Click to speak"
                    onClick={handleClicked}
                    className="text-mark-200 font-semibold text-xl hover:underline line-clamp-3"
                >
                    {text}
                </div>

                {/* this code for icon */}
                {/* <span>
                    <OptIcon className="fill-bg-800 hover:fill-slate-400" />
                </span> */}
            </div>
        </div>
    );
}
