import { PenSquare, Trash2, Clock, Tag } from "lucide-react";
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

  return (
    <div className="group relative">
      <Link to={`/note/${note._id}`} className="block h-full">
        <div className="h-full bg-base-100 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-base-200 hover:border-primary/20 hover:-translate-y-0.5 flex flex-col">
          {/* Header with title and category */}
          <div className="mb-3">
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-lg font-semibold text-base-content line-clamp-2 leading-tight">
                {note.title || "Untitled Note"}
              </h3>
              {note.category && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  <Tag className="w-3 h-3" />
                  {note.category}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="text-base-content/80 text-sm line-clamp-4 mb-4">
              {note.content || "No content"}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-base-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-xs text-base-content/60 gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatDate(note.updatedAt || note.createdAt)}
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Link
                  to={`/note/edit/${note._id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="btn btn-ghost btn-sm btn-square hover:bg-base-200"
                  title="Edit note"
                >
                  <PenSquare className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn btn-ghost btn-sm btn-square text-error hover:bg-error/10"
                  title="Delete note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Notecard;
