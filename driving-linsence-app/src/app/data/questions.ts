export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  isImportant?: boolean;
}

export interface LicenseType {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export const licenseTypes: LicenseType[] = [
  {
    id: 'b1',
    name: 'Hạng B1',
    description: 'Xe mô tô 2 bánh, 3 bánh có dung tích > 50cm³',
    color: 'from-blue-500 to-blue-600',
    icon: 'Bike',
  },
  {
    id: 'b2',
    name: 'Hạng B2',
    description: 'Xe ô tô < 9 chỗ ngồi, xe tải < 3.500kg',
    color: 'from-green-500 to-green-600',
    icon: 'Car',
  },
  {
    id: 'c',
    name: 'Hạng C',
    description: 'Xe tải có trọng tải > 3.500kg',
    color: 'from-orange-500 to-orange-600',
    icon: 'Truck',
  },
  {
    id: 'd',
    name: 'Hạng D',
    description: 'Xe ô tô chở khách từ 9 đến 30 chỗ ngồi',
    color: 'from-purple-500 to-purple-600',
    icon: 'Bus',
  },
];

export const categories = [
  { id: 'general', name: 'Khái niệm & Quy tắc', icon: 'BookOpen' },
  { id: 'signs', name: 'Biển báo đường bộ', icon: 'Triangle' },
  { id: 'situation', name: 'Tình huống giao thông', icon: 'Car' },
  { id: 'culture', name: 'Văn hóa lái xe', icon: 'Users' },
  { id: 'structure', name: 'Kỹ thuật lái xe', icon: 'Settings' },
];

export const questions: Question[] = [
  {
    id: 1,
    question: '"Người điều khiển giao thông" được hiểu như thế nào?',
    options: [
      'Là người điều khiển phương tiện tham gia giao thông tại nơi thi công, nơi ùn tắc giao thông, ở bến phà, tại cầu đường bộ đi chung với đường sắt',
      'Là cảnh sát giao thông, người được giao nhiệm vụ hướng dẫn giao thông tại nơi thi công, nơi ùn tắc giao thông, ở bến phà, tại cầu đường bộ đi chung với đường sắt',
      'Là người tham gia giao thông tại nơi thi công, nơi ùn tắc giao thông',
    ],
    correctAnswer: 1,
    explanation: 'Người điều khiển giao thông phải là người có thẩm quyền như cảnh sát giao thông hoặc người được giao nhiệm vụ.',
    category: 'general',
    isImportant: true,
  },
  {
    id: 2,
    question: 'Khái niệm "Phương tiện giao thông thô sơ đường bộ" được hiểu như thế nào?',
    options: [
      'Là xe đạp (kể cả xe đạp máy, xe đạp điện), xe xích lô, xe ba bánh, xe lăn dùng cho người khuyết tật',
      'Là xe đạp (kể cả xe đạp máy, xe đạp điện), xe gắn máy, xe cơ giới dùng cho người khuyết tật',
      'Là xe đạp, xe xích lô, xe ba bánh, xe gắn máy, xe cơ giới dùng cho người khuyết tật và xe máy chuyên dùng',
    ],
    correctAnswer: 0,
    explanation: 'Phương tiện giao thông thô sơ là các loại xe không có động cơ hoặc có động cơ nhỏ như xe đạp, xích lô.',
    category: 'general',
  },
  {
    id: 3,
    question: 'Biển báo hiệu hình tròn có nền màu xanh lam là loại biển gì dưới đây?',
    options: [
      'Biển báo cấm',
      'Biển báo nguy hiểm',
      'Biển hiệu lệnh phải thi hành',
      'Biển chỉ dẫn',
    ],
    correctAnswer: 2,
    explanation: 'Biển hiệu lệnh có hình tròn, nền xanh lam, viền đỏ, biểu tượng màu trắng.',
    category: 'signs',
    isImportant: true,
  },
  {
    id: 4,
    question: 'Khi gặp hiệu lệnh như hình vẽ của cảnh sát giao thông thì người tham gia giao thông phải đi như thế nào?',
    options: [
      'Người tham gia giao thông ở các hướng phải dừng lại',
      'Người tham gia giao thông ở các hướng được đi theo chiều gậy chỉ của cảnh sát giao thông',
      'Người tham gia giao thông ở phía trước và phía sau người điều khiển được đi tất cả các hướng; người tham gia giao thông ở phía bên phải và bên trái người điều khiển phải dừng lại',
    ],
    correctAnswer: 2,
    explanation: 'Khi cảnh sát giao thông giơ tay thẳng đứng, các phương tiện ở phía trước và sau được đi, hai bên phải dừng.',
    category: 'signs',
  },
  {
    id: 5,
    question: 'Bạn đang lái xe phía trước có một xe cảnh sát giao thông không phát tín hiệu ưu tiên bạn có được phép vượt hay không?',
    options: [
      'Không được vượt',
      'Được vượt khi đang đi trên cầu',
      'Được phép vượt khi đi qua nơi giao nhau có ít phương tiện cùng tham gia giao thông',
      'Được vượt khi đảm bảo an toàn',
    ],
    correctAnswer: 3,
    explanation: 'Xe cảnh sát không phát tín hiệu ưu tiên được coi như xe thường, có thể vượt khi đảm bảo an toàn.',
    category: 'situation',
  },
  {
    id: 6,
    question: 'Hành vi điều khiển xe cơ giới chạy quá tốc độ quy định, giành đường, vượt ẩu có bị nghiêm cấm hay không?',
    options: [
      'Bị nghiêm cấm tùy từng trường hợp',
      'Không bị nghiêm cấm',
      'Bị nghiêm cấm',
    ],
    correctAnswer: 2,
    explanation: 'Chạy quá tốc độ, giành đường, vượt ẩu đều bị nghiêm cấm vì gây nguy hiểm cho người tham gia giao thông.',
    category: 'culture',
    isImportant: true,
  },
  {
    id: 7,
    question: 'Người điều khiển phương tiện tham gia giao thông trong hầm đường bộ ngoài việc phải tuân thủ các quy tắc giao thông còn phải thực hiện những quy định nào dưới đây?',
    options: [
      'Xe cơ giới, xe máy chuyên dùng phải bật đèn; xe thô sơ phải bật đèn hoặc có vật phát sáng báo hiệu; chỉ được dừng xe, đỗ xe ở nơi quy định',
      'Xe cơ giới phải bật đèn ngay cả khi đường hầm sáng; phải cho xe chạy với tốc độ tối thiểu theo quy định; không được quay đầu xe',
      'Xe máy chuyên dùng phải bật đèn ngay cả khi đường hầm sáng; phải cho xe chạy với tốc độ tối thiểu theo quy định; không được quay đầu xe',
    ],
    correctAnswer: 0,
    explanation: 'Trong hầm đường bộ phải bật đèn, chỉ dừng đỗ xe ở nơi quy định để đảm bảo an toàn.',
    category: 'situation',
  },
  {
    id: 8,
    question: 'Trên đoạn đường bộ giao nhau đồng mức với đường sắt chỉ có đèn tín hiệu hoặc chuông báo hiệu, khi đèn tín hiệu màu đỏ đã bật sáng hoặc có tiếng chuông báo hiệu, người tham gia giao thông phải dừng lại ngay và giữ khoảng cách tối thiểu bao nhiêu mét tính từ ray gần nhất?',
    options: [
      '5 mét',
      '3 mét',
      '4 mét',
    ],
    correctAnswer: 0,
    explanation: 'Khi có tín hiệu đèn đỏ hoặc chuông tại đường giao nhau với đường sắt, phải dừng cách ray tối thiểu 5 mét.',
    category: 'situation',
    isImportant: true,
  },
  {
    id: 9,
    question: 'Khi điều khiển xe chạy trên đường biết báo hiệu bằng đèn hoặc biển báo hiệu thì người lái xe phải chấp hành theo?',
    options: [
      'Báo hiệu của biển báo hiệu',
      'Báo hiệu của đèn tín hiệu',
      'Báo hiệu của người điều khiển giao thông',
    ],
    correctAnswer: 2,
    explanation: 'Thứ tự ưu tiên: Hiệu lệnh người điều khiển > Đèn tín hiệu > Biển báo.',
    category: 'general',
  },
  {
    id: 10,
    question: 'Tại nơi đường giao nhau, khi đèn điều khiển giao thông có tín hiệu màu vàng, người điều khiển xe phải chấp hành như thế nào là đúng quy tắc giao thông?',
    options: [
      'Phải cho xe dừng lại trước vạch dừng, trường hợp đã đi quá vạch dừng hoặc đã quá gần vạch dừng nếu dừng lại thấy nguy hiểm thì được đi tiếp',
      'Trong trường hợp tín hiệu vàng nhấp nháy là được đi nhưng phải giảm tốc độ, chú ý quan sát nhường đường cho người đi bộ qua đường',
      'Nhanh chóng tăng tốc độ, vượt qua nút giao và chú ý đảm bảo an toàn',
      'Cả ý 1 và ý 2',
    ],
    correctAnswer: 3,
    explanation: 'Đèn vàng yêu cầu dừng lại, nhưng nếu đã quá gần vạch dừng thì được đi tiếp. Đèn vàng nhấp nháy được đi nhưng phải thận trọng.',
    category: 'signs',
  },
  {
    id: 11,
    question: 'Tác dụng của mũ bảo hiểm đối với người ngồi trên xe mô tô hai bánh trong trường hợp xảy ra tai nạn giao thông?',
    options: [
      'Để làm đẹp',
      'Để tránh mưa nắng',
      'Để giảm thiểu chấn thương vùng đầu',
      'Để các loại phương tiện khác dễ quan sát',
    ],
    correctAnswer: 2,
    explanation: 'Mũ bảo hiểm có tác dụng bảo vệ đầu, giảm chấn thương khi xảy ra tai nạn.',
    category: 'culture',
    isImportant: true,
  },
  {
    id: 12,
    question: 'Kỹ thuật cơ bản để giữ thăng bằng khi điều khiển xe mô tô đi trên đường gồ ghề như thế nào?',
    options: [
      'Đứng thẳng trên giá gác chân lái sau đó hơi gập đầu gối và khuỷu tay, đi chậm để không nẩy quá mạnh',
      'Ngồi lùi lại phía sau, tăng ga vượt nhanh qua đoạn đường xóc',
      'Ngồi lệch sang bên trái hoặc bên phải để lấy thăng bằng qua đoạn đường gồ ghề',
    ],
    correctAnswer: 0,
    explanation: 'Để giữ thăng bằng trên đường gồ ghề cần đứng thẳng, gập đầu gối và khuỷu tay, đi chậm.',
    category: 'structure',
  },
  {
    id: 13,
    question: 'Biển nào cấm người đi bộ?',
    options: [
      'Biển 1',
      'Biển 2',
      'Biển 3',
      'Biển 1 và 3',
    ],
    correctAnswer: 1,
    explanation: 'Biển cấm người đi bộ có hình người đi bộ trong vòng tròn đỏ gạch chéo.',
    category: 'signs',
  },
  {
    id: 14,
    question: 'Khi tránh nhau trên đường hẹp, người lái xe cần phải chú ý?',
    options: [
      'Xe đi ở phía sườn núi nên dừng lại trước và nhường đường cho xe đi ở phía vực sâu',
      'Xe xuống dốc nên dừng lại trước và nhường đường cho xe đang lên dốc',
      'Xe đi ở phía vực sâu nên dừng lại trước và nhường đường cho xe đi ở phía sườn núi',
      'Xe chạy với tốc độ lớn hơn phải nhường đường cho xe chạy với tốc độ thấp hơn',
    ],
    correctAnswer: 1,
    explanation: 'Xe xuống dốc có thể dừng dễ hơn nên phải nhường đường cho xe lên dốc.',
    category: 'situation',
  },
  {
    id: 15,
    question: 'Trong các trường hợp dưới đây, để đảm bảo an toàn, người lái xe mô tô cần thực hiện như thế nào?',
    options: [
      'Phải đội mũ bảo hiểm đạt chuẩn, có cài quai đúng quy cách',
      'Phải đội mũ bảo hiểm khi có tín hiệu cảnh báo của cơ quan quản lý giao thông',
      'Phải đội mũ bảo hiểm ở ngoài thành phố hoặc đi vào ban đêm',
    ],
    correctAnswer: 0,
    explanation: 'Người lái xe mô tô phải đội mũ bảo hiểm đạt chuẩn và cài quai đúng cách khi tham gia giao thông.',
    category: 'culture',
    isImportant: true,
  },
];

export const mockProgress = {
  totalQuestions: 600,
  completedQuestions: 234,
  correctAnswers: 198,
  practiceTime: 1250, // minutes
  lastStudied: '2026-02-23',
};

export const mockExams = [
  {
    id: 1,
    name: 'Đề thi số 1',
    totalQuestions: 25,
    timeLimit: 19, // minutes
    passScore: 21,
  },
  {
    id: 2,
    name: 'Đề thi số 2',
    totalQuestions: 25,
    timeLimit: 19,
    passScore: 21,
  },
  {
    id: 3,
    name: 'Đề thi số 3',
    totalQuestions: 25,
    timeLimit: 19,
    passScore: 21,
  },
];