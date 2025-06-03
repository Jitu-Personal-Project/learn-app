import React, { use, useState } from "react";
import TopNav from "../Components/TopNav/TopNav";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useAppContext } from "../../contexts/context";
import { Routes, Route } from "react-router-dom";
import routes from "../../routes";
import "./HomeLayout.css";

export default function HomeLayout() {
  const [contentLeftMenu, setContentLeftMenu] = useState<boolean>(false);
  const [contentRightMenu, setContentRightMenu] = useState<boolean>(false);
  const { appCurrentTheme } = useAppContext();
  const handelContentLeftMenu = () => {
    setContentLeftMenu((prev) => !prev);
    setContentRightMenu(false);
  };
  const handelContentRightMenu = () => {
    setContentLeftMenu(false);
    setContentRightMenu((prev) => !prev);
  };
  return (
    <div
      className={`${appCurrentTheme.value}-theme theme-bg-secondary theme-bg-img home-layout-wrp full-screen overflow-hidden flex-start`}
    >
      <TopNav />
      <div className="home-layout-content-wrp full-width">
        <Sidebar />

        <div className="home-layout-content-inner-wrp full-width overflow-hidden">
          <div
            className={`${appCurrentTheme.value}-theme  home-layout-content-menu-left-wrp  theme-bg ${contentLeftMenu ? "open" : "close"}`}
            onClick={handelContentLeftMenu}
          >
            {/* <div className="ribbon-menu"> More About Page</div> */}
          </div>

          <div
            className={`${appCurrentTheme.value}-theme home-layout-content theme-bg`}
          >
            {/* Main content goes here */}
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {routes.map((route) => {
                  return (
                    <>
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    </>
                  );
                })}
              </Routes>
            </React.Suspense>
          </div>

          {/* <div
            className={`home-layout-content-menu-right-wrp ${contentRightMenu ? "open" : "close"}`}
            onClick={handelContentRightMenu}
          ></div> */}
        </div>
      </div>
    </div>
  );
}
