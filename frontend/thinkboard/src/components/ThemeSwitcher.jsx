import React, { useState, useEffect } from "react";
import { Sun, Moon, Palette, Check } from "lucide-react";

const themes = [
  { name: "light", icon: Sun, label: "Light" },
  { name: "dark", icon: Moon, label: "Dark" },
  { name: "cupcake", icon: Palette, label: "Cupcake" },
  { name: "bumblebee", icon: Palette, label: "Bumblebee" },
  { name: "emerald", icon: Palette, label: "Emerald" },
  { name: "corporate", icon: Palette, label: "Corporate" },
  { name: "synthwave", icon: Palette, label: "Synthwave" },
  { name: "retro", icon: Palette, label: "Retro" },
  { name: "cyberpunk", icon: Palette, label: "Cyberpunk" },
  { name: "valentine", icon: Palette, label: "Valentine" },
  { name: "halloween", icon: Palette, label: "Halloween" },
  { name: "garden", icon: Palette, label: "Garden" },
  { name: "forest", icon: Palette, label: "Forest" },
  { name: "aqua", icon: Palette, label: "Aqua" },
  { name: "lofi", icon: Palette, label: "LoFi" },
  { name: "pastel", icon: Palette, label: "Pastel" },
  { name: "fantasy", icon: Palette, label: "Fantasy" },
  { name: "wireframe", icon: Palette, label: "Wireframe" },
  { name: "black", icon: Palette, label: "Black" },
  { name: "luxury", icon: Palette, label: "Luxury" },
  { name: "dracula", icon: Palette, label: "Dracula" },
  { name: "cmyk", icon: Palette, label: "CMYK" },
  { name: "autumn", icon: Palette, label: "Autumn" },
  { name: "business", icon: Palette, label: "Business" },
  { name: "acid", icon: Palette, label: "Acid" },
  { name: "lemonade", icon: Palette, label: "Lemonade" },
  { name: "night", icon: Palette, label: "Night" },
  { name: "coffee", icon: Palette, label: "Coffee" },
  { name: "winter", icon: Palette, label: "Winter" },
  { name: "thinkboard", icon: Palette, label: "ThinkBoard" },
];

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setIsOpen(false);
  };

  const getCurrentThemeIcon = () => {
    const theme = themes.find((t) => t.name === currentTheme);
    return theme ? theme.icon : Palette;
  };

  const CurrentIcon = getCurrentThemeIcon();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CurrentIcon className="w-5 h-5" />
      </div>
      {isOpen && (
        <div
          tabIndex={0}
          className="dropdown-content bg-base-200 rounded-box z-50 w-80 p-2 shadow-2xl border border-base-300 max-h-96 overflow-y-auto custom-scrollbar"
        >
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.name}
                  onClick={() => handleThemeChange(theme.name)}
                  className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                    currentTheme === theme.name
                      ? "bg-primary text-primary-content"
                      : "hover:bg-base-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{theme.label}</span>
                  {currentTheme === theme.name && (
                    <Check className="w-3 h-3 ml-auto" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
