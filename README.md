# 📚 LendLens — SUT Library Management System (ระบบยืม-คืนอุปกรณ์)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.0.0-success.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=nodedotjs&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-010101?logo=socketdotio&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white)

ระบบสารสนเทศเพื่อการจัดการยืม-คืนอุปกรณ์และครุภัณฑ์ภายในองค์กร/สถานศึกษา พัฒนาขึ้นเพื่อเพิ่มประสิทธิภาพในการให้บริการอุปกรณ์ ลดขั้นตอนการทำงานที่ซับซ้อน และเพิ่มความโปร่งใสในการจัดการทรัพยากร ด้วยระบบที่ครอบคลุมทั้งฝั่งผู้ใช้งาน (นักศึกษา) และผู้ดูแลระบบ (Admin) พร้อมการอัปเดตข้อมูลแบบ **Real-Time** ⚡

---

## ✨ ฟีเจอร์หลัก (Key Features)

### 👨‍🎓 ฝั่งผู้ใช้งาน (User Web)
- **Real-time Inventory:** ดูรายการอุปกรณ์ จำนวนคงเหลือ และสถานะการยืมแบบ Real-time (ทันทีที่มีคนยืม ของจะลดลงในระบบของทุกคนโดยอัตโนมัติ)
- **Smart Cart & Checkout:** ระบบตะกร้ายืมอุปกรณ์ พร้อมตรวจสอบสิทธิ์และข้อจำกัดอัตโนมัติ (เช่น จองล่วงหน้า ยืมได้สูงสุด 5 ชิ้น/วัน ฯลฯ)
- **Status Tracking:** ติดตามสถานะคำขอยืม (รออนุมัติ, กำลังยืม, คืนแล้ว, เลยกำหนด) และประวัติการทำรายการย้อนหลัง
- **QR Code Identity:** ระบบสร้าง QR Code ประจำตัวเพื่อยืนยันตัวตนตอนรับของ
- **Notifications:** รับอีเมลแจ้งเตือนเมื่อคำขอถูกอนุมัติ/ปฏิเสธ หรือเมื่ออุปกรณ์ใกล้ถึงกำหนดคืน

### 👨‍💻 ฝั่งผู้ดูแลระบบ (Admin Dashboard)
- **Real-time Dashboard:** แดชบอร์ดสรุปสถิติ (ยอดการยืม, ของที่กำลังถูกยืม, ยอดที่เลยกำหนดคืน, ค่าปรับสะสม) พร้อมกราฟสถิติด้วย **Recharts** ซึ่งจะอัปเดตตัวเลขแบบ Real-time
- **Request Management:** หน้าต่างจัดการคำขอ (อนุมัติ, ปฏิเสธ, หรือรับคืนอุปกรณ์) พร้อมคำนวณค่าปรับกรณีส่งล่าช้า หรือสูญหาย
- **Equipment Inventory:** จัดการข้อมูลครุภัณฑ์ เพิ่ม/ลบ/แก้ไขข้อมูล พร้อมอัปโหลดรูปภาพ (มีระบบ Smart Image Fallback ดึงรูปสำรองอัจฉริยะ)
- **QR Code Scanner:** สแกน QR Code นักศึกษาเพื่อยืนยันตัวตนตอนรับอุปกรณ์ ผ่านกล้องเว็บแคม (ใช้ jsQR)
- **PDF & Excel Export:** ออกรายงานสรุปผลเป็นไฟล์ PDF (jsPDF) และ Excel (xlsx)
- **Automated Cron Jobs:** ระบบตรวจสอบอัตโนมัติทำงานเบื้องหลัง:
  - ยกเลิกคำขอที่เลยเวลารับของ (30 นาที) อัตโนมัติ พร้อมคืนจำนวนสต็อก
  - ตรวจสอบรายการที่ค้างส่ง (Overdue) แบบอัตโนมัติทุกวัน และอัปเดตสถานะในระบบ
  - ส่งอีเมลแจ้งเตือนผู้ใช้งานที่ใกล้ถึงกำหนดคืน และแจ้งเตือนด่วนสำหรับของที่ต้องคืนในวันนี้

