import { useState } from "react";
import { X, Upload, FileText, Save } from "lucide-react";

export default function ContributeModal({ isOpen, onClose, onSubmit, subjectName }) {
  const [form, setForm] = useState({
    title: "",
    module_name: "",
    content: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(form);
      setForm({ title: "", module_name: "", content: "" });
      onClose();
    } catch (error) {
      console.error("Error submitting note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-blue-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-primary-600" />
              Contribute Notes
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Add your notes to <span className="font-medium">{subjectName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Introduction to Calculus"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Module/Chapter (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Module 1: Limits and Derivatives"
              value={form.module_name}
              onChange={(e) => setForm({ ...form, module_name: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              placeholder="Write your notes here... You can use markdown formatting."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              className="input-field resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Tip: You can use markdown formatting like **bold**, *italic*, and `code`
            </p>
          </div>

          {/* Future file upload placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              File upload feature coming soon!
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Support for PDFs, images, and documents
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !form.title.trim() || !form.content.trim()}
            className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Saving..." : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
}
