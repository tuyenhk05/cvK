export const PERSONAL_INFO = {
  name: "VÕ MINH KIỆT",
  title: "Kỹ Sư Cơ Điện Tử (Mechatronics Engineer)",
  subtitle: "Đại học Lạc Hồng • Khóa 2023 - 2027",
  status: "Sinh viên năm 4 (Dự kiến tốt nghiệp T5/2027)",
  bio: "Sinh viên năm 4 ngành Kỹ thuật Cơ điện tử trường Đại học Lạc Hồng, sở hữu nền tảng vững chắc về mô hình hóa & thiết kế máy trên SolidWorks (Chứng chỉ Quốc Tế CSWA), lập trình nhúng vi điều khiển ARM STM32, cùng trải nghiệm thực tế về vận hành máy may công nghiệp và kiểm soát chất lượng chuẩn 3S-5S tại tập đoàn Brother Sài Gòn.",
  phone: "0389979163",
  email: "minhkietvo047@gmail.com",
  address: "Hẻm 475 Huỳnh Văn Nghệ, Phường Trấn Biên (Bửu Long), Tỉnh Đồng Nai",
  university: "Trường Đại học Lạc Hồng (LHU)",
  major: "Kỹ Thuật Cơ Điện Tử (Mechatronics Engineering)",
  gpaStatus: "Dự kiến tốt nghiệp Tháng 5/2027",
  avatar: "./images/avatar_night.jpg",
  officialAvatar: "./images/kiet_official.png",
  cvPdfPath: "./cv/CV_Vo_Minh_Kiet.pdf",
  cvImagePath: "./cv/cv_page_1.png",
  socials: {
    phone: "tel:0389979163",
    email: "mailto:minhkietvo047@gmail.com",
    zalo: "https://zalo.me/0389979163"
  }
};

export const CORE_STATS = [
  { label: "Năm đào tạo", value: "Năm 4", desc: "ĐH Lạc Hồng Cơ Điện Tử", icon: "GraduationCap" },
  { label: "Chứng chỉ SolidWorks", value: "CSWA", desc: "Dassault Systèmes Quốc tế", icon: "Award" },
  { label: "Kinh nghiệm thực tập", value: "Brother", desc: "Tập đoàn Brother Sài Gòn", icon: "Briefcase" },
  { label: "Tiêu chuẩn sản xuất", value: "3S-5S", desc: "Kiểm soát Zero NG (Chất lượng)", icon: "ShieldCheck" },
];

export const GALLERY_PHOTOS = [
  {
    id: "avatar-night",
    src: "./images/avatar_night.jpg",
    title: "Chân dung Võ Minh Kiệt",
    tag: "Profile • Hero Portrait",
    desc: "Hình ảnh chân dung đêm bên sông và ánh đèn đô thị hiện đại — Thể hiện phong thái tự tin, điềm đạm và đam mê sáng tạo công nghệ.",
    aspect: "portrait"
  },
  {
    id: "billiards-friends",
    src: "./images/kiet_billiards.png",
    title: "Giao lưu Thể thao & Tinh thần Đồng đội",
    tag: "Life & Teamwork",
    desc: "Khoảnh khắc thư giãn cùng bạn bè trên bàn bida sau những giờ học đồ án cơ khí và nghiên cứu vi điều khiển. Kiệt luôn đề cao tinh thần đồng đội và sự kết nối.",
    aspect: "landscape"
  },
  {
    id: "kiet-chill",
    src: "./images/kiet_chill.jpg",
    title: "Khoảnh khắc Suy tư & Định hướng",
    tag: "Life Moments",
    desc: "Góc nhìn giản dị, tập trung và luôn suy nghĩ về những giải pháp kỹ thuật tối ưu cũng như hướng phát triển sự nghiệp trong ngành cơ điện tử.",
    aspect: "portrait"
  },
  {
    id: "kiet-doraemon",
    src: "./images/kiet_doraemon.jpg",
    title: "Năng động & Trẻ trung",
    tag: "Youthful & Creative",
    desc: "Nét tính cách vui vẻ, hòa đồng và gần gũi với bạn bè đồng trang lứa. Một kỹ sư tương lai không chỉ giỏi kỹ thuật mà còn tích cực, lạc quan.",
    aspect: "portrait"
  },
  {
    id: "kiet-official",
    src: "./images/kiet_official.png",
    title: "Ảnh Hồ Sơ Sinh Viên LHU",
    tag: "Official Student",
    desc: "Hình ảnh sinh viên chính thức trong màu áo Đại học Lạc Hồng, đại diện cho tinh thần học hỏi không ngừng và kỷ luật trong công việc.",
    aspect: "portrait"
  }
];

