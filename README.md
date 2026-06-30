# 🥩 MEAT GUARD

**Smart Meat Freshness Detection System** — ระบบตรวจสอบความสดของเนื้อสัตว์ด้วยเซนเซอร์อัจฉริยะ

เว็บแอปพลิเคชันหน้าเว็บ (HTML / CSS / JavaScript) ที่แสดงผลการตรวจวัดความสดของเนื้อสัตว์
แบบเรียลไทม์ผ่าน Firebase Realtime Database พร้อมดีไซน์ที่ใช้งานได้ทั้งบนคอมพิวเตอร์และมือถือ

## ✨ ฟีเจอร์

- **เข้าสู่ระบบ / สมัครสมาชิก** ด้วยอีเมล หรือ Google
- **หน้าหมวดหมู่การใช้งาน** เลือกฟังก์ชันต่าง ๆ
- **มอนิเตอร์เรียลไทม์** — อุณหภูมิ, ความชื้น, NH₃, H₂S พร้อมกราฟแนวโน้ม (Firebase + Chart.js)
- **สรุปผลความสด** อัตโนมัติ: 🟢 FRESH / 🟡 WARNING / 🔴 SPOILED
- **คำแนะนำการบริโภค & การเก็บรักษา** ตามผลตรวจ
- ดีไซน์ Responsive รองรับมือถือแนวตั้ง + โหลดแบบ Skeleton

## 📄 หน้าหลัก

| ไฟล์ | คำอธิบาย |
|------|----------|
| `index.html` | หน้าเข้าสู่ระบบ (อีเมล / Google) |
| `register-email.html`, `register-google.html` | สมัครสมาชิก |
| `category.html` | หมวดหมู่การใช้งาน |
| `result.html` | มอนิเตอร์ความสดเรียลไทม์ |
| `recommend.html` | คำแนะนำการบริโภค |
| `storage.html`, `innovation.html`, `foodsafety.html`, `didyouknow.html` | หน้าให้ความรู้ |

## 🚀 การใช้งาน

เปิด `index.html` ผ่านเว็บเบราว์เซอร์ได้โดยตรง หรือรันเซิร์ฟเวอร์แบบ static เช่น:

```bash
python -m http.server 5500
```

แล้วเปิด <http://localhost:5500>

---

© 2026 Meat Guard · Smart Meat Freshness Detection System
