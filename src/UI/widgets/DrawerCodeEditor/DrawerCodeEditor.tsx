import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Select,
  MenuItem,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Editor } from "@monaco-editor/react";
import * as ts from "typescript";
import CloseIcon from "@mui/icons-material/Close";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  File,
  Files,
  FolderOpen,
  Search,
  Bug,
  GitBranch,
  Settings,
  Plus,
  FileType,
  X,
  Save,
  Star,
} from "lucide-react";
import "./DrawerCodeEditor.css";

import {
  createFile,
  renameFile,
  fetchFiles,
  deleteFile,
  updateFileActiveStatus,
  saveCode, // Import saveCode API
} from "./api/api";
import TostMessage from "../../TostMessage/TostMessage";

import useAudioPlay from "../Utils/hooks/useAudioPlay";
import type { widgetsStatusProps } from "../../../Layout/Layout";

interface DrawerCodeEditorProps {
  widgetsStatus: widgetsStatusProps;
  handelWidgetsStatus: (arg: any) => void;
  passFile?: FileTy;
  language?: string;
  actionButton?: boolean;
}
interface tostMessageObjProps {
  status: boolean;
  message: string;
  variant?: "success" | "error" | "warning"; // Add variant prop
}
const initialTostMessageObj = {
  status: false,
  message: "default message",
  variant: "success", // Add variant prop
};

interface FileTy {
  name: string;
  content: string;
  language: string;
  deleted?: boolean;
  consoleOutput?: string;
  active?: boolean;
  theme?: "light" | "vs-dark";
}

