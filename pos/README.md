# 👜 Sampha Ra (สัมภาระ) - POS & Boutique Storefront

ระบบ Point of Sale (POS) และเว็บหน้าร้านขายกระเป๋าแบบพรีเมียมหรูหราสำหรับแบรนด์ **"Sampha Ra (สัมภาระ)"** เชื่อมต่อฐานข้อมูล **Supabase** แบบเรียลไทม์ พร้อมระบบคิดเงิน ตะกร้าสินค้า PromptPay QR เงินสด เงินทอน ใบเสร็จรับเงิน และจัดการสต็อกสินค้า

---

## ✨ ฟีเจอร์หลัก (Key Features)

1. **โหมดแคชเชียร์หน้าร้าน (POS Mode)**:
   - สแกนบาร์โค้ด / ค้นหารหัสสินค้า SKU และชื่อกระเป๋า
   - ตะกร้าสินค้า เพิ่ม/ลด/ลบรายการ คิดภาษีมูลค่าเพิ่ม (VAT 7% รวมในยอด)
   - รองรับโค้ดส่วนลด (เช่น `SAMPHA10` ลด 10%, `VIP500` ลด ฿500, `BAG20` ลด 20%)
   - ระบบชำระเงินหลายช่องทาง:
     - **PromptPay QR Code**: สร้าง QR Code มาตรฐาน EMVCo ตามยอดเงินจริงอัตโนมัติ
     - **เงินสด (Cash)**: ปุ่มลัดธนบัตร คำนวณเงินทอนแบบ Real-time
     - **บัตรเครดิต (EDC)**
   - เสียงเอฟเฟกต์แคชเชียร์ Beep & Chime และพลุกระดาษ Confetti เมื่อชำระเงินสำเร็จ
   - พิมพ์ใบเสร็จรับเงิน Thermal Slip (80mm/58mm) และดูประวัติบิลย้อนหลัง

2. **โหมดเว็บหน้าร้านสำหรับลูกค้า (Storefront Catalog Mode)**:
   - Hero Banner สไตล์ Luxury Chic
   - กรองสินค้าตามหมวดหมู่ (Tote, Crossbody, Shoulder, Backpack, Travel, Mini)
   - เรียงลำดับราคา ต่ำ-สูง, สูง-ต่ำ, สินค้าแนะนำ
   - หน้ารายละเอียดสินค้า (Product Detail Modal) แสดงภาพ ขนาด วัสดุ สี และสต็อกคงเหลือ
   - ปุ่มสั่งซื้อดึงเข้าสู่ระบบตะกร้า POS ได้ทันที

3. **โหมดคลังสินค้าและสต็อก (Inventory Management)**:
   - เพิ่มกระเป๋าใหม่ พร้อมรูปภาพ ราคา ราคาทุน สต็อก วัสดุ ขนาด และป้าย Badge
   - แก้ไขข้อมูลสินค้า และปรับสต็อกแบบ Quick Update
   - ลบสินค้าที่ไม่ต้องการ

4. **รายงานยอดขาย (Sales Dashboard)**:
   - สรุปยอดขายประจำวัน จำนวนบิล ยอดเฉลี่ยต่อบิล
   - แยกยอดขายตามช่องทางชำระเงิน (PromptPay / Cash / Card)
   - ตารางประวัติรายการขายพร้อมปุ่มดูใบเสร็จย้อนหลัง

5. **เชื่อมต่อฐานข้อมูล Supabase**:
   - ตาราง `categories`, `products`, `orders`, `order_items`
   - ระบบ In-App Supabase Setting: กรอก Project URL และ Anon Key ได้จากหน้าเว็บ
   - ปุ่มคลิกเดียว **Seed Initial Products** นำเข้าข้อมูลกระเป๋าแฟชั่น 50 แบบเข้า Supabase ทันที
   - มีระบบ **Offline / LocalStorage Fallback** ใช้งานได้เต็มฟังก์ชัน 100% แม้ยังไม่ได้เชื่อมต่อ Supabase

---

## 🚀 วิธีเริ่มต้นใช้งาน (Quick Start)

### ขั้นตอนที่ 1: รัน Local Web Server
เปิด Terminal / Command Prompt ในโฟลเดอร์ `d:/pos` แล้วรันคำสั่ง:

```bash
python server.py
```
จากนั้นเปิดเว็บเบราว์เซอร์ไปที่: **[http://localhost:8080](http://localhost:8080)**

---

### ขั้นตอนที่ 2: ตั้งค่าเชื่อมต่อ Supabase Database

1. ไปที่ **[https://supabase.com](https://supabase.com)** และสร้างโปรเจกต์ใหม่
2. ไปที่เมนู **SQL Editor** ใน Supabase แล้วเปิดไฟล์ [`supabase_schema.sql`](./supabase_schema.sql) ในโฟลเดอร์นี้ คัดลอกโค้ดทั้งหมดไปวางแล้วกด **RUN**
3. ไปที่เมนู **Project Settings > API** ใน Supabase เพื่อคัดลอก:
   - **Project URL** (เช่น `https://xxxxxxxx.supabase.co`)
   - **Project API Keys (anon public)**
4. เปิดหน้าเว็บ **Sampha Ra** ที่มุมขวาบน กดปุ่ม **Database (รูปฐานข้อมูล)**
5. วาง URL และ Key แล้วกด **"บันทึกการตั้งค่า"**
6. กดปุ่ม **"นำเข้าสินค้า 50 รายการเข้า Supabase"** ข้อมูลกระเป๋าแฟชั่นทั้งหมด 50 แบบจะถูกซิงค์ขึ้น Supabase ทันที!

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
d:/pos/
├── index.html               # หน้าหลักของระบบ (POS + Storefront)
├── css/
│   ├── main.css             # สไตล์หลักและระบบธีมหรูหรา
│   ├── pos.css              # สไตล์ระบบแคชเชียร์ POS
│   ├── storefront.css       # สไตล์หน้าแคตตาล็อกหน้าร้าน
│   └── receipt.css          # สไตล์สำหรับการพิมพ์ใบเสร็จ (Thermal Slip)
├── js/
│   ├── app.js               # Main Controller ควบคุมทุกหน้า
│   ├── supabaseClient.js    # เชื่อมต่อ Supabase & Local Fallback
│   ├── pos.js               # ตรรกะคิดเงิน ตะกร้า ส่วนลด และการชำระเงิน
│   ├── products.js          # ข้อมูลสินค้ากระเป๋าเริ่มต้น (12 Collections)
│   ├── inventory.js         # จัดการสต็อกและสินค้า
│   ├── report.js            # รายงานยอดขายและประวัติบิล
│   └── utils.js             # ตัวช่วยฟอร์แมตเงิน สร้าง PromptPay QR เสียง และ Toast
├── supabase_schema.sql      # สคริปต์ SQL สร้างตารางใน Supabase
├── server.py                # Local Web Server (Python)
└── README.md                # เอกสารคู่มือการใช้งาน
```
