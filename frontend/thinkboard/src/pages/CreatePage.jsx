import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, Save, Sparkles, FileText } from "lucide-react";
import axios from "axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    } else if (content.trim().length < 10) {
      newErrors.content = "Content must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/notes", {
        title: title.trim(),
        content: content.trim(),
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error(error.response?.data?.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    if (title.trim() || content.trim()) {
      localStorage.setItem("noteDraft", JSON.stringify({ title, content }));
      toast.success("Draft saved locally");
    }
  };

  const loadDraft = () => {
    const draft = localStorage.getItem("noteDraft");
    if (draft) {
      const { title: draftTitle, content: draftContent } = JSON.parse(draft);
      if (draftTitle || draftContent) {
        setTitle(draftTitle || "");
        setContent(draftContent || "");
        toast.success("Draft loaded");
      }
    }
  };

  React.useEffect(() => {
    loadDraft();
  }, []);

  React.useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (title.trim() || content.trim()) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [title, content]);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="sticky top-0 z-40 glass border-b border-base-content/10 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="btn btn-ghost btn-sm gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h1 className="text-xl font-bold">Create New Note</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="btn btn-ghost btn-sm"
                disabled={loading}
              >
                Save Draft
              </button>
              <button
                form="note-form"
                type="submit"
                className="btn btn-primary gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Create Note
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form id="note-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-base-content"
            >
              Note Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-base-200/50 focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-error focus:ring-error/20"
                  : "border-base-300 focus:border-primary focus:ring-primary/20"
              }`}
              placeholder="Enter a compelling title for your note..."
              disabled={loading}
            />
            {errors.title && (
              <p className="text-sm text-error flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Content Textarea */}
          <div className="space-y-2">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-base-content"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-base-200/50 focus:outline-none focus:ring-2 min-h-[400px] resize-y custom-scrollbar ${
                errors.content
                  ? "border-error focus:ring-error/20"
                  : "border-base-300 focus:border-primary focus:ring-primary/20"
              }`}
              placeholder="Write your thoughts, ideas, or notes here..."
              disabled={loading}
            />
            {errors.content && (
              <p className="text-sm text-error flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {errors.content}
              </p>
            )}
          </div>

          {/* Character Count */}
          <div className="flex justify-between items-center text-sm text-base-content/60">
            <div className="flex gap-4">
              <span>Title: {title.length} characters</span>
              <span>Content: {content.length} characters</span>
            </div>
            <div>
              {title.length >= 3 && content.length >= 10 ? (
                <span className="text-success flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Ready to create
                </span>
              ) : (
                <span className="text-warning flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {title.length < 3 && "Title needs 3+ chars"}
                  {title.length < 3 && content.length < 10 && " • "}
                  {content.length < 10 && "Content needs 10+ chars"}
                </span>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 pt-4">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setContent("");
                setErrors({});
                localStorage.removeItem("noteDraft");
                toast.success("Form cleared");
              }}
              className="btn btn-ghost btn-sm"
              disabled={loading}
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={() => {
                const sampleContent = `# Welcome to Your Note

This is a sample note to help you get started. You can write anything here:

## Ideas
- Brainstorm new concepts
- Make to-do lists
- Save important information

## Thoughts
Write down your thoughts, reflections, or anything that comes to mind.

## Links
Save useful links and resources for later reference.

Happy note-taking! 🎉`;
                setTitle("Sample Note");
                setContent(sampleContent);
                toast.success("Sample content loaded");
              }}
              className="btn btn-ghost btn-sm"
              disabled={loading}
            >
              Load Sample
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
