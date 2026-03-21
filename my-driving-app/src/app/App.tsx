import { useState } from 'react';
import { HomeScreen } from './components/home-screen';
import { LicenseScreen } from './components/license-screen';
import { QuizScreen, QuizResults } from './components/quiz-screen';
import { ResultsScreen } from './components/results-screen';
import { CategoryScreen } from './components/category-screen';
import { questions, categories, licenseTypes } from './data/questions';
import { Question } from './data/questions';

type Screen = 
  | { type: 'home' }
  | { type: 'license'; licenseId: string; licenseName: string }
  | { type: 'category'; licenseId: string; licenseName: string; categoryId: string; categoryName: string }
  | { type: 'quiz'; questions: Question[]; title: string; timeLimit?: number }
  | { type: 'results'; results: QuizResults; questions: Question[] };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: 'home' });

  const handleSelectLicense = (licenseId: string) => {
    const license = licenseTypes.find((l) => l.id === licenseId);
    if (license) {
      setScreen({ type: 'license', licenseId, licenseName: license.name });
    }
  };

  const handleSelectCategory = (licenseId: string, licenseName: string, categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      setScreen({ 
        type: 'category', 
        licenseId,
        licenseName,
        categoryId, 
        categoryName: category.name 
      });
    }
  };

  const handleStartExam = () => {
    // Randomly select 25 questions for exam
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const examQuestions = shuffled.slice(0, 25);
    setScreen({
      type: 'quiz',
      questions: examQuestions,
      title: 'Đề thi thử',
      timeLimit: 19,
    });
  };

  const handleStartPractice = (practiceQuestions: Question[]) => {
    setScreen({
      type: 'quiz',
      questions: practiceQuestions,
      title: 'Luyện tập',
    });
  };

  const handleQuizComplete = (results: QuizResults, quizQuestions: Question[]) => {
    setScreen({
      type: 'results',
      results,
      questions: quizQuestions,
    });
  };

  const handleRetry = (quizQuestions: Question[], title: string, timeLimit?: number) => {
    setScreen({
      type: 'quiz',
      questions: quizQuestions,
      title,
      timeLimit,
    });
  };

  const handleBackToHome = () => {
    setScreen({ type: 'home' });
  };

  const handleBackToLicense = (licenseId: string, licenseName: string) => {
    setScreen({ type: 'license', licenseId, licenseName });
  };

  if (screen.type === 'home') {
    return (
      <HomeScreen
        onSelectLicense={handleSelectLicense}
        onStartExam={handleStartExam}
      />
    );
  }

  if (screen.type === 'license') {
    return (
      <LicenseScreen
        licenseId={screen.licenseId}
        licenseName={screen.licenseName}
        onBack={handleBackToHome}
        onSelectCategory={(categoryId) => 
          handleSelectCategory(screen.licenseId, screen.licenseName, categoryId)
        }
      />
    );
  }

  if (screen.type === 'category') {
    return (
      <CategoryScreen
        categoryId={screen.categoryId}
        categoryName={screen.categoryName}
        questions={questions}
        onBack={() => handleBackToLicense(screen.licenseId, screen.licenseName)}
        onStartPractice={handleStartPractice}
      />
    );
  }

  if (screen.type === 'quiz') {
    return (
      <QuizScreen
        questions={screen.questions}
        title={screen.title}
        timeLimit={screen.timeLimit}
        onBack={handleBackToHome}
        onComplete={(results) => handleQuizComplete(results, screen.questions)}
      />
    );
  }

  if (screen.type === 'results') {
    return (
      <ResultsScreen
        results={screen.results}
        questions={screen.questions}
        onRetry={() => {
          // Determine if this was an exam or practice
          const isExam = screen.questions.length === 25;
          if (isExam) {
            handleStartExam();
          } else {
            handleRetry(screen.questions, 'Luyện tập');
          }
        }}
        onHome={handleBackToHome}
      />
    );
  }

  return null;
}