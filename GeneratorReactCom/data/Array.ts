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
      type: "highlightContext",
      title: "how to use this page",
      content: [
        {
          id: "1", // ID of the highlight data.
          content: "Read the concept introduction", // Text content of the highlight data.
          icon: "AutoStoriesOutlinedIcon", // Icon for the highlight data.
        },
        {
          id: "2", // ID of the highlight data.
          content: "Listen to the audio explanation", // Text content of the highlight data.
          icon: "PlayCircleFilledWhiteOutlinedIcon", // Icon for the highlight data.
        },
        {
          id: "3", // ID of the highlight data.
          content: "Review key concepts and examples", // Text content of the highlight data.
          icon: "VpnKeyOutlinedIcon", // Icon for the highlight data.
        },
        {
          id: "4", // ID of the highlight data.
          content: "Try the practice exercises", // Text content of the highlight data.
          icon: "FaceOutlinedIcon", // Icon for the highlight data.
        },
        {
          id: "5", // ID of the highlight data.
          content: "Take the quiz to test your understanding", // Text content of the highlight data.
          icon: "QuestionMarkOutlinedIcon", // Icon for the highlight data.
        },
      ],
    },
    {
      type: "highlightContext",
      title: "how to use this page 22",
      content: [
        {
          id: "1", // ID of the highlight data.
          content: "Read the concept introduction", // Text content of the highlight data.
          icon: "AutoStoriesOutlinedIcon", // Icon for the highlight data.
        },
        {
          id: "2", // ID of the highlight data.
          content: "Listen to the audio explanation", // Text content of the highlight data.
          icon: "PlayCircleFilledWhiteOutlinedIcon", // Icon for the highlight data.
        },
        {
          id: "3", // ID of the highlight data.
          content: "Review key concepts and examples", // Text content of the highlight data.
          icon: "VpnKeyOutlinedIcon", // Icon for the highlight data.
        },
        {
          id: "4", // ID of the highlight data.
          content: "Try the practice exercises", // Text content of the highlight data.
          icon: "FaceOutlinedIcon", // Icon for the highlight data.
        },
        {
          id: "5", // ID of the highlight data.
          content: "Take the quiz to test your understanding", // Text content of the highlight data.
          icon: "QuestionMarkOutlinedIcon", // Icon for the highlight data.
        },
      ],
    },
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
