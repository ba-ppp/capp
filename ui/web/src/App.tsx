import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { HomePage } from "components/HomePage/HomePage";
import { NavBarMenu } from "components/NavBarMenu/NavBarMenu";
import { HomeNavBar } from "components/NavBarMenu/HomeNavBar";
import { PageNotFound } from "components/PageNotFound";

function App() {
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
