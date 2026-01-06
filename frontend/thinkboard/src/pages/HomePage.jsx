import React from "react";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
import Notecard from "../components/Notecard";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FileText, Sparkles, Search, Filter } from "lucide-react";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = React.useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5001/api/notes");
        console.log("Fetched notes:", res.data);
        setNotes(res.data || []);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response) {
          if (error.response.status === 429) {
            setIsRateLimited(true);
            toast.error("Rate limit exceeded. Please try again later.");
          } else {
            toast.error(
              `Error: ${error.response.data?.message || "Failed to fetch notes"}`,
            );
          }
        } else {
          toast.error("Network error. Please check your connection.");
        }
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(
        (note) =>
          note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.category?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredNotes(filtered);
    }
  }, [searchTerm, notes]);

  const handleDeleteNote = async (noteId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this note?",
      );
      if (!confirmed) return;

      await axios.delete(`http://localhost:5001/api/notes/${noteId}`);
      setNotes(notes.filter((note) => note._id !== noteId));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error(error.response?.data?.message || "Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="inline-block animate-pulse">
              <Sparkles className="w-12 h-12 mx-auto text-primary animate-pulse-slow" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold gradient-text">
                Loading your notes...
              </h2>
              <p className="text-base-content/60">Preparing your workspace</p>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      {isRateLimited ? <RateLimitedUi /> : null}

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text animate-gradient">
              Your Digital Thinkboard
            </h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Organize your thoughts, capture ideas, and boost your productivity
              with our beautiful note-taking experience.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search notes by title, content, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 backdrop-blur-sm transition-all duration-200"
              />
            </div>
            <button className="btn btn-outline btn-square">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 py-8">
        {isRateLimited ? (
          <RateLimitedUi />
        ) : (
          <>
            {/* Stats Bar */}
            <div className="mb-8 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex gap-6">
                <div className="stat">
                  <div className="stat-title">Total Notes</div>
                  <div className="stat-value text-2xl text-primary">
                    {notes.length}
                  </div>
                </div>
                {searchTerm && (
                  <div className="stat">
                    <div className="stat-title">Filtered Results</div>
                    <div className="stat-value text-2xl text-secondary">
                      {filteredNotes.length}
                    </div>
                  </div>
                )}
              </div>
              {notes.length > 0 && (
                <div className="text-sm text-base-content/60">
                  {notes.length === 1 ? "1 note" : `${notes.length} notes`} •
                  Last updated {new Date().toLocaleDateString()}
                </div>
              )}
            </div>

            {/* Notes Grid */}
            {filteredNotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNotes.map((note, index) => (
                  <div
                    key={note._id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Notecard note={note} onDelete={handleDeleteNote} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 space-y-4">
                <div className="inline-block">
                  <FileText className="w-16 h-16 mx-auto text-base-content/30" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-base-content/70">
                    {searchTerm ? "No notes found" : "No notes yet"}
                  </h3>
                  <p className="text-base-content/50 max-w-md mx-auto">
                    {searchTerm
                      ? "Try adjusting your search terms or browse all notes."
                      : "Create your first note to get started with your digital thinkboard."}
                  </p>
                </div>
                {!searchTerm && (
                  <a href="/create" className="btn btn-primary mt-4">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Your First Note
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