### 📸 เครื่องสแกน QR (Scanner Web App)
- **QR Code Scanner:** แอปสแกน QR Code แบบ standalone สำหรับเจ้าหน้าที่ ใช้กล้องสแกน QR Code ของนักศึกษาเพื่อยืนยันตัวตน
- **Responsive:** ใช้งานได้ทั้งบนคอมพิวเตอร์และมือถือ รองรับ HTTPS (SSL) สำหรับการเข้าถึงกล้อง

---

## 🔐 ระบบยืนยันตัวตน (Authentication)

- **JWT (JSON Web Token):** ใช้ JWT สำหรับการยืนยันตัวตนทั้ง Admin และ User โดย Token มีอายุ 8 ชม.
- **Zod Validation:** ตรวจสอบข้อมูล Input ทั้งหมดด้วย Zod Schema ก่อนประมวลผล เพื่อป้องกัน Invalid Data
- **Admin Login:** เข้าสู่ระบบด้วยรหัส Admin (6 หลัก) + เลขบัตรประชาชน (13 หลัก)
- **Student Login:** เข้าสู่ระบบด้วยรหัสนักศึกษา (B + 7 หลัก) + เลขบัตรประชาชน (13 หลัก)

---

## 🗂 โครงสร้างโปรเจกต์ (Project Architecture)

โปรเจกต์นี้ถูกออกแบบเป็น **Micro-frontend & Monorepo** สไตล์ โดยแบ่งออกเป็น 5 ส่วนหลัก:

| โฟลเดอร์ | รายละเอียด | เทคโนโลยี |
| --- | --- | --- |
| 📁 `my-library-user-web` | เว็บแอปพลิเคชันสำหรับผู้ใช้ทั่วไป (ค้นหา/จอง/ยืม/เช็คสถานะ) | React 19 (Vite 8) + Tailwind CSS 4 |
| 📁 `my-library-admin-web` | เว็บไซต์ระบบหลังบ้านสำหรับเจ้าหน้าที่ (Dashboard/จัดการคำขอ/ออกรายงาน) | React 19 (Vite 8) + Tailwind CSS 4 + Recharts + jsPDF + xlsx |
| 📁 `my-library-api-node` | API Server หลักที่ประมวลผลการทำงานทั้งหมด | Node.js (Express 5) + MySQL + Socket.IO + JWT + Zod |
| 📁 `my-library-scanner` | แอปสแกน QR Code สำหรับเจ้าหน้าที่ | React 19 (Vite 6) + html5-qrcode + Tailwind CSS 4 |
| 📄 `project_report.html` | รายงานสรุปโปรเจกต์แบบ Interactive | HTML + CSS |

---

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)

### Frontend
| เทคโนโลยี | การใช้งาน |
| --- | --- |
| React 19 | UI Framework หลัก |
| Vite 6 / 8 | Build tool & Dev server |
| Tailwind CSS 4 | Styling framework |
| React Router v7 | Client-side routing (Admin & User Web) |
| Socket.IO-Client | Real-time data updates |
| Recharts | กราฟสถิติใน Admin Dashboard |
| Lucide React | Icon library |
| SweetAlert2 | Beautiful alert dialogs |
| jsPDF + jspdf-autotable | PDF report generation |
| xlsx (SheetJS) | Excel report export |
| jsQR / html5-qrcode | QR Code scanning |
| react-qr-code | QR Code generation |

### Backend
| เทคโนโลยี | การใช้งาน |
| --- | --- |
| Node.js & Express 5 | API Server |
| MySQL2 | Database driver |
| Socket.IO | WebSocket real-time broadcasting |
| JSON Web Token (JWT) | Authentication & authorization |
| Zod | Input validation & schema |
| Node-Cron | Automated scheduled tasks |
| Nodemailer | Email notifications (SMTP) |
| Multer & Jimp | Image upload & compression |