export const CERTIFICATES = [
  {
    id: "cswa",
    name: "CHỨNG CHỈ SOLIDWORKS CSWA",
    issuer: "Dassault Systèmes SolidWorks Corp.",
    type: "Quốc tế (Certified SolidWorks Associate)",
    highlight: "Chứng chỉ quốc tế khẳng định năng lực mô hình hóa 3D CAD, lắp ráp cơ cấu và tạo bản vẽ kỹ thuật chuyên nghiệp.",
    level: "95%",
    color: "from-blue-500 to-cyan-400",
    icon: "Boxes"
  },
  {
    id: "3s5s",
    name: "CHỨNG CHỈ KỸ NĂNG MỀM & TIÊU CHUẨN 3S-5S",
    issuer: "Trung tâm Đào tạo Kỹ năng & Doanh nghiệp",
    type: "Quản lý sản xuất chuẩn Nhật Bản",
    highlight: "Am hiểu và thực hành sâu tiêu chuẩn Seiri (Sàng lọc), Seiton (Sắp xếp), Seiso (Sạch sẽ), Seiketsu (Săn sóc), Shitsuke (Sẵn sàng).",
    level: "90%",
    color: "from-emerald-500 to-teal-400",
    icon: "ShieldCheck"
  },
  {
    id: "english",
    name: "CHỨNG CHỈ TIẾNG ANH ĐẦU RA CỦA TRƯỜNG",
    issuer: "Trường Đại Học Lạc Hồng",
    type: "Ngoại ngữ chuyên ngành & giao tiếp",
    highlight: "Đạt chuẩn ngoại ngữ đầu ra, tự tin đọc hiểu tài liệu datasheet vi điều khiển, phần mềm kỹ thuật và trao đổi công việc kỹ thuật.",
    level: "85%",
    color: "from-purple-500 to-indigo-400",
    icon: "Globe"
  },
  {
    id: "chinese",
    name: "NGÔN NGỮ TRUNG HK2",
    issuer: "Khoa Ngoại Ngữ - ĐH Lạc Hồng",
    type: "Ngoại ngữ bổ trợ",
    highlight: "Hoàn thành chương trình tiếng Trung học kỳ 2, mở rộng cơ hội làm việc với các doanh nghiệp sản xuất và chế tạo máy FDI.",
    level: "80%",
    color: "from-amber-500 to-orange-400",
    icon: "Languages"
  }
];

