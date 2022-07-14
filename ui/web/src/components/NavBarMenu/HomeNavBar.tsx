import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as StarIcon } from "asset/icons/star.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ReactComponent as Admin } from "asset/icons/admin.svg";
import { ReactComponent as Logout } from "asset/icons/logout.svg";
import { useNavigate } from "react-router-dom";
import { RootState } from "app/store/store";

export default function HomeNavBar() {
    const dispatch = useDispatch();
    const { isEnglish, textContent } = useSelector((state: RootState) => state.content)

    const [activeNav, setActiveNav] = useState(1);

    const en = 0;
    const vi = 1;
    const [lang, setLang] = useState(en);

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
                <div className="bg-white h-36 shadow-md">
                    <div className="flex items-center justify-around h-full">
                        <NavLink to="/">
                            <div className="flex text-5xl items-center">
                                <span className="text-main-800 font-black">Image</span>
                                <span className="text-bg-600 font-black">Caption</span>
                            </div>
                        </NavLink>

                        <div className="mt-16">
                            <ul className="flex space-x-8 text-sm list-none">
                                <li
                                    onClick={() => handleChangeNav(1)}
                                >
                                    <NavLink to="/">{textContent.lang[lang]}</NavLink>
                                </li>
                                <li
                                    onClick={() => handleChangeNav(4)}
                                >
                                    <NavLink to="/shop">{textContent.help[lang]}</NavLink>
                                </li>
                                <li
                                    onClick={() => handleChangeNav(2)}
                                >
                                    <NavLink to="/search">{textContent.about[lang]}</NavLink>
                                </li>
                                <li
                                    onClick={() => handleChangeNav(3)}
                                >
                                    <NavLink to="/payment">{textContent.start[lang]}</NavLink>
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
                        <Admin fill="white" />
                        <div className="text-white">Admin</div>
                    </div>
                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <Logout fill="white" />
                        <div className="text-white">Log out</div>
                    </div>
                </div>
            )
            }
        </>
    );
};
