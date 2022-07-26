import { NavLink } from "react-router-dom";
import { ReactComponent as DropIcon } from "asset/icons/arrow-drop-down.svg";

export default function NavBarMenu() {
    return (
        <>
            <div className="bg-bg-200 h-[136px] shadow-nav fixed left-0 right-0 top-0 flex items-center justify-around ">
                <NavLink to="/">
                    <div className="flex text-5xl items-center">
                        <span className="text-main-800 font-black">Image</span>
                        <span className="text-bg-600 font-black">Caption</span>
                    </div>
                </NavLink>
            </div>
        </>
    );
}
