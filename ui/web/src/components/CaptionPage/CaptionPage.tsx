import { RootState } from "app/store/store";
import { ReactComponent as UploadIcon } from "asset/icons/upload-icon.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function CaptionPage() {
    const { isEnglish, textContent } = useSelector(
        (state: RootState) => state.content
    );

    const [activeNav, setActiveNav] = useState(1);

    const en = 0;
    const vi = 1;
    const [lang, setLang] = useState(isEnglish ? en : vi);
    const handleDrag = () => {
        alert("hihi");
    };

    return (
        <div className="pt-36 h-screen min-h-[800px] flex flex-col items-center justify-center">
            <div className="w-[1270px] p-6 min-h-[640px] bg-bg-200 text-bg-800 rounded-lg">
                <label className="bg-bg-400 flex flex-col items-center w-full h-[592px] text-4xl transition border border-bg-800 border-dashed rounded-lg appearance-none cursor-pointer hover:border-bg-600">
                    <span className="mt-28">
                        <UploadIcon width={70} />
                    </span>
                    <span className="font-medium mt-28">
                        Drop files here or{" "}
                        <span className="font-extrabold">click to upload </span>
                    </span>
                    <input
                        type="file"
                        name="file_upload"
                        className="hidden"
                        accept="image/*"
                        multiple={true}
                        onDragEnter={handleDrag}
                    />
                </label>
            </div>
        </div>
    );
}
