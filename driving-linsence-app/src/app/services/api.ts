// src/app/services/api.ts

// ── Đổi port này khớp với .NET backend của bạn ──
const BASE_URL = 'https://localhost:7288/api';

// ─────────────────────────────────────────────────
// Kiểu dữ liệu trả về từ Backend
// ─────────────────────────────────────────────────

/** GET /api/LicenseCategory/GetAvailable */
export interface LicenseCategoryResponse {
  id: number;
  name: string;
  description: string;
  totalQuestions: number;
  timeLimit: number;       // phút
  minimumPassScore: number;
}

/** GET /api/Question/ByTopic/{topicId} */
export interface AnswerResponse {
  id: number;
  answerText: string;
  isCorrect: boolean;
  imageUrl: string | null;
}

export interface QuestionResponse {
  id: number;
  questionText: string;
  imageUrl: string | null;
  isCritical: boolean;
  explanation: string;
  answers: AnswerResponse[];
}

/** POST /api/Exam/CreateExam?categoryId={id} */
export interface ExamQuestionResponse {
  id: string;
  text: string;
  imageUrl: string | null;
  isCritical: boolean;
  explanation: string;
  answers: {
    id: string;
    text: string;
    imageUrl: string | null;
    isCorrect: boolean;
  }[];
}

export interface ExamResponse {
  examId: string;
  licenseCategory: { id: string; name: string };
  timeLimit: number;
  questions: ExamQuestionResponse[];
}

// ─────────────────────────────────────────────────
// Kiểu Question dùng trong Frontend (quiz-screen)
// ─────────────────────────────────────────────────
export interface FrontendQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;   // index trong mảng options
  explanation: string;
  category: string;
  isImportant?: boolean;
  imageUrl?: string | null;
}

// ─────────────────────────────────────────────────
// Helper: chuyển đổi dữ liệu API → FrontendQuestion
// ─────────────────────────────────────────────────

/** Chuyển QuestionResponse (ByTopic) → FrontendQuestion */
export function mapQuestionResponse(q: QuestionResponse, category = ''): FrontendQuestion {
  const correctIdx = q.answers.findIndex((a) => a.isCorrect);
  return {
    id: q.id,
    question: q.questionText,
    options: q.answers.map((a) => a.answerText),
    correctAnswer: correctIdx >= 0 ? correctIdx : 0,
    explanation: q.explanation,
    category,
    isImportant: q.isCritical,
    imageUrl: q.imageUrl,
  };
}

/** Chuyển ExamQuestionResponse (CreateExam) → FrontendQuestion */
export function mapExamQuestion(q: ExamQuestionResponse): FrontendQuestion {
  const correctIdx = q.answers.findIndex((a) => a.isCorrect);
  return {
    id: parseInt(q.id, 10) || 0,
    question: q.text,
    options: q.answers.map((a) => a.text),
    correctAnswer: correctIdx >= 0 ? correctIdx : 0,
    explanation: q.explanation,
    category: '',
    isImportant: q.isCritical,
    imageUrl: q.imageUrl,
  };
}

// ─────────────────────────────────────────────────
// API Calls
// ─────────────────────────────────────────────────

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    let message = `Lỗi HTTP ${response.status}`;
    try {
      const body = await response.json();
      message = body?.message ?? message;
    } catch {
      // giữ message mặc định
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

/**
 * Lấy danh sách hạng bằng lái khả dụng
 * GET /api/LicenseCategory/GetAvailable
 */
export async function fetchLicenseCategories(): Promise<LicenseCategoryResponse[]> {
  return apiFetch<LicenseCategoryResponse[]>(`${BASE_URL}/LicenseCategory/GetAvailable`);
}

/**
 * Lấy câu hỏi theo chủ đề (topic)
 * GET /api/Question/ByTopic/{topicId}
 */
export async function fetchQuestionsByTopic(topicId: number): Promise<QuestionResponse[]> {
  return apiFetch<QuestionResponse[]>(`${BASE_URL}/Question/ByTopic/${topicId}`);
}

/**
 * Tạo đề thi ngẫu nhiên theo hạng bằng
 * POST /api/Exam/CreateExam?categoryId={categoryId}
 */
export async function createExam(categoryId: number): Promise<ExamResponse> {
  return apiFetch<ExamResponse>(`${BASE_URL}/Exam/CreateExam?categoryId=${categoryId}`, {
    method: 'POST',
  });
}