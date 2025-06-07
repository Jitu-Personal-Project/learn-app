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
      audioSrc: "/Welcome-javascript.wav",
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
    {
      type: "highlightContext",
      title: "How to use this course",
      isReadyToListen: true,
      audioTextContent:
        "How to use this course ? 1. Read the concept overview. 2. Listen to the audio explanation. 3. Review key points and examples. 4. Check or write notes in the Sidekick menu. 5. Practice with code exercises. 6. Take the quiz to test yourself.",
      content: [
        {
          id: "1", // ID of the highlight data.
          content: "1) Read the concept overview", // Text content of the highlight data.
          icon: "AutoStoriesOutlinedIcon", // Icon for the highlight data.
        },
        {
          id: "2", // ID of the highlight data.
          content: "2) Listen to the audio explanation", // Text content of the highlight data.
          icon: "PlayCircleFilledWhiteOutlinedIcon", // Icon for the highlight data.
        },
        {
          id: "3", // ID of the highlight data.
          content: "3) Review key points and examples", // Text content of the highlight data.
          icon: "VpnKeyOutlinedIcon", // Icon for the highlight data.
        },
        {
          id: "4", // ID of the highlight data.
          content: "4) Check or write notes in the Sidekick menu", // Text content of the highlight data.
          icon: "FaceOutlinedIcon", // Icon for the highlight data.
        },
        {
          id: "5", // ID of the highlight data.
          content: "5) Practice with code exercises", // Text content of the highlight data.
          icon: "FaceOutlinedIcon", // Icon for the highlight data.
        },
        {
          id: "6", // ID of the highlight data.
          content: "6) Take the quiz to test yourself", // Text content of the highlight data.
          icon: "QuestionMarkOutlinedIcon", // Icon for the highlight data.
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
