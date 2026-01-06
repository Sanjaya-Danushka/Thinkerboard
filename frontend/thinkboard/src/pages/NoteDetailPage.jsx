import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Edit3,
  Save,
  X,
  Trash2,
  Clock,
  Calendar,
  FileText,
} from "lucide-react";
import axios from "axios";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/notes/${id}`,
        );
        setNote(response.data);
        setEditTitle(response.data.title);
        setEditContent(response.data.content);
      } catch (error) {
        console.error("Error fetching note:", error);
        if (error.response?.status === 404) {
          toast.error("Note not found");
        } else {
          toast.error("Failed to load note");
        }
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const validateEditForm = () => {
    const newErrors = {};

    if (!editTitle.trim()) {
      newErrors.title = "Title is required";
    } else if (editTitle.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!editContent.trim()) {
      newErrors.content = "Content is required";
    } else if (editContent.trim().length < 10) {
      newErrors.content = "Content must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateEditForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setUpdateLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5001/api/notes/${id}`,
        {
          title: editTitle.trim(),
          content: editContent.trim(),
        },
      );

      setNote(response.data);
      setIsEditing(false);
      toast.success("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error(error.response?.data?.message || "Failed to update note");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note? This action cannot be undone.",
    );
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error(error.response?.data?.message || "Failed to delete note");
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
    setErrors({});
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="text-base-content/60">Loading note...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <FileText className="w-16 h-16 mx-auto text-base-content/30" />
          <h2 className="text-xl font-semibold text-base-content/70">
            Note not found
          </h2>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
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
                <h1 className="text-xl font-bold">
                  {isEditing ? "Edit Note" : "Note Details"}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="btn btn-ghost btn-sm gap-2"
                    disabled={updateLoading}
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    form="edit-form"
                    type="submit"
                    className="btn btn-primary btn-sm gap-2"
                    disabled={updateLoading}
                  >
                    {updateLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline btn-sm gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="btn btn-error btn-sm gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {isEditing ? (
          <form id="edit-form" onSubmit={handleUpdate} className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label
                htmlFor="edit-title"
                className="block text-sm font-medium text-base-content"
              >
                Note Title
              </label>
              <input
                type="text"
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-base-200/50 focus:outline-none focus:ring-2 ${
                  errors.title
                    ? "border-error focus:ring-error/20"
                    : "border-base-300 focus:border-primary focus:ring-primary/20"
                }`}
                placeholder="Enter note title..."
                disabled={updateLoading}
              />
              {errors.title && (
                <p className="text-sm text-error">{errors.title}</p>
              )}
            </div>

            {/* Content Textarea */}
            <div className="space-y-2">
              <label
                htmlFor="edit-content"
                className="block text-sm font-medium text-base-content"
              >
                Content
              </label>
              <textarea
                id="edit-content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-base-200/50 focus:outline-none focus:ring-2 min-h-[400px] resize-y custom-scrollbar ${
                  errors.content
                    ? "border-error focus:ring-error/20"
                    : "border-base-300 focus:border-primary focus:ring-primary/20"
                }`}
                placeholder="Write your note content here..."
                disabled={updateLoading}
              />
              {errors.content && (
                <p className="text-sm text-error">{errors.content}</p>
              )}
            </div>

            {/* Character Count */}
            <div className="flex justify-between items-center text-sm text-base-content/60">
              <div className="flex gap-4">
                <span>Title: {editTitle.length} characters</span>
                <span>Content: {editContent.length} characters</span>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Note Header */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-base-content leading-tight">
                {note.title}
              </h2>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-sm text-base-content/60">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Created: {formatDate(note.createdAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Updated: {formatDate(note.updatedAt)}
                </div>
              </div>
            </div>

            {/* Note Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-base-200/30 rounded-xl p-6 border border-base-300">
                <div className="whitespace-pre-wrap text-base-content leading-relaxed">
                  {note.content}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="stat bg-base-200/30 rounded-lg p-4">
                <div className="stat-title text-xs">Title Length</div>
                <div className="stat-value text-lg text-primary">
                  {note.title.length}
                </div>
              </div>
              <div className="stat bg-base-200/30 rounded-lg p-4">
                <div className="stat-title text-xs">Content Length</div>
                <div className="stat-value text-lg text-secondary">
                  {note.content.length}
                </div>
              </div>
              <div className="stat bg-base-200/30 rounded-lg p-4">
                <div className="stat-title text-xs">Total Characters</div>
                <div className="stat-value text-lg text-accent">
                  {note.title.length + note.content.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetailPage;