### Development Tools
| เครื่องมือ | การใช้งาน |
| --- | --- |
| Antigravity IDE | AI-powered IDE |
| Git & GitHub | Version control |
| OxLint | Code linting (Admin Web) |

---

## 🚀 วิธีการติดตั้งและใช้งาน (Getting Started)

### ⚙️ สิ่งที่ต้องเตรียม (Prerequisites)
- [Node.js](https://nodejs.org/) (เวอร์ชัน 18 ขึ้นไป)
- MySQL Server (เช่น [XAMPP](https://www.apachefriends.org/) หรือ [Laragon](https://laragon.org/))

### 1. Clone โปรเจกต์
```bash
git clone https://github.com/Lunox983/lendlens-proj..git
cd lendlens-proj.
```

### 2. การตั้งค่าฐานข้อมูล (Database Setup)
1. เปิดการทำงานของ MySQL Server ผ่าน XAMPP / Laragon
2. สร้าง Database (เช่นชื่อ `my_library`) และนำเข้าไฟล์ฐานข้อมูล `database.sql` ของคุณ (ถ้ามี)
3. ในโฟลเดอร์ `my-library-api-node` ให้คัดลอกไฟล์ `.env.example` มาเป็นชื่อ `.env` และตั้งค่าต่างๆ:
   - การเชื่อมต่อฐานข้อมูล (DB Host, User, Password)
   - ข้อมูล SMTP (Email / App Password)
   - JWT Secret Key
   - กำหนดพอร์ตของระบบ

### 3. รัน API Server (Backend)
```bash
cd my-library-api-node
npm install
node server.js
```
> เซิร์ฟเวอร์จะรันอยู่ที่ `http://localhost:5000`

### 4. รันเว็บ Admin
```bash
cd my-library-admin-web
npm install
npm run dev
```
> เข้าใช้งานระบบ Admin ผ่านเบราว์เซอร์ที่ `http://localhost:5173`

### 5. รันเว็บ User (ผู้ยืม)
```bash
cd my-library-user-web
npm install
npm run dev
```
> เข้าใช้งานระบบนักศึกษา ผ่านเบราว์เซอร์ที่ `http://localhost:5174`

### 6. รัน QR Scanner (ถ้าต้องการ)
```bash
cd my-library-scanner
npm install
npm run dev
```
> เข้าใช้งานเครื่องสแกน QR ผ่านเบราว์เซอร์ (ต้องใช้ HTTPS เพื่อเข้าถึงกล้อง)

---

## 📁 API Endpoints (สรุป)

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/admin-login` | Admin เข้าสู่ระบบ |
| `POST` | `/api/auth/user-login` | นักศึกษาเข้าสู่ระบบ |
| `GET` | `/api/admin/...` | API สำหรับจัดการข้อมูลฝั่ง Admin |
| `GET` | `/api/mobile/...` | API สำหรับ User Web & Mobile |

> ดูรายละเอียด Endpoints ทั้งหมดได้ในไฟล์ `endpoints.txt`

---

## 🔮 แผนการพัฒนาในอนาคต (Roadmap)
- [x] ~~ระบบสแกน QR Code ผ่านกล้อง~~  ✅ เสร็จแล้ว
- [x] ~~ระบบออกรายงาน PDF / Excel~~  ✅ เสร็จแล้ว
- [x] ~~ระบบ Authentication ด้วย JWT~~  ✅ เสร็จแล้ว
- [x] ~~Input Validation ด้วย Zod~~  ✅ เสร็จแล้ว
- [ ] เชื่อมต่อระบบ Single Sign-On (SSO) ขององค์กร
- [ ] พัฒนา Mobile App ด้วย React Native (Expo)

---

## 👥 Contributors

- **Lunox983** — Full-stack Developer

---

*Developed with ❤️ for better educational support systems.*
