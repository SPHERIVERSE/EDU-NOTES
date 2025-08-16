import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../AuthContext";
import SearchBar from "../components/SearchBar";
import ContributeModal from "../components/ContributeModal";
import { 
  FileText, 
  Plus, 
  Calendar, 
  User, 
  Tag,
  BookOpen,
  Edit3
} from "lucide-react";

export default function Notes() {
  const { subjectId } = useParams();
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [subject, setSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);

  async function loadNotes(query = "", module = "") {
    try {
      const data = await api.notes(subjectId, query, module);
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  }

  useEffect(() => {
    loadNotes().finally(() => setIsLoading(false));
  }, [subjectId]);

  const handleSearch = (query, module) => {
    loadNotes(query, module);
  };

  const handleContributeNote = async (noteData) => {
    await api.addNote({ ...noteData, subject_id: Number(subjectId) });
    await loadNotes();
  };

  const formatContent = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n/g, '<br>');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-primary-600" />
            Notes
          </h1>
          <p className="text-gray-600">Browse and contribute study materials</p>
        </div>
        
        {user && (
          <button
            onClick={() => setIsContributeModalOpen(true)}
            className="btn-primary flex items-center hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Contribute Notes
          </button>
        )}
      </div>

      {/* Search Bar */}
      <SearchBar 
        onSearch={handleSearch}
        placeholder="Search notes by title or content..."
        showModuleFilter={true}
      />

      {/* Notes Grid */}
      {notes.length > 0 ? (
        <div className="grid gap-6">
          {notes.map((note, index) => (
            <div
              key={note.id}
              className="card hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Note Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-primary-600" />
                    {note.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    {note.module_name && (
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                          {note.module_name}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(note.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      Contributor
                    </div>
                  </div>
                </div>
                
                {user && (
                  <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Note Content */}
              <div className="prose prose-sm max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formatContent(note.content) }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Notes Found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            No study materials have been added for this subject yet. Be the first to contribute!
          </p>
          {user && (
            <button
              onClick={() => setIsContributeModalOpen(true)}
              className="btn-primary flex items-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Note
            </button>
          )}
        </div>
      )}

      {/* Contribute Modal */}
      <ContributeModal
        isOpen={isContributeModalOpen}
        onClose={() => setIsContributeModalOpen(false)}
        onSubmit={handleContributeNote}
        subjectName={subject?.name || "this subject"}
      />
    </div>
  );
}
