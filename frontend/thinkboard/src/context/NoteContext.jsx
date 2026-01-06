import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const NoteContext = createContext();

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NoteProvider");
  }
  return context;
};

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5001/api/notes");
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

  const createNote = async (noteData) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/notes",
        noteData,
      );
      setNotes((prev) => [response.data.newNote, ...prev]);
      toast.success("Note created successfully!");
      return response.data.newNote;
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error(error.response?.data?.message || "Failed to create note");
      throw error;
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/notes/${id}`,
        noteData,
      );
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? response.data : note)),
      );
      toast.success("Note updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error(error.response?.data?.message || "Failed to update note");
      throw error;
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error(error.response?.data?.message || "Failed to delete note");
      throw error;
    }
  };

  const getTodayNotesCount = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return notes.filter((note) => {
      const noteDate = new Date(note.createdAt);
      return noteDate >= today;
    }).length;
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const value = {
    notes,
    loading,
    isRateLimited,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    getTodayNotesCount,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
