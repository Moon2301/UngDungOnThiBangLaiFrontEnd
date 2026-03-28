import { useEffect, useState } from 'react';
import { HomeScreen } from './components/home-screen';
import { LicenseScreen } from './components/license-screen';
import { QuizScreen } from './components/quiz-screen';
import type { QuizResults } from './components/quiz-screen';
import { ResultsScreen } from './components/results-screen';
import { CategoryScreen } from './components/category-screen';
import { SignsLibrary } from './components/signs-library';
import type { FrontendQuestion, LicenseCategoryResponse } from './services/api';
import { startSession, flushSession, recordQuizResult } from './services/progress';

// ─── Kiểu màn hình ────────────────────────────────────────────────────────────
type Screen =
  | { type: 'home' }
  | { type: 'license'; category: LicenseCategoryResponse }
  | {
      type: 'category';
      category: LicenseCategoryResponse;
      topicId: number;
      topicName: string;
    }
  | { type: 'quiz'; questions: FrontendQuestion[]; title: string; timeLimit?: number }
  | { type: 'results'; results: QuizResults; questions: FrontendQuestion[] , isPractice?: boolean}
  | { type: 'signs';  };

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: 'home' });

  // ── Bắt đầu session khi app mount ─────────────────────────────────────────
  useEffect(() => {
    startSession();
    const interval = setInterval(flushSession, 2 * 60_000);
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') flushSession();
      if (document.visibilityState === 'visible') startSession();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
      flushSession();
    };
  }, []);

  // ── Điều hướng ──────────────────────────────────────────────────────────────

  const goHome = () => setScreen({ type: 'home' });

  const goLicense = (category: LicenseCategoryResponse) =>
    setScreen({ type: 'license', category });

  const goCategory = (
    category: LicenseCategoryResponse,
    topicId: number,
    topicName: string,
  ) => setScreen({ type: 'category', category, topicId, topicName });

  const goQuiz = (
    questions: FrontendQuestion[],
    title: string,
    timeLimit?: number,
  ) => setScreen({ type: 'quiz', questions, title, timeLimit });

  const goResults = (results: QuizResults, questions: FrontendQuestion[], isPractice?: boolean) => {
    recordQuizResult({ answers: results.answers });
    setScreen({ type: 'results', results, questions, isPractice  });
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  if (screen.type === 'home') {
    return (
      <HomeScreen
        onSelectCategory={goLicense}
        onStartExam={(questions, timeLimit, title) =>
          goQuiz(questions, title ?? 'Đề thi thử', timeLimit)
        }
        onSignsLibrary={() => setScreen({ type: 'signs' })}
      />
    );
  }

  if (screen.type === 'license') {
    return (
      <LicenseScreen
        category={screen.category}
        onBack={goHome}
        onSelectTopic={(topicId, topicName) =>
          goCategory(screen.category, topicId, topicName)
        }
        onStartExam={(questions, timeLimit) =>
          goQuiz(questions, `Thi thử – ${screen.category.name}`, timeLimit)
        }
      />
    );
  }

  if (screen.type === 'category') {
    return (
      <CategoryScreen
        category={screen.category}
        topicId={screen.topicId}
        topicName={screen.topicName}
        onBack={() => setScreen({ type: 'license', category: screen.category })}
        onStartPractice={(questions) =>
          goQuiz(questions, `Luyện tập – ${screen.topicName}`)
        }
      />
    );
  }

  if (screen.type === 'quiz') {
    return (
      <QuizScreen
        questions={screen.questions}
        title={screen.title}
        timeLimit={screen.timeLimit}
        onBack={goHome}
        onComplete={(results) => goResults(results, screen.questions,!screen.timeLimit)}
      />
    );
  }

  if (screen.type === 'results') {
    return (
      <ResultsScreen
        results={screen.results}
        questions={screen.questions}
        isPractice={screen.isPractice} 
        onRetry={() =>
          goQuiz(
            screen.questions, 
            'Làm lại', 
            screen.isPractice ? undefined : 20 
          )
        }
        onHome={goHome}
      />
    );
  }

  if (screen.type === 'signs') {
    return <SignsLibrary onBack={goHome} />;
  }

  return null;
}