export const SKILL_CATEGORIES = [
  {
    category: "Thiết Kế Cơ Khí & CAD/CAM",
    icon: "Cpu",
    skills: [
      { name: "SolidWorks (3D Modeling & Part)", level: 92, note: "Đạt chứng chỉ quốc tế CSWA" },
      { name: "SolidWorks Assembly (Lắp ráp cơ cấu)", level: 88, note: "Kiểm tra xung đột, mô phỏng chuyển động" },
      { name: "Xuất Bản Vẽ Kỹ Thuật 2D (Drafting)", level: 90, note: "Quy chuẩn dung sai, kích thước gia công" },
      { name: "Phân tích lực & tối ưu kết cấu cơ khí", level: 82, note: "Ứng dụng trong đồ án khóa cửa & máy may" }
    ]
  },
  {
    category: "Hệ Thống Nhúng & Cơ Điện Tử",
    icon: "Zap",
    skills: [
      { name: "Lập trình STM32 (ARM Cortex-M3)", level: 85, note: "STM32F103C8T6A, Keil C / STM32CubeIDE" },
      { name: "Giao tiếp cảm biến & Thiết bị ngoại vi", level: 88, note: "RFID, Vân tay, Keypad, Relay, I2C/SPI" },
      { name: "Cơ cấu chấp hành (Actuators)", level: 86, note: "Động cơ bước, Servo MG996R, Khóa điện từ Solenoid" },
      { name: "Thiết kế mạch điện tử & Test phần cứng", level: 84, note: "Mạch nguồn hạ áp, chống nhiễu, layout PCB" }
    ]
  },
  {
    category: "Quản Lý Sản Xuất & Kỹ Năng Doanh Nghiệp",
    icon: "Factory",
    skills: [
      { name: "Tiêu chuẩn 3S-5S Nhật Bản", level: 92, note: "Thực hành thực tế tại Brother Sài Gòn" },
      { name: "Kiểm soát Zero Defect (Chống hàng NG)", level: 90, note: "Phát hiện lỗi, loại trừ nguy cơ rủi ro sản phẩm" },
      { name: "Vận hành gia công máy may công nghiệp", level: 88, note: "Kinh nghiệm thực tiễn dây chuyền nhà máy" },
      { name: "Làm việc nhóm & Quản lý dự án", level: 89, note: "Đảm nhiệm vai trò Trưởng nhóm dự án" },
      { name: "Tin học văn phòng kỹ thuật", level: 88, note: "Báo cáo Word, tính toán Excel, slide PowerPoint" }
    ]
  }
];

