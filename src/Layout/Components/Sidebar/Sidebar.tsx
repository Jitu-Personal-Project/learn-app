// crete reusable sidebar component
import React from "react";
import { Box, List, ListItem } from "@mui/material";
import { useAppContext } from "../../../contexts/context";
import "./Sidebar.css";
import routes from "../../../routes";
import { Link, useLocation } from "react-router-dom";

interface RouteType {
  path: string;
  name: string;
}

export default function Sidebar() {
  const { isSidebar, appCurrentTheme } = useAppContext();
  const location = useLocation(); // Add this line

  return (
    <div
      className={`${appCurrentTheme.value}-theme ${
        appCurrentTheme.value
      }-theme-sidebar theme-bg sidebar-wrp border-right full-height ${
        isSidebar ? "open" : "closed"
      }`}
    >
      <List className="sidebar-list">
        {routes.map((route: RouteType, index) => {
          const isActive = location.pathname === route.path;
          return (
            <ListItem
              key={`menu-item-${index}`}
              className={`nav-item${isActive ? " nav-item-active active" : ""}`}
            >
              <Link to={route.path} className="nav-link">
                {route.name}
              </Link>
              <div
                className={`${appCurrentTheme.value}-theme active-menu-icon-wrp theme-bg`}
              ></div>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
