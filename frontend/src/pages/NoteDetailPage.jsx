import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../lib/axios";
import { toast } from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await instance.get(`/notes/${id}`);
        // Backend returns: { success: true, data: noteData }
        setNote(res.data.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        if (error.response?.status === 404) {
          toast.error("Note not found");
          navigate("/");
        } else {
          toast.error("Failed to fetch the note");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNote();
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await instance.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      if (error.response?.status === 404) {
        toast.error("Note not found");
      } else {
        toast.error("Failed to delete note");
      }
    }
  };

  const handleSave = async () => {
    if (!note?.title?.trim() || !note?.content?.trim()) {
      toast.error("Please add both title and content");
      return;
    }

    setSaving(true);

    try {
      const response = await instance.put(`/notes/${id}`, {
        title: note.title,
        content: note.content
      });
      toast.success("Note updated successfully");
      // Update local state with response data
      setNote(response.data.data);
    } catch (error) {
      console.log("Error saving the note:", error);
      if (error.response?.status === 404) {
        toast.error("Note not found");
        navigate("/");
      } else if (error.response?.status === 400) {
        toast.error("Invalid note data");
      } else {
        toast.error("Failed to update note");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 flex items-center justify-center">
        <div className="text-center">
          <LoaderIcon className="animate-spin size-12 text-primary mx-auto mb-4" />
          <p className="text-primary text-lg">Loading note...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost hover:bg-primary/20 hover:text-primary transition-all duration-300">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline hover:btn-error hover:shadow-lg transition-all duration-300">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-xl border border-primary/20">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  value={note?.title || ""}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  value={note?.content || ""}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary hover:btn-secondary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" disabled={saving} onClick={handleSave}>
                  {saving ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default NoteDetailPage;