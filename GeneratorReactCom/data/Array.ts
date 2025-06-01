import { DataJsonTy } from "../generator/dataType";

const data: DataJsonTy = {
  fileInformation: {
    file: {
      folderName: "Arrays",
      name: "Arrays",
      extension: ".tsx",
      componentType: "page",
    },
    cssFile: {
      folderName: "Arrays",
      name: "Arrays",
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
    pageName: "Arrays",
    pageNumber: "1",
    pageType: "page",
    pageHeader: {
      pageTitle: "JavaScript Arrays",
      description: "Learn about Arrays in JavaScript",
      keywords: "Javascript, DSA, Arrays, Data Structures",
      isReadyToListen: true,
    },
  },
  pageContent: [
    {
      type: "article",
      title: "Understanding JavaScript Arrays",
      content:
        "Arrays in JavaScript are used to store multiple values in a single variable. They are a special type of object with built-in methods to perform common operations.",
      number: "1",
      isReadyToListen: true,
      playIcon: "<PlayCircleFilledWhiteOutlinedIcon/>",
      bulletPoint: [
        {
          id: "1",
          textContent: "Creating and initializing arrays",
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
          textContent: "Multi-dimensional arrays",
          icon: "GridOnOutlinedIcon",
        },
      ],
    },
  ],
  routesInformation: {
    element: "<Arrays />",
    name: "Arrays",
    link: "/arrays",
    icon: "ViewArray",
    exact: true,
    private: true,
  },
};

export default data;
