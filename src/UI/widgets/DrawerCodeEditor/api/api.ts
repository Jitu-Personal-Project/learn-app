import axios from "axios";
import API_URLS from "./apiurl";

// Define the backend base URL
const BASE_URL = "http://localhost:5001"; // Replace with your backend server's URL and port

export const fetchFiles = async () => {
  try {
    const response = await axios.get(API_URLS.FILES);
    return response.data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};

export const createFile = async (fileData: any) => {
  try {
    const response = await axios.post(API_URLS.FILES, fileData);
    return response.data;
  } catch (error) {
    console.error("Error creating file:", error);
    throw error;
  }
};

export const createFileWithLanguage = async (fileData: any) => {
  try {
    const response = await axios.post(`${API_URLS.FILES}/new`, fileData);
    return response.data;
  } catch (error) {
    console.error("Error creating file with language:", error);
    throw error;
  }
};

export const getFileById = async (id: string) => {
  try {
    const response = await axios.get(API_URLS.FILE_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Error fetching file by ID:", error);
    throw error;
  }
};

export const updateFile = async (id: string, fileData: any) => {
  try {
    const response = await axios.put(API_URLS.FILE_BY_ID(id), fileData);
    return response.data;
  } catch (error) {
    console.error("Error updating file:", error);
    throw error;
  }
};

export const renameFile = async (id: string, newName: string) => {
  try {
    const response = await axios.put(API_URLS.FILE_BY_ID(id), {
      name: newName,
    });
    return response.data;
  } catch (error) {
    console.error("Error renaming file:", error);
    throw error;
  }
};

export const deleteFile = async (id: string) => {
  try {
    const response = await axios.delete(API_URLS.FILE_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export const updateFileActiveStatus = async (id: string, active: boolean) => {
  try {
    const response = await axios.put(API_URLS.FILE_BY_ID(id), { active });
    return response.data;
  } catch (error) {
    console.error("Error updating file active status:", error);
    throw error;
  }
};

export const saveCode = async (fileId: string, content: string) => {
  console.log("LLLLLLLLLLL>>>>>>>>>>>>>>>>>>>>", fileId, content);
  try {
    const response = await axios.post(`${BASE_URL}/api/files/save`, {
      content,
      fileId,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving code:", error);
    throw error;
  }
};
