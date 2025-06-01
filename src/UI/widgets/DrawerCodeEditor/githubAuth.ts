import axios from "axios";

export const authenticateWithGitHub = async () => {
  const clientId = "YOUR_GITHUB_CLIENT_ID";
  const redirectUri = "http://localhost:3000"; // Update with your redirect URI
  const scope = "repo";
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  return authUrl;
};

export const handleGitHubCallback = async (code: string) => {
  try {
    const response = await axios.post("/api/github/callback", { code });
    return response.data;
  } catch (error) {
    console.error("GitHub callback failed:", error);
    throw error;
  }
};
