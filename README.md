# Website Portfolio & CV Tương Tác 3D - Võ Minh Kiệt
> **Ngành:** Kỹ Thuật Cơ Điện Tử (Mechatronics Engineering) • Đại Học Lạc Hồng (LHU)  
> **Chuyên môn:** SolidWorks (Chứng chỉ CSWA), Hệ thống nhúng STM32, Quản lý sản xuất 3S-5S (Brother Sài Gòn).

---

## 🚀 Hướng Dẫn Public Website Lên GitHub (Miễn Phí 100%)

Dự án đã được cấu hình sẵn **`base: './'`**, thư viện **`gh-pages`** và hệ thống CI/CD tự động **GitHub Actions** (`.github/workflows/deploy.yml`). Website sẽ tự động chạy công khai trên GitHub Pages với tên miền dạng:  
`https://<ten-tai-khoan-github>.github.io/<ten-repository>/`

### Cách 1: Sử dụng file chạy tự động (Dễ nhất)
1. Truy cập [https://github.com/new](https://github.com/new) và tạo 1 repository mới (ví dụ đặt tên: `cv-vo-minh-kiet`, chọn chế độ **Public**, không cần tick chọn Add README).
2. Copy đường link repository vừa tạo (dạng: `https://github.com/username/cv-vo-minh-kiet.git`).
3. Nhấp đúp vào file: 👉 **`push_to_github.bat`**
4. Dán link repository vào cửa sổ và nhấn **Enter**.
5. Vào GitHub repository của bạn:
   - Nhấp vào **Settings** -> Mục **Pages** (ở menu bên trái).
   - Tại mục **Build and deployment** -> **Source**: Chọn **GitHub Actions**.
   - Chờ khoảng 1-2 phút, GitHub sẽ tự động build và xuất hiện link website công khai!

---

### Cách 2: Triển khai bằng dòng lệnh thủ công
```bash
# 1. Thêm link remote GitHub của bạn:
git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git

# 2. Đẩy code lên nhánh main:
git branch -M main
git push -u origin main
```
Sau đó vào **Settings** -> **Pages** trên GitHub -> chọn Source là **GitHub Actions**.

---

### Cách 3: Triển khai nhanh qua nhánh `gh-pages`
```bash
npm run deploy
```
Lệnh này sẽ tự động chạy `npm run build` và đẩy thẳng thư mục `dist` lên nhánh `gh-pages` của GitHub.

---

## 🌟 Tổng Quan Các Trang Của Website

### 1. Trang Chủ (Tổng Quan) - `#/home`
- **Hero Section Công Nghệ Cao**: Không gian 3D tương tác với các hạt điện tử (particle constellation) và khối wireframe cơ điện tử xoay theo chuột.
- **Hero Avatar & Nhận Diện Cá Nhân**: Tôn vinh chân dung Võ Minh Kiệt cùng phong cách thiết kế Cyber Mechatronics (sắc xanh Electric Cyan, Blue & Amber kim loại).
- **Mô Hình 3D Album Cuộn Ảnh (Three.js 3D Photo Scroll Showcase)**:
  - Tích hợp toàn bộ hình ảnh đời thường, bạn bè (chơi bida), chân dung đêm và ảnh hồ sơ vào một **vòng xoay không gian 3D (3D Cylindrical Carousel)** bằng Three.js.
  - Hỗ trợ cuộn chuột (scroll), kéo/thả chuột hoặc vuốt chạm để xoay mô hình 3D trong không gian thực.
  - Nhấp vào bất kỳ ảnh 3D nào để mở cửa sổ phóng to (Lightbox).

### 2. Quá Trình Học Tập & Phát Triển - `#/journey`
- **Lộ trình tương tác (Interactive Timeline Roadmap)**: Đại học Lạc Hồng (2023 - 2027), Dự án Khóa Cửa Thông Minh, Thực tập Brother Sài Gòn Amata.
- **Mô phỏng cơ cấu cơ khí 3D (ThreeGearSimulator)**: Bộ truyền bánh răng ăn khớp 3D tương tác trực tiếp bằng Three.js (xoay 360°, đổi tốc độ, bật/tắt khung dây CAD).
- **Phòng Trưng Bày Chứng Chỉ (Certificates Showroom)**: CSWA SolidWorks, Kỹ năng mềm 3S-5S, Tiếng Anh đầu ra, Tiếng Trung HK2.

### 3. Dự Án & Năng Lực Thực Chiến - `#/projects`
- **Dự Án Khóa Cửa Tự Động Thông Minh (STM32F103C8T6A)**: Vai trò Trưởng nhóm (Team Leader), mạch ARM Cortex-M3, thiết kế vỏ hộp cơ khí trên SolidWorks.
- **Kinh Nghiệm Dây Chuyền Máy May Công Nghiệp Brother**: Vận hành và kiểm soát chất lượng không NG, phân tích 5 bước 3S-5S Nhật Bản.

### 4. Trang Xem CV Thực Tế - `#/cv`
- **Bản Gốc PDF**: Nhúng trực tiếp file `CV_Võ Minh Kiệt.pdf` độ nét cao với zoom phóng to/thu nhỏ.
- **Bản Số Hóa Tương Tác**: Tái hiện nguyên mẫu CV gốc 2 cột (Trắng & Xanh đậm), hỗ trợ sao chép số điện thoại (`0389979163`) và email chỉ bằng 1 cú nhấp.
- **Nút Thao Tác Nhanh**: Tải file PDF gốc, In CV, Gọi điện, Gửi Email, Kết nối Zalo.

---

## 🎵 Hệ Thống Âm Thanh Nền Tự Động (Continuous Audio Player)

- Nhúng trực tiếp file âm thanh `SaveTik.io_7635721427689164062.mp3`.
- Tự động kích hoạt phát nhạc ngay khi vào trang hoặc khi có tương tác đầu tiên (chạm/cuộn/nhấp) theo chuẩn bảo mật của trình duyệt hiện đại.
- **Phát nhạc không bị gián đoạn** khi người dùng chuyển qua lại giữa các trang.
- Widget điều khiển nổi: Equalizer nhảy theo điệu nhạc, Play/Pause, Mute và chỉnh âm lượng.

---

## 💻 Chạy Thử Nghiệm Trên Máy Tính Local

- **Cách nhanh**: Nhấp đúp vào file **`chay_website.bat`** (Mở tại `http://localhost:5173/`).
- **Chạy bản Production Build tĩnh**: Nhấp đúp vào file **`chay_ban_build_dist.bat`** (Mở tại `http://localhost:8080/`).
