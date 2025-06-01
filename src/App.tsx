import Layout from "./Layout/Layout";
import { AppProvider } from "./contexts/context"; // Import the context, not the hook
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