let timeId: NodeJS.Timeout | undefined = undefined;
const DrawerCodeEditor: React.FC<DrawerCodeEditorProps> = ({
  widgetsStatus,
  handelWidgetsStatus,
  passFile,
  language,
  actionButton,
}) => {
  const [files, setFiles] = useState<FileTy[]>([]);
  const [activeFile, setActiveFile] = useState<number>(0);
  const [code, setCode] = useState("");
  const [unsaved, setUnsaved] = useState<boolean>(false);
  const [isMessage, setIsMessage] = useState<boolean>(false);
  const [tostMessageObj, setTostMessageObj] = useState<tostMessageObjProps>(
    initialTostMessageObj
  );
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedTheme, setSelectedTheme] = useState<FileTy["theme"]>("light");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [runAction, setRunAction] = useState<boolean>(false);
  const playPopRunAudio = useAudioPlay("/run-code.mp3", 1);
  const playCodeThemeAudio = useAudioPlay("/code-theme.mp3", 1);
  useEffect(() => {
    if (passFile) {
      if (passFile?.theme === "light" || passFile?.theme === "vs-dark") {
        setSelectedTheme(passFile.theme);
      }
      setFiles([passFile]);
      setActiveFile(files.length);
      setSelectedLanguage(passFile.language);
      setCode(passFile.content);
      if (passFile.consoleOutput) {
        setConsoleOutput(passFile.consoleOutput);
      }
    } else if (files.length > 0) {
      let newFiles = [...files];
      newFiles[activeFile].active = true;
      setActiveFile(0);
      setCode(newFiles[0].content);
      setSelectedLanguage(newFiles[0].language);
      setConsoleOutput(
        newFiles[0]?.consoleOutput ? newFiles[0]?.consoleOutput : ""
      );
      setFiles(newFiles);
    }
  }, [passFile]);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const fetchedFiles = await fetchFiles();
        setFiles(fetchedFiles);
        if (fetchedFiles.length > 0) {
          setActiveFile(0);
          setCode(fetchedFiles[0].content);
          setSelectedLanguage(fetchedFiles[0].language);
          setConsoleOutput(fetchedFiles[0].consoleOutput || "");
        }
      } catch (error) {
        console.error("Error loading files:", error);
      }
    };

    loadFiles();
  }, []);

  const runCode: any = () => {
    playPopRunAudio();
    setRunAction(true);
    if (runCode.timeoutId) {
      setRunAction(false);
      clearTimeout(runCode.timeoutId);
    }
    runCode.timeoutId = setTimeout(() => {
      setRunAction(false);
    }, 300);
    try {
      let jsCode = code;
      if (selectedLanguage === "typescript") {
        const transpileResult = ts.transpileModule(code, {
          compilerOptions: { module: ts.ModuleKind.CommonJS },
        });
        jsCode = transpileResult.outputText;
      }

      // Capture console.log output
      const oldLog = console.log;
      let logOutput = "";
      console.log = (...args) => {
        logOutput += args.join(" ") + "\n";
      };

      // Execute the code
      eval(jsCode);

      // Restore console.log and update state
      console.log = oldLog;
      setConsoleOutput(logOutput);
    } catch (error) {
      setConsoleOutput("Error: " + error);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedLanguage(e.target.value as string);
    setCode(""); // Clear the code when switching languages
    setConsoleOutput(""); // Clear the console output when switching languages
  };

  const handleThemeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTheme(e.target.value as string);
  };

  const handelFileExtension = (fileType: string) => {
    if (fileType === "typescript" || fileType === "ts") {
      return ".ts";
    }
    if (fileType === "javascript" || fileType === "js") {
      return ".js";
    }
    if (fileType === "tsx") {
      return ".tsx";
    }
  };
  const handelLanguage = (fileType: string) => {
    if (fileType === "typescript" || fileType === "ts") {
      return "typescript";
    }
    if (fileType === "javascript" || fileType === "js") {
      return "javascript";
    }
    if (fileType === "tsx") {
      return "typescript";
    }
  };
  const resetFileActive = () => {
    let updatedFiles = [...files];
    updatedFiles.map((file) => (file.active = false));
    setFiles(updatedFiles);
  };
  const addNewFile = async (fileType: string) => {
    const newFile = {
      name: `file-${files.length + 1}${handelFileExtension(fileType)}`,
      content: "console.log('hhh')",
      language: handelLanguage(fileType),
      active: true,
      deleted: true,
    };

    try {
      // Create the new file
      const createNewFileResponse = await createFile(newFile);
      if (createNewFileResponse) {
        const getUpdatedFile = await fetchFiles();
        if (getUpdatedFile.length > 0) {
          setFiles(getUpdatedFile);
          setActiveFile(getUpdatedFile.length - 1);
          setCode(getUpdatedFile[getUpdatedFile.length - 1].content);
          setSelectedLanguage(
            getUpdatedFile[getUpdatedFile.length - 1].language
          );
          setConsoleOutput(
            getUpdatedFile[getUpdatedFile.length - 1].consoleOutput || ""
          );
        }

        // Update tostMessageObj for success
        setTostMessageObj({
          status: true,
          message: `New file "${newFile.name}" added successfully.`,
          variant: "success",
        });
        setIsMessage(true);
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(() => {
          setIsMessage(false);
          setTostMessageObj({ status: false, message: "" });
        }, 800);
      }
    } catch (error) {
      console.error("Error adding new file:", error);
    }
  };

  const removeFile = async (file: FileTy) => {
    if (files.length === 1) {
      setTostMessageObj({
        status: true,
        message: "At least one file must remain.",
        variant: "warning",
      });
      setIsMessage(true);

      if (timeId) clearTimeout(timeId);
      timeId = setTimeout(() => {
        setIsMessage(false);
        setTostMessageObj({ status: false, message: "" });
      }, 800);
      return;
    }

    try {
      let deleteFileId = file._id;
      const deleteFileResponse = await deleteFile(deleteFileId);
      if (deleteFileResponse) {
        const getUpdatedFile = await fetchFiles();
        if (getUpdatedFile.length > 0) {
          setFiles(getUpdatedFile);
          setActiveFile(getUpdatedFile.length - 1);
          setCode(getUpdatedFile[getUpdatedFile.length - 1].content);
          setSelectedLanguage(
            getUpdatedFile[getUpdatedFile.length - 1].language
          );
          setConsoleOutput(
            getUpdatedFile[getUpdatedFile.length - 1].consoleOutput || ""
          );
        }

        // Update tostMessageObj for success
        setTostMessageObj({
          status: true,
          message: `File "${file.name}" deleted successfully.`,
          variant: "warning",
        });
        setIsMessage(true);
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(() => {
          setIsMessage(false);
          setTostMessageObj({ status: false, message: "" });
        }, 800);
      }
    } catch (error) {
      console.error("Error deleting file:", error);

      // Update tostMessageObj for error
      setTostMessageObj({
        status: true,
        message: `Error deleting file "${file.name}".`,
        variant: "error",
      });
      setIsMessage(true);
      if (timeId) clearTimeout(timeId);
      timeId = setTimeout(() => {
        setIsMessage(false);
        setTostMessageObj({ status: false, message: "" });
      }, 800);
    }
  };

  const handleFileSelect = (file: FileTy, idx: number) => {
    let updatedFiles = [...files];
    updatedFiles.map((file) => (file.active = false));
    updatedFiles[idx].active = true;
    setFiles(updatedFiles);
    setActiveFile(idx);
    setCode(file.content || ""); // Ensure content is not null
    setSelectedLanguage(file.language);
    setConsoleOutput(file.consoleOutput || "");
  };

  const handleRenameFile = async (id: string, newName: string) => {
    try {
      const updatedFile = await renameFile(id, newName);
      const updatedFiles = files.map((file) =>
        file._id === id ? { ...file, name: updatedFile.name } : file
      );
      setFiles(updatedFiles);
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  };

  const handelIsUnsaved = (activeFile: number) => {
    if (files.length === 0 || !files[activeFile]) {
      return false;
    }
    return files[activeFile].content !== code;
  };

  useEffect(() => {
    setUnsaved(handelIsUnsaved(activeFile));
  }, [code]);

  const handelSaveFile = async () => {
    let updateFiles = [...files];
    updateFiles[activeFile].content = code;
    updateFiles[activeFile].consoleOutput = consoleOutput;
    setFiles(updateFiles);
    setUnsaved(false);

    try {
      // Use saveCode API to save the content
      await saveCode(updateFiles[activeFile]._id, code);

      // Update tostMessageObj for success
      setTostMessageObj({
        status: true,
        message: `File "${updateFiles[activeFile].name}" saved successfully.`,
        variant: "success",
      });
      setIsMessage(true);
      if (timeId) clearTimeout(timeId);
      timeId = setTimeout(() => {
        setIsMessage(false);
        setTostMessageObj({ status: false, message: "" });
      }, 800);
    } catch (error) {
      console.error("Error saving file:", error);

      // Update tostMessageObj for error
      setTostMessageObj({
        status: true,
        message: `Error saving file "${updateFiles[activeFile].name}".`,
        variant: "error",
      });
      setIsMessage(true);
      if (timeId) clearTimeout(timeId);
      timeId = setTimeout(() => {
        setIsMessage(false);
        setTostMessageObj({ status: false, message: "" });
      }, 800);
    }
  };
  const closeDrawer = () => {
    let localWidgetsStatus = {
      ...widgetsStatus,
    };
    localWidgetsStatus.codeEditor = "close";
    handelWidgetsStatus(localWidgetsStatus);
  };

  const openDrawer = () => {
    let localWidgetsStatus = {
      ...widgetsStatus,
    };
    localWidgetsStatus.codeEditor = "open";
    handelWidgetsStatus(localWidgetsStatus);
  };
  return (
    <div>
      {actionButton === true && (
        <Button
          variant="contained"
          onClick={openDrawer}
          size="small"
          sx={{ fontSize: "0.75rem", padding: "4px 8px" }}
        >
          Open Code Editor
        </Button>
      )}

      <Drawer
        anchor="right"
        open={widgetsStatus.codeEditor === "open"}
        onClose={closeDrawer}
        PaperProps={{
          style: { width: "100%", zIndex: 1500, position: "fixed" },
        }}
      >
        <div className="code-editor__layout">
          {tostMessageObj.status && (
            <TostMessage
              message={tostMessageObj.message}
              isOpen={tostMessageObj.status}
              variant={tostMessageObj.variant}
              theme={selectedTheme}
            />
          )}
          {/* Top Navigation */}
          <div className={`code-editor__top-nav ${selectedTheme}`}>
            <div className="code-editor__top-nav__left">
              <Box className="code-editor--save-btn" onClick={handelSaveFile}>
                <Save size={18} />
                {unsaved && "*"}
              </Box>
            </div>

            <Box className="code-editor__top-nav__right">
              <Select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                size="small"
                sx={{ fontSize: "0.75rem", minWidth: 100 }}
                className="code-editor--language-select"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .MuiMenuItem-root:focus": {
                        outline: "none",
                        border: "none",
                        backgroundColor: "transparent",
                      },
                      "& .MuiMenuItem-root:hover": {
                        outline: "none",
                        border: "none",
                        backgroundColor: "transparent",
                      },
                    },
                  },
                }}
              >
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="typescript">TypeScript</MenuItem>
              </Select>
              <IconButton
                onClick={() => {
                  playCodeThemeAudio();
                  setSelectedTheme(
                    selectedTheme === "light" ? "vs-dark" : "light"
                  );
                }}
                color="inherit"
                size="small"
              >
                {selectedTheme === "light" ? (
                  <Tooltip title="Light">
                    <WbSunnyIcon />
                  </Tooltip>
                ) : (
                  <Tooltip title="Dark">
                    <BedtimeIcon />
                  </Tooltip>
                )}
              </IconButton>
              <Button
                variant="outlined"
                onClick={closeDrawer}
                size="small"
                sx={{ fontSize: "0.75rem", padding: "0" }}
                startIcon={<CloseIcon />}
                className="code-editor--close-btn"
              ></Button>
            </Box>
          </div>

          {/* Main Content Area */}
          <div className="code-editor__main">
            {/* Sidebar */}
            <div className={`code-editor__sidebar ${selectedTheme}`}>
              <Box className="sidekick__icons">
                <Files className="file_icons" />
                <Search className="file_icons" />
                <GitBranch className="file_icons" />
                <Bug className="file_icons" />
                <Settings className="file_icons" />
              </Box>
              <Box className="sidekick__files scrollable-files">
                <Box className="file__header">
                  <FolderOpen className="folder-open-icon" />
                  EXPLORER
                  <Select
                    value=""
                    onChange={async (e) => {
                      const fileType = e.target.value as string;
                      await addNewFile(fileType);
                    }}
                    displayEmpty
                    renderValue={() => <Plus className="add-file-icon" />}
                    size="small"
                    sx={{ fontSize: "0.75rem" }}
                    className="code-editor--add-file-select"
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .MuiMenuItem-root:focus": {
                            outline: "none",
                            border: "none",
                            backgroundColor: "transparent",
                          },
                          "& .MuiMenuItem-root:hover": {
                            outline: "none",
                            border: "none",
                            backgroundColor: "transparent",
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="typescript">Add TypeScript File</MenuItem>
                    <MenuItem value="javascript">Add JavaScript File</MenuItem>
                    <MenuItem value="tsx">Add TSX File</MenuItem>
                  </Select>
                </Box>
                <Box className="file__list">
                  {files.map((file: FileTy, idx: number) => (
                    <Box
                      className={`file__item__container ${
                        selectedTheme === "vs-dark" ? "dark" : "light"
                      } ${file?.active ? "active" : ""}`}
                      key={idx}
                    >
                      {file.language === "typescript" ||
                      file.language === "tsx" ||
                      file.language === "ts" ? (
                        <FileType
                          className={`file__icon ${
                            file.language === "typescript"
                              ? "typescript"
                              : "tsx"
                          }`}
                          size={18}
                        />
                      ) : (
                        <File className={`file__icon javascript`} size={18} />
                      )}
                      <Box
                        key={idx}
                        className={`file__item ${
                          idx === activeFile ? "active" : ""
                        }`}
                        onClick={() => handleFileSelect(file, idx)}
                        onMouseDown={(e) => e.preventDefault()}
                        onDoubleClick={() => {
                          const newName = prompt(
                            "Enter new file name:",
                            file.name
                          );
                          if (newName) {
                            handleRenameFile(file._id, newName);
                          }
                        }}
                      >
                        {file.name}
                      </Box>
                      {file?.deleted !== false && (
                        <X
                          size={13}
                          className="file__close"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(file);
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </div>

            {/* Code Editor */}
            <div className={`code-editor__editor ${selectedTheme}`}>
              <Editor
                height="100%"
                defaultLanguage={selectedLanguage}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme={selectedTheme}
              />
            </div>
          </div>

          {/* Terminal / Log Area */}
          <div
            className={`code-editor__terminal ${
              selectedTheme === "vs-dark" ? "dark" : "light"
            }`}
          >
            <div
              className={`run-code-btn ${runAction ? "active" : ""}`}
              onClick={runCode}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  runCode();
                }
              }}
              tabIndex={0} // Make the div focusable
            >
              <PlayArrowIcon />
              <div>Run code</div>
            </div>
            <pre>{consoleOutput || "Console output will appear here..."}</pre>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default DrawerCodeEditor;
