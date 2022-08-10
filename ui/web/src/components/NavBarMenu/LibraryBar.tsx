import { ReactComponent as DropIcon } from "asset/icons/arrow_drop_down.svg";

export const LibraryBar = () => {
    return (
        <div className="bg-white h-[136px] z-20 shadow-nav fixed left-0 right-0 top-0">
            <div
                className="flex items-center justify-between h-full m-auto p-2"
                tw="width[80%]"
            >
                <div className="basis-1/6 hidden md:block">trai</div>
                <div className="">giua</div>
                <div className="hidden md:flex basis-1/6 text-2xl font-semibold">
                    <button
                        type="button"
                        className="text-bg-200 bg-main-600 hover:bg-indigo-800 rounded-xl px-5 py-2.5 text-center mx-5"
                    >
                        Select
                    </button>
                    <li className="flex items-center" tw="p-2">
                        <span className="flex items-center text-bg-600">
                            Language
                        </span>
                        <DropIcon className="fill-bg-800 hover:fill-slate-400" />
                    </li>
                </div>
            </div>
        </div>
    );
};
