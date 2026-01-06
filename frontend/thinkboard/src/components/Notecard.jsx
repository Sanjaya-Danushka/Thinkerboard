import { PenSquare, Trash2, Clock, Tag, Star, Archive } from "lucide-react";
import { Link } from "react-router-dom";

const Notecard = ({ note, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete(note._id);
  };

  const getCategoryColor = (category) => {
    if (!category) return "bg-neutral/10 text-neutral";
    const colors = {
      work: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      personal: "bg-green-500/10 text-green-500 border-green-500/20",
      ideas: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      important: "bg-red-500/10 text-red-500 border-red-500/20",
      todo: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    };
    return (
      colors[category.toLowerCase()] ||
      "bg-primary/10 text-primary border-primary/20"
    );
  };

  const getPreviewText = (content) => {
    if (!content) return "No content";
    const plainText = content.replace(/[#*`_~\[\]()]/g, "").trim();
    return plainText.length > 120
      ? plainText.substring(0, 120) + "..."
      : plainText;
  };

  return (
    <div className="group relative h-full">
      <Link to={`/note/${note._id}`} className="block h-full">
        <div className="h-full bg-base-100 rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-base-200 hover:border-primary/30 hover:-translate-y-1 flex flex-col relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Priority indicator */}
          {note.priority === "high" && (
            <div className="absolute top-4 right-4">
              <Star className="w-4 h-4 text-warning fill-warning animate-pulse-slow" />
            </div>
          )}

          {/* Header with title and category */}
          <div className="mb-4 relative z-10">
            <div className="flex justify-between items-start gap-3 mb-2">
              <h3 className="text-xl font-bold text-base-content line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
                {note.title || "Untitled Note"}
              </h3>
            </div>

            {note.category && (
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(note.category)}`}
                >
                  <Tag className="w-3 h-3" />
                  {note.category}
                </span>
                {note.pinned && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            )}
          </div>

          {/* Content preview */}
          <div className="flex-1 relative z-10 mb-4">
            <p className="text-base-content/70 text-sm leading-relaxed line-clamp-4">
              {getPreviewText(note.content)}
            </p>
          </div>

          {/* Tags */}
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4 relative z-10">
              {note.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-base-200 text-base-content/60 rounded-md"
                >
                  #{tag}
                </span>
              ))}
              {note.tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-base-200 text-base-content/60 rounded-md">
                  +{note.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-base-200 relative z-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-xs text-base-content/50 gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDate(note.updatedAt || note.createdAt)}</span>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Archive functionality
                  }}
                  className="p-2 rounded-lg hover:bg-base-200 transition-colors duration-200"
                  title="Archive note"
                >
                  <Archive className="w-4 h-4 text-base-content/60 hover:text-base-content" />
                </button>
                <Link
                  to={`/note/edit/${note._id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
                  title="Edit note"
                >
                  <PenSquare className="w-4 h-4 text-base-content/60 hover:text-primary" />
                </Link>
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-lg hover:bg-error/10 transition-colors duration-200"
                  title="Delete note"
                >
                  <Trash2 className="w-4 h-4 text-base-content/60 hover:text-error" />
                </button>
              </div>
            </div>
          </div>

          {/* Hover effect border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/20 transition-all duration-500 pointer-events-none"></div>
        </div>
      </Link>
    </div>
  );
};

export default Notecard;
