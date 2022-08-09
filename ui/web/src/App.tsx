import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { HomePage } from "components/HomePage/HomePage";
import { NavBarMenu } from "components/NavBarMenu/NavBarMenu";
import { HomeNavBar } from "components/NavBarMenu/HomeNavBar";
import { PageNotFound } from "components/PageNotFound";
import { Library } from "components/Library/Library";

function App() {
  const { hasMenuSelect } = useSelector((state: RootState) => state.toggle);

  return (
    <>
      {!hasMenuSelect ? <NavBarMenu /> : <HomeNavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<Library />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
