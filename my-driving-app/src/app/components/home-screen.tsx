import { BookOpen, Trophy, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { mockProgress, licenseTypes } from '../data/questions';

interface HomeScreenProps {
  onSelectLicense: (licenseId: string) => void;
  onStartExam: () => void;
}

export function HomeScreen({ onSelectLicense, onStartExam }: HomeScreenProps) {
  const progressPercentage = Math.round(
    (mockProgress.completedQuestions / mockProgress.totalQuestions) * 100
  );
  const accuracyPercentage = Math.round(
    (mockProgress.correctAnswers / mockProgress.completedQuestions) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg sm:text-xl">Ôn Thi Bằng Lái Xe</h1>
              <p className="text-xs sm:text-sm text-gray-600">Hạng B1, B2, C, D</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Progress Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h2 className="font-semibold text-base sm:text-lg mb-4">Tiến độ học tập</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Câu hỏi đã học</span>
                <span className="font-semibold">
                  {mockProgress.completedQuestions}/{mockProgress.totalQuestions}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{accuracyPercentage}%</div>
                <div className="text-xs text-gray-600">Độ chính xác</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-green-600">{mockProgress.correctAnswers}</div>
                <div className="text-xs text-gray-600">Câu đúng</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-purple-600">{mockProgress.practiceTime}</div>
                <div className="text-xs text-gray-600">Phút học</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Exam */}
        <button
          onClick={onStartExam}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl shadow-lg p-4 sm:p-6 flex items-center justify-between hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-base sm:text-lg">Thi Thử Ngay</h3>
              <p className="text-xs sm:text-sm text-white/90">25 câu hỏi • 19 phút</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* License Types */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h2 className="font-semibold text-base sm:text-lg mb-4">Chọn hạng bằng lái</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {licenseTypes.map((license) => (
              <button
                key={license.id}
                onClick={() => onSelectLicense(license.id)}
                className={`bg-gradient-to-r ${license.color} text-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all hover:scale-105 active:scale-100`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left flex-1 min-w-0">
                    <h3 className="font-bold text-lg sm:text-xl mb-1">{license.name}</h3>
                    <p className="text-xs sm:text-sm text-white/90 line-clamp-2">{license.description}</p>
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center ml-3 sm:ml-4 flex-shrink-0">
                    {license.icon === 'Bike' && (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="18.5" cy="17.5" r="3.5" strokeWidth={2} />
                        <circle cx="5.5" cy="17.5" r="3.5" strokeWidth={2} />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 6a1 1 0 100-2 1 1 0 000 2zM12 17.5V14l-3-3 4-3 2 3h3" />
                      </svg>
                    )}
                    {license.icon === 'Car' && (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1-1V4a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h2a1 1 0 001-1m-6 0h6" />
                      </svg>
                    )}
                    {license.icon === 'Truck' && (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1-1V4a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h2a1 1 0 001-1m-6 0h6" />
                        <rect x="16" y="8" width="4" height="4" strokeWidth={2} />
                      </svg>
                    )}
                    {license.icon === 'Bus' && (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 11h8M8 15h4M6 19a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2M6 19a2 2 0 100 4M18 19a2 2 0 100 4" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg p-4 sm:p-6 text-white">
          <h3 className="font-bold text-base sm:text-lg mb-2">💡 Mẹo học tập</h3>
          <p className="text-xs sm:text-sm text-white/90">
            Tập trung vào các câu hỏi điểm liệt (đánh dấu ⚠️) - đây là những câu bắt buộc phải trả lời đúng trong kỳ thi chính thức!
          </p>
        </div>
      </div>
    </div>
  );
}