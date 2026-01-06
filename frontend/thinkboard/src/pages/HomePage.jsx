import React from "react";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
import Notecard from "../components/Notecard";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = React.useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited ? <RateLimitedUi /> : null}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading ? (
          <div className="text-center text-primary py-10">Loading notes...</div>
        ) : isRateLimited ? (
          <RateLimitedUi />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length > 0 ? (
              notes.map((note) => <Notecard key={note._id} note={note} />)
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                No notes found. Create your first note!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
