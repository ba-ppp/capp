import { Routes, Route } from "react-router-dom";
import HomePage from "components/HomePage/HomePage";
import PageNotFound from "components/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import NavBarMenu from "components/NavBarMenu/NavBarMenu";
import { RootState } from "app/store/store";
import { toggleMenuSelect } from "app/slices/toggleSlice";
import HomeNavBar from "components/NavBarMenu/HomeNavBar";

function App() {
    const dispatch = useDispatch();
    const { hasMenuSelect } = useSelector((state: RootState) => state.toggle);
    return (
        <div>
            {hasMenuSelect ? <NavBarMenu /> : <HomeNavBar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
