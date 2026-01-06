import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon, BookOpen, Sparkles } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-base-content/10 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <BookOpen className="w-5 h-5 text-primary-content" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
                Thinkboard
              </h1>
              <p className="text-xs text-base-content/60 hidden sm:block">
                Digital note-taking made beautiful
              </p>
            </div>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-4 px-4 py-2 rounded-lg bg-base-200/50">
              <div className="text-center">
                <div className="text-xs text-base-content/60">Today</div>
                <div className="text-sm font-semibold text-primary">
                  5 notes
                </div>
              </div>
              <div className="w-px h-6 bg-base-content/20"></div>
              <div className="text-center">
                <div className="text-xs text-base-content/60">Total</div>
                <div className="text-sm font-semibold text-secondary">
                  24 notes
                </div>
              </div>
            </div>

            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Create Note Button */}
            <Link
              to="/create"
              className="btn btn-primary gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <PlusIcon className="w-4 h-4" />
              <span className="hidden sm:inline">New Note</span>
              <Sparkles className="w-3 h-3 hidden sm:block animate-pulse" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
