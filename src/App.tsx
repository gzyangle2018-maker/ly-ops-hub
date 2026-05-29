import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Agents from "./pages/Agents";
import LLMSettings from "./pages/LLMSettings";
import Settings from "./pages/Settings";
import Docs from "./pages/Docs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/llm" element={<LLMSettings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/docs" element={<Docs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
