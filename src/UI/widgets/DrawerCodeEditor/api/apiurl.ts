const BASE_URL = "http://localhost:5001/api";

export const API_URLS = {
  FILES: `${BASE_URL}/files`,
  FILE_BY_ID: (id: string) => `${BASE_URL}/files/${id}`,
};

export default API_URLS;