export const TIMELINE_JOURNEY = [
  {
    year: "2023 - 2027",
    period: "Tháng 09/2023 - Dự kiến Tháng 05/2027",
    title: "Theo học Kỹ Thuật Cơ Điện Tử",
    organization: "Trường Đại học Lạc Hồng (LHU)",
    role: "Sinh viên Đại học khóa 2023",
    status: "Sinh viên năm 4",
    highlights: [
      "Tiếp cận chương trình đào tạo chuẩn quốc tế ABET và CDIO ngành Kỹ thuật Cơ điện tử.",
      "Thực hành thiết kế máy, cơ học lý thuyết, đồ họa kỹ thuật trên SolidWorks.",
      "Học tập chuyên sâu về vi điều khiển, cảm biến, PLC và tự động hóa dây chuyền.",
      "Hoàn thành các học phần ngoại ngữ: Tiếng Anh chuẩn đầu ra và Ngôn ngữ Trung HK2."
    ],
    badge: "Học Vấn Trọng Tâm",
    color: "blue"
  },
  {
    year: "Giai đoạn Dự Án",
    period: "Đồ Án Cơ Điện Tử Đại Học",
    title: "Trưởng Nhóm Dự Án: Bộ Khóa Cửa Tự Động Thông Minh",
    organization: "Đại học Lạc Hồng - Khoa Cơ Điện Tử",
    role: "Trưởng nhóm (Team Leader) & Kỹ sư Lập trình Nhúng",
    status: "Hoàn thành xuất sắc",
    highlights: [
      "Đảm nhận vai trò Trưởng nhóm: Phân công nhiệm vụ, lên kế hoạch tiến độ và tổng hợp báo cáo kỹ thuật.",
      "Trực tiếp lắp đặt phần cứng vi điều khiển ARM Cortex-M3 (STM32F103C8T6A).",
      "Lập trình firmware điều khiển khóa chốt tự động kết hợp xác thực bảo mật và hiển thị thông tin.",
      "Ứng dụng SolidWorks thiết kế toàn bộ vỏ hộp cơ khí bảo vệ và gá lắp chốt điện an toàn."
    ],
    badge: "Dự Án Nổi Bật",
    color: "cyan"
  },
  {
    year: "Thực Tập Doanh Nghiệp",
    period: "Thực tập chuyên môn công nghiệp",
    title: "Thực Tập Sinh Vận Hành & QC Sản Xuất",
    organization: "Công Ty TNHH Brother Sài Gòn",
    location: "Đường số 7 AMATA, KCN Long Bình, Đồng Nai, Việt Nam",
    role: "Kỹ sư thực tập vận hành gia công & đảm bảo chất lượng",
    status: "Đánh giá cao từ ban quản trị",
    highlights: [
      "Trực tiếp vận hành và gia công các dòng máy may công nghiệp tiêu chuẩn cao của tập đoàn Brother.",
      "Kiểm tra chất lượng hàng hóa nghiêm ngặt, tuân thủ nguyên tắc không tạo ra sản phẩm NG (Not Good).",
      "Triệt để thực thi nội quy quản lý sản xuất 3S-5S trên sàn máy, đảm bảo an toàn tuyệt đối và năng suất.",
      "Rèn luyện tác phong kỷ luật, tư duy Kaizen cải tiến liên tục từ văn hóa công nghiệp Nhật Bản."
    ],
    badge: "Thực Chiến Công Nghiệp",
    color: "amber"
  },
  {
    year: "Hiện Tại & Tương Lai",
    period: "Năm 2026 - 2027",
    title: "Hoàn Thiện Tốt Nghiệp & Sẵn Sàng Gia Nhập Doanh Nghiệp",
    organization: "Ngành Cơ Điện Tử / Tự Động Hóa / Thiết Kế Máy",
    role: "Kỹ sư Cơ Điện Tử Mới Tốt Nghiệp",
    status: "Sẵn sàng đón nhận cơ hội việc làm",
    highlights: [
      "Dự kiến hoàn thành khóa luận và nhận bằng kỹ sư vào Tháng 05/2027.",
      "Sở hữu chứng chỉ quốc tế SolidWorks CSWA, sẵn sàng bắt tay vào thiết kế chi tiết máy và cụm lắp ráp.",
      "Định hướng làm việc trong các vị trí: Kỹ sư Thiết kế CAD/CAM, Kỹ sư R&D Cơ Điện Tử, Kỹ sư Vận hành & QC/QA tại các nhà máy chế tạo."
    ],
    badge: "Sẵn Sàng Cống Hiến",
    color: "emerald"
  }
];

