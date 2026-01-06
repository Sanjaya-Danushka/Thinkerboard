import React from "react";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
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
        const res = await axios.get("http://localhost:5001/api/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes");
        }
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
        {true && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
