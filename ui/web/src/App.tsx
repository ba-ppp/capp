import { Routes, Route } from "react-router-dom";
import HomePage from "components/HomePage/HomePage";
import PageNotFound from "components/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import NavBarMenu from "components/NavBarMenu/NavBarMenu";
import { RootState } from "app/store/store";
import HomeNavBar from "components/NavBarMenu/HomeNavBar";
import CaptionPage from "components/CaptionPage/CaptionPage";

function App() {
    const dispatch = useDispatch();
    let { hasMenuSelect } = useSelector((state: RootState) => state.toggle);
    hasMenuSelect = true;
    return (
        <div>
            {hasMenuSelect ? <NavBarMenu /> : <HomeNavBar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/payment" element={<CaptionPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