export const FEATURED_PROJECTS = [
  {
    id: "smart-door-lock",
    name: "THIẾT KẾ THI CÔNG BỘ KHÓA CỬA TỰ ĐỘNG",
    category: "Hệ Thống Cơ Điện Tử Thông Minh",
    role: "Trưởng nhóm (Team Leader) | Lắp đặt phần cứng & Lập trình STM32",
    badge: "Trọng Tâm CV",
    mcu: "STM32F103C8T6A (ARM Cortex-M3)",
    description: "Hệ thống khóa cửa tự động kết hợp cơ điện tử toàn diện: Thiết kế vỏ cơ khí trên SolidWorks, tích hợp vi điều khiển STM32 32-bit xử lý nhanh, bảo mật cao, điều khiển chốt khóa điện tử chính xác và an toàn.",
    keyFeatures: [
      "Vi điều khiển chính STM32F103C8T6A tốc độ 72MHz với bộ nhớ flash an toàn",
      "Thiết kế cơ khí toàn bộ khung vỏ, gá lắp chốt bằng phần mềm 3D SolidWorks",
      "Cơ cấu chấp hành Solenoid Lock / Động cơ Servo điều khiển then cài chịu lực",
      "Tích hợp module xác thực vân tay / bàn phím mật mã chống dò mã",
      "Mạch hạ áp nguồn ổn định tích hợp bảo vệ quá dòng và chống nhiễu công nghiệp"
    ],
    specs: [
      { label: "Vi điều khiển", value: "STM32F103C8T6A ARM 32-bit" },
      { label: "Phần mềm CAD", value: "SolidWorks 3D Modeling" },
      { label: "Môi trường lập trình", value: "Keil C / STM32CubeIDE" },
      { label: "Cơ cấu khóa", value: "Solenoid 12V / Servo Chống Kẹt" },
      { label: "Điện áp hoạt động", value: "12V DC chuyển đổi 5V / 3.3V" }
    ]
  },
  {
    id: "brother-industrial",
    name: "QUY TRÌNH GIA CÔNG MÁY MAY & TIÊU CHUẨN 3S-5S BROTHER",
    category: "Thực Tập Sản Xuất Công Nghiệp",
    role: "Thực tập sinh Vận hành & Đảm bảo Chất lượng Zero-Defect",
    badge: "Brother Sài Gòn - KCN Amata",
    mcu: "Hệ Thống Dây Chuyền Máy May Công Nghiệp",
    description: "Trực tiếp tham gia vận hành máy móc gia công linh kiện máy may công nghiệp tại Công ty Brother Sài Gòn (KCN Amata, Đồng Nai). Phối hợp nhóm tạo ra thành phẩm không NG (Not Good), kiểm tra độ chính xác dung sai cơ khí.",
    keyFeatures: [
      "Vận hành và làm chủ quy trình gia công cơ khí các chi tiết máy may Brother",
      "Thực hiện kiểm tra QC, loại bỏ lỗi sản phẩm ngay từ công đoạn (Poka-yoke)",
      "Triển khai 3S (Sàng lọc - Sắp xếp - Sạch sẽ) và duy trì 5S trên toàn bộ vị trí làm việc",
      "Phối hợp nhịp nhàng với đội nhóm ca sản xuất đạt 100% mục tiêu an toàn lao động"
    ],
    specs: [
      { label: "Địa điểm", value: "Đường số 7 Amata, KCN Long Bình, Đồng Nai" },
      { label: "Doanh nghiệp", value: "Tập Đoàn Brother Sài Gòn" },
      { label: "Tiêu chuẩn áp dụng", value: "3S-5S & Zero NG Quality Policy" },
      { label: "Nhiệm vụ chính", value: "Vận hành máy may, kiểm tra chi tiết, báo cáo kỹ thuật" }
    ]
  },
  {
    id: "solidworks-cswa-portfolio",
    name: "BỘ THIẾT KẾ CƠ KHÍ & BẢN VẼ CHUẨN CSWA SOLIDWORKS",
    category: "Thiết Kế Máy & Mô Phỏng Cơ Khí",
    role: "Kỹ sư Thiết kế CAD 3D",
    badge: "Chứng Chỉ CSWA Quốc Tế",
    mcu: "SolidWorks CAD Suite",
    description: "Bộ sưu tập các chi tiết máy, cơ cấu truyền động bánh răng, cụm gá lắp và bản vẽ kỹ thuật 2D tiêu chuẩn được dựng hình chính xác theo chứng chỉ CSWA của Dassault Systèmes.",
    keyFeatures: [
      "Dựng hình khối 3D chi tiết phức tạp với đầy đủ quan hệ hình học và ràng buộc kích thước",
      "Lắp ghép cụm Assembly kiểm tra va chạm động và phân tích khe hở kỹ thuật",
      "Xuất bản vẽ 2D Drawing thể hiện hình chiếu trục đo, mặt cắt trích và bảng kê BOM",
      "Gán vật liệu, tính toán khối lượng, trọng tâm và mô men quán tính"
    ],
    specs: [
      { label: "Chứng chỉ", value: "SolidWorks CSWA Quốc Tế" },
      { label: "Kỹ năng chính", value: "Part, Assembly, Drawing 2D/3D" },
      { label: "Tiêu chuẩn bản vẽ", value: "ISO / JIS Technical Drawing" },
      { label: "Độ chuẩn xác", value: "Chuẩn xác dung sai gia công cơ khí" }
    ]
  }
];
