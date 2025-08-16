import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { GraduationCap, School, University, BookOpen, ArrowRight } from "lucide-react";

const levelIcons = {
  "School": School,
  "Undergraduate": University,
  "Postgraduate": GraduationCap,
};

export default function Levels() {
  const [levels, setLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.levels()
      .then(setLevels)
      .finally(() => setIsLoading(false));
  }, []);

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
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-6 animate-bounce-subtle">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Education Level
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select your education level to access relevant study materials and notes
        </p>
      </div>

      {/* Level Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level, index) => {
          const IconComponent = levelIcons[level.name] || BookOpen;
          return (
            <Link
              key={level.id}
              to={`/level/${level.id}/semesters`}
              className="group card hover:shadow-lg hover:scale-105 transform transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary-100 rounded-xl group-hover:bg-primary-200 transition-colors duration-200">
                  <IconComponent className="w-8 h-8 text-primary-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                {level.name}
              </h3>
              
              <p className="text-gray-600 text-sm">
                {level.name === "School" && "Classes 1-12 curriculum and study materials"}
                {level.name === "Undergraduate" && "Bachelor's degree programs and courses"}
                {level.name === "Postgraduate" && "Master's and advanced degree programs"}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Stats or Info Section */}
      <div className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Join Thousands of Students
          </h2>
          <p className="text-gray-600 mb-6">
            Access comprehensive study materials, contribute your notes, and collaborate with peers
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">1000+</div>
              <div className="text-sm text-gray-600">Notes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">500+</div>
              <div className="text-sm text-gray-600">Subjects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">100+</div>
              <div className="text-sm text-gray-600">Contributors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
