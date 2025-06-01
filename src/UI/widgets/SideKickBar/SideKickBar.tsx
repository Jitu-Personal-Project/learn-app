import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import { useDraggable } from "@dnd-kit/core";
import "./SideKickBar.css";
import { Height } from "@mui/icons-material";

export interface MenuListItemProps {
  name?: ReactNode;
  icons?: ReactNode;
  id?: string | number;
  handleClick?: (arg?: any) => void;
  isShow?: boolean;
  bgColor?: string;
  color?: string;
  isDraggable?: boolean;
  className?: string;
}

interface SideKickBarProps {
  menuList: MenuListItemProps[];
  className?: string;
  alignment?: string; // New optional prop
}

const MenuListItemComponent: React.FC<MenuListItemProps> = ({
  id,
  name,
  icons,
  handleClick,
  isShow = true,
  className,
  bgColor,
  // Updated prop name
}) => {
  if (!isShow) return null;

  return (
    <>
      <div
        className={`menu-list-item ${className || ""}`}
        onClick={handleClick}
        style={
          {
            background: `${bgColor}`,
            "--menu-item-position": id, // Updated variable name
          } as React.CSSProperties
        }
      >
        <div className="menu-icon">{icons}</div>
        <div className="menu-name">{name}</div>
      </div>
    </>
  );
};

const SideKickBar: React.FC<SideKickBarProps> = ({
  menuList,
  className,
  alignment,
}) => {
  const getAlignmentStyles = (alignment: string | undefined) => {
    switch (alignment) {
      case "top-left":
        return { top: "0", left: "0", flexDirection: "row", rotate: "0deg" };
      case "top-center":
        return {
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          flexDirection: "row",
          rotate: "0deg",
        };
      case "top-right":
        return { top: "0", right: "0", flexDirection: "row", rotate: "0deg" };
      case "left-top":
        return {
          top: "0",
          left: "0",
          flexDirection: "column",
          rotate: "90deg",
        };
      case "left-center":
        return {};
      case "left-bottom":
        return {
          bottom: "0",
          left: "0",
          flexDirection: "column",
          rotate: "90deg",
        };
      case "bottom-left":
        return {
          bottom: "0",
          left: "0",
          flexDirection: "row",
          rotate: "180deg",
        };
      case "bottom-center":
        return {
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          flexDirection: "row",
          rotate: "180deg",
        };
      case "bottom-right":
        return {
          bottom: "0",
          right: "0",
          flexDirection: "row",
          rotate: "180deg",
        };
      case "right-top":
        return {
          top: "0",
          right: "0",
          flexDirection: "column",
          rotate: "0deg",
        };
      case "right-center":
        return {
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
          flexDirection: "column",
          rotate: "0deg",
        };
      case "right-bottom":
        return {
          right: "calc(-50% + 30px)",
          top: 0,
          rotate: "90deg",
        };
      default:
        return {}; // Default alignment
    }
  };

  const alignmentStyles = getAlignmentStyles(alignment);

  return (
    <Box
      className={`sidekick-bar-wrp ${className || ""}`}
      style={{
        ...alignmentStyles,
        transform: `${
          alignmentStyles.transform || ""
        } transform: translate(50%, -50%) rotate(${alignmentStyles.rotate})`,
      }} // Apply alignment and rotation styles
    >
      {menuList.map((menuListItem, idx) => (
        <MenuListItemComponent
          key={`sidekick-item-${menuListItem.id || idx}`}
          {...menuListItem}
        />
      ))}
    </Box>
  );
};

export default SideKickBar;
