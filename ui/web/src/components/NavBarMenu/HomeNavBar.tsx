import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as DropIcon } from "asset/icons/arrow-drop-down.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RootState } from "app/store/store";

export default function HomeNavBar() {
    const dispatch = useDispatch();
    const { isEnglish, textContent } = useSelector(
        (state: RootState) => state.content
    );

    const [activeNav, setActiveNav] = useState(1);

    const en = 0;
    const vi = 1;
    const [lang, setLang] = useState(isEnglish ? en : vi);

    const [isAdmin, toggleAdmin] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleChangeNav = (id: number) => {
        setActiveNav(id);
    };

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveNav(1);
        }
        if (location.pathname === "/search") {
            setActiveNav(2);
        }
        if (location.pathname === "/payment") {
            setActiveNav(3);
        }
    }, [location]);

    return (
        <>
            {!isAdmin ? (
                <div className="bg-white h-36 shadow-nav fixed left-0 right-0 top-0">
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

                        <div className="">
                            <ul className="flex space-x-8 text-2xl font-semibold list-none text-bg-600 ">
                                <li
                                    className="flex items-center"
                                    onClick={() => handleChangeNav(1)}
                                >
                                    <span className="flex items-center">
                                        {textContent.lang[lang]}
                                    </span>
                                    <DropIcon className="fill-bg-800 hover:fill-slate-400 " />
                                </li>
                                <li
                                    className="flex items-center"
                                    onClick={() => handleChangeNav(4)}
                                >
                                    <NavLink to="/shop">
                                        {textContent.help[lang]}
                                    </NavLink>
                                </li>
                                <li
                                    className="flex items-center"
                                    onClick={() => handleChangeNav(2)}
                                >
                                    <NavLink to="/search">
                                        {textContent.about[lang]}
                                    </NavLink>
                                </li>
                                <li
                                    className="flex items-center"
                                    onClick={() => handleChangeNav(3)}
                                >
                                    <NavLink to="/payment">
                                        <button
                                            type="button"
                                            className="w-52 h-16 text-bg-200 bg-main-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            {textContent.start[lang]}
                                        </button>
                                    </NavLink>
                                </li>
                                {/* <NavLink to="/admin">
                  <li
                    onClick={() => history.push("/admin")}
                    className="flex -mt-2 tracking-wider text-white bg-style-purple-2 hover:bg-style-purple-3 px-4 py-1 text-sm rounded leading-loose mx-2 font-semibold cursor-pointer"
                  >
                    <StarIcon fill="white" className="mr-0.5" />
                    Quản lý
                  </li>
                </NavLink> */}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between p-10 fixed width[96 %] h-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500">
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <div className="text-white">Admin</div>
                    </div>
                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <div className="text-white">Log out</div>
                    </div>
                </div>
            )}
        </>
    );
}
