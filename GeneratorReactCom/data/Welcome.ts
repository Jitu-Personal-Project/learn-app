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
      title: "How to use this course",
      isReadyToListen: true,
      audioTextContent: "hello",
      content: "read the concept overview",
      number: 1,
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
    {
      type: "imageGallery",
      content: [
        {
          id: 1,
          url: "https://cdn.pixabay.com/photo/2024/06/19/08/18/woman-8839452_1280.jpg",
        },
        {
          id: 2,
          url: "https://media.istockphoto.com/id/1452731336/photo/blue-colored-megaphone-standing-out-from-the-crowd.jpg?s=1024x1024&w=is&k=20&c=vsvKQVvz7mYjbJxK0NnljSQinbXIxHcP5EFgOqC4cM8=",
        },
        {
          id: 3,
          url: "https://media.istockphoto.com/id/1468173966/photo/cocktail-party-bright-fruity-and-citrus-alcoholic-drinks-with-gin-vodka-vermouth-and-juice.jpg?s=1024x1024&w=is&k=20&c=UZoYFu6ODQaLQ__zzayqhe6OUZ6G-QG9cdpdeqSUpwk=",
        },
        {
          id: 4,
          url: "https://media.istockphoto.com/id/1406358305/photo/row-of-different-color-cars-on-asphalt-parking-lot-at-cloudy-summer-day.jpg?s=1024x1024&w=is&k=20&c=A6DTnCvdASKyUQRIpk0RQ_B21KzhYTnHaJnxsMTmZpI=",
        },
      ],
    },
    {
      type: "image",
      content: {
        id: "1",
        url: "https://cdn.pixabay.com/photo/2024/06/19/08/18/woman-8839452_1280.jpg",
        alt: "First image",
        height: "300px",
      },
    },
    {
      type: "article",
      title: "How to use this course",
      isReadyToListen: true,
      audioTextContent: "hello",
      content:
        "Arrays are fundamental data structures that allow you to store multiple values in a single variable. They are used extensively in programming for managing collections of data.",
      number: 1,
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
