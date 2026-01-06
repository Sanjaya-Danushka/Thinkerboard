import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { Toaster } from "react-hot-toast";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
  useEffect(() => {
    // Initialize theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--fallback-b1,oklch(var(--b1)))",
            color: "var(--fallback-bc,oklch(var(--bc)))",
            border: "1px solid var(--fallback-b2,oklch(var(--b2)))",
          },
          success: {
            iconTheme: {
              primary: "var(--fallback-su,oklch(var(--su)))",
              secondary: "var(--fallback-suc,oklch(var(--suc)))",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--fallback-er,oklch(var(--er)))",
              secondary: "var(--fallback-erc,oklch(var(--erc)))",
            },
          },
        }}
      />
    </div>
  );
};

export default App;
