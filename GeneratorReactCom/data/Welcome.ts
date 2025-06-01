import { DataJsonTy } from "../generator/dataType";

const data: DataJsonTy = {
  fileInformation: {
    file: {
      folderName: "Welcome",
      name: "Welcome",
      extension: ".tsx",
      componentType: "page",
    },
    cssFile: {
      folderName: "Welcome",
      name: "Welcome",
      extension: ".css",
      content: "",
    },
    apiFile: {
      name: "",
      folderName: undefined,
      extension: undefined,
      methods: [],
    },
    dataFile: {
      name: "",
      folderName: undefined,
      extension: undefined,
      content: undefined,
    },
  },
  pageInformation: {
    pageName: "Welcome",
    pageNumber: "1",
    pageType: "page",
    pageHeader: {
      pageTitle: "JavaScript Welcome",
      description: "Learn about Welcome in JavaScript",
      keywords: "Javascript, DSA, Welcome, Data Structures",
      isReadyToListen: true,
    },
  },
  pageContent: [
    {
      type: "article",
      title: "Understanding JavaScript Welcome",
      content:
        "Welcome in JavaScript are used to store multiple values in a single variable. They are a special type of object with built-in methods to perform common operations.",
      number: "1",
      isReadyToListen: true,
      playIcon: "<PlayCircleFilledWhiteOutlinedIcon/>",
      bulletPoint: [
        {
          id: "1",
          textContent: "Creating and initializing array",
          icon: "CodeOutlinedIcon",
        },
        {
          id: "2",
          textContent: "Common array methods and their time complexity",
          icon: "AccessTimeOutlinedIcon",
        },
        {
          id: "3",
          textContent: "Array traversal techniques",
          icon: "LoopOutlinedIcon",
        },
        {
          id: "4",
          textContent: "Multi-dimensional array",
          icon: "GridOnOutlinedIcon",
        },
      ],
    },
  ],
  routesInformation: {
    element: "<Welcome />",
    name: "Welcome",
    link: "/welcome",
    icon: "ViewArray",
    exact: true,
    private: true,
  },
};

export default data;
