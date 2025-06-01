import {
  Button,
  Snackbar,
  type SnackbarContentProps,
  type SnackbarOrigin,
  IconButton,
  useTheme, // Import useTheme
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import WarningIcon from "@mui/icons-material/Warning"; // Import WarningIcon
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import clsx from "clsx"; // Import clsx for conditional class names
import "./TostMessage.css";
interface TostMessageProps {
  isOpen?: boolean;
  autoHideDuration?: number;
  message?: SnackbarContentProps["message"];
  actionButton?: boolean;
  anchorOrigin?: SnackbarOrigin;
  variant?: "success" | "error" | "warning" | ""; // Add variant prop
  theme?: "light" | "vs-dark";
}
export default function TostMessage({
  isOpen,
  autoHideDuration,
  message,
  actionButton,
  anchorOrigin,
  variant, // Destructure variant
  theme,
}: TostMessageProps) {
  const [isTostMessage, setIsTostMessage] = useState<boolean>(false);
  const handleClick = (bolVal: boolean) => {
    setIsTostMessage(bolVal);
  };
  useEffect(() => {
    if (isOpen) {
      setIsTostMessage(isOpen);
    }
  }, []);
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => handleClick(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  const msz = (
    message: ReactNode,
    variant: TostMessageProps["variant"]
  ): ReactNode => {
    return (
      <>
        {variant === "success" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                backgroundColor: "green",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
              }}
            >
              <CheckIcon style={{ color: "white", fontSize: "16px" }} />
            </div>
            {message}
          </div>
        )}
        {variant === "error" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                backgroundColor: "red",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
              }}
            >
              <CloseIcon style={{ color: "white", fontSize: "16px" }} />
            </div>
            {message}
          </div>
        )}
        {variant === "warning" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                backgroundColor: "orange",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
              }}
            >
              <PriorityHighIcon style={{ color: "white", fontSize: "16px" }} />
            </div>
            {message}
          </div>
        )}
        {/* ...existing code for other variants... */}
      </>
    );
  };
  return (
    <div>
      {actionButton && (
        <Button onClick={() => handleClick(true)}>Open Snackbar</Button>
      )}

      <Snackbar
        open={isTostMessage}
        autoHideDuration={10000}
        onClose={() => handleClick(false)}
        message={msz(message, variant)}
        anchorOrigin={anchorOrigin || { vertical: "top", horizontal: "center" }}
        action={action}
        slotProps={{
          content: {
            className: clsx({
              success: variant === "success",
              error: variant === "error",
              warning: variant === "warning",
              light: theme === "light", // Add theme-light class
              dark: theme === "vs-dark", // Add theme-vs-dark class
            }),
          },
        }}
      />
    </div>
  );
}
