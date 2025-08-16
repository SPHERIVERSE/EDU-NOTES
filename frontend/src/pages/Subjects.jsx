import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../AuthContext";
import { Book, Plus, ArrowRight, Search } from "lucide-react";

export default function Subjects() {
  const { semesterId } = useParams();
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  async function loadSubjects() {
    try {
      const data = await api.subjects(semesterId);
      setSubjects(data);
      setFilteredSubjects(data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSubjects();
  }, [semesterId]);

  useEffect(() => {
    const filtered = subjects.filter(subject =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSubjects(filtered);
  }, [searchQuery, subjects]);

  async function addSubject() {
    if (!newSubjectName.trim()) return;
    
    setIsAdding(true);
    try {
      await api.addSubject({ 
        name: newSubjectName.trim(), 
        semester_id: Number(semesterId) 
      });
      setNewSubjectName("");
      setShowAddForm(false);
      await loadSubjects();
    } catch (error) {
      console.error("Error adding subject:", error);
    } finally {
      setIsAdding(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subjects</h1>
          <p className="text-gray-600">Select a subject to view and contribute notes</p>
        </div>
        
        {user && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search subjects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Add Subject Form */}
      {user && showAddForm && (
        <div className="card mb-8 animate-slide-up">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Subject</h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Subject name (e.g., Mathematics, Physics)"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSubject()}
              className="input-field flex-1"
            />
            <button
              onClick={addSubject}
              disabled={isAdding || !newSubjectName.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? "Adding..." : "Add"}
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewSubjectName("");
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Subjects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject, index) => (
          <Link
            key={subject.id}
            to={`/subject/${subject.id}/notes`}
            className="group card hover:shadow-lg hover:scale-105 transform transition-all duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary-100 rounded-xl group-hover:bg-primary-200 transition-colors duration-200">
                <Book className="w-6 h-6 text-primary-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
              {subject.name}
            </h3>
            
            <p className="text-gray-600 text-sm">
              Click to view notes and study materials
            </p>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredSubjects.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Book className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? "No subjects found" : "No subjects available"}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? `No subjects match "${searchQuery}"`
              : "No subjects have been added for this semester yet."
            }
          </p>
          {user && !searchQuery && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              Add First Subject
            </button>
          )}
        </div>
      )}
    </div>
  );
}
