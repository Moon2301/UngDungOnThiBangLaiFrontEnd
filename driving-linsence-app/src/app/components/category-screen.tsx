import { ChevronLeft, Play, BookOpen } from 'lucide-react';
import { Question } from '../data/questions';

interface CategoryScreenProps {
  categoryId: string;
  categoryName: string;
  questions: Question[];
  onBack: () => void;
  onStartPractice: (questions: Question[]) => void;
}

export function CategoryScreen({
  categoryId,
  categoryName,
  questions,
  onBack,
  onStartPractice,
}: CategoryScreenProps) {
  const categoryQuestions = questions.filter((q) => q.category === categoryId);
  const importantQuestions = categoryQuestions.filter((q) => q.isImportant);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
          <p className="text-gray-600 mt-1">
            {categoryQuestions.length} câu hỏi • {importantQuestions.length} câu điểm liệt
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Start Practice Button */}
        <button
          onClick={() => onStartPractice(categoryQuestions)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <Play className="w-7 h-7" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">Bắt đầu luyện tập</h3>
              <p className="text-sm text-white/90">Học tất cả {categoryQuestions.length} câu hỏi</p>
            </div>
          </div>
        </button>

        {/* Important Questions Section */}
        {importantQuestions.length > 0 && (
          <button
            onClick={() => onStartPractice(importantQuestions)}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Câu hỏi điểm liệt</h3>
                <p className="text-sm text-white/90">
                  Ôn tập {importantQuestions.length} câu bắt buộc phải đúng
                </p>
              </div>
            </div>
          </button>
        )}

        {/* Questions List */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold text-lg mb-4">Danh sách câu hỏi</h2>
          <div className="space-y-3">
            {categoryQuestions.map((question, index) => (
              <div
                key={question.id}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-1">
                      <p className="text-gray-800 flex-1">{question.question}</p>
                      {question.isImportant && (
                        <span className="flex-shrink-0 px-2 py-0.5 bg-red-600 text-white text-xs font-semibold rounded">
                          ĐIỂM LIỆT
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
