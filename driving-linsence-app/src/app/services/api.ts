// src/app/services/api.ts
import type { Question } from '../data/questions';

// THAY ĐỔI CỔNG NÀY KHỚP VỚI PORT CỦA .NET API TRÊN MÁY BẠN (VD: 5001, 7112, v.v.)
const BASE_URL = 'https://localhost:5001/api';

// Định nghĩa kiểu dữ liệu trả về từ Backend để TypeScript kiểm soát lỗi
export interface ExamResponse {
    examId: string;
    licenseCategory: { id: string; name: string };
    timeLimit: number; // Tính bằng phút
    questions: Question[]; // Dữ liệu câu hỏi đã bốc chuẩn ma trận
}

/**
 * Hàm gọi API tạo đề thi mới dựa trên hạng bằng (License Category)
 * @param categoryId Mã hạng bằng (VD: "A1", "B2")
 * @returns Promise chứa dữ liệu đề thi
 */
export const generateExam = async (categoryId: string): Promise<ExamResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/Exam/CreateExam?categoryId=${categoryId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Lỗi HTTP: ${response.status} - ${response.statusText}`);
        }

        const data: ExamResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Lỗi khi kết nối với máy chủ Backend:", error);
        throw error;
    }
};