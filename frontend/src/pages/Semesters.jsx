import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";

export default function Semesters() {
  const { levelId } = useParams();
  const [semesters, setSemesters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.semesters(levelId)
      .then(setSemesters)
      .finally(() => setIsLoading(false));
  }, [levelId]);

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
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-6">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Select Semester
        </h1>
        <p className="text-xl text-gray-600">
          Choose your semester to access subjects and study materials
        </p>
      </div>

      {/* Semester Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {semesters.map((semester, index) => (
          <Link
            key={semester.id}
            to={`/semester/${semester.id}/subjects`}
            className="group card hover:shadow-lg hover:scale-105 transform transition-all duration-300 text-center"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
              {semester.name}
            </h3>
            
            <div className="flex items-center justify-center text-gray-400 group-hover:text-primary-600 transition-colors duration-200">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </Link>
        ))}
      </div>

      {semesters.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Semesters Found</h3>
          <p className="text-gray-600">No semesters are available for this level.</p>
        </div>
      )}
    </div>
  );
}
