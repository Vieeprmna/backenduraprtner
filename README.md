# BEUP-1 (Backend User & Partner Management)

Backend service untuk autentikasi, manajemen user, role, serta integrasi chatbot & Google Auth.

---

## 🚀 Tech Stack
- Node.js + Express
- PostgreSQL (schema: `core.users`)
- JWT (JSON Web Token)
- Bcrypt (hash password)
- Passport Google OAuth2
- Ngrok (tunnel untuk testing callback)

---

## 📂 Struktur Project

```
src/
├── modules/
│ ├── chatbot/
│ │ ├── chatbot.routes.js
│ │ └── chatbot.service.js
│ ├── comment/
│ │ ├── comment.controller.js
│ │ ├── comment.model.js
│ │ └── comment.routes.js
│ ├── messages/
│ │ ├── messages.controller.js
│ │ ├── messages.model.js
│ │ └── messages.routes.js
│ ├── porto/
│ └── users/
│ ├── auth.google.js
│ ├── users.controller.js
│ ├── users.model.js
│ └── users.routes.js
├── utils/
├── app.js
├── server.js

```
---

## ⚙️ Instalasi

1. Clone repo  
   ```bash
   git clone <url-repo>
   cd beup-1

   Install dependencies

2. npm install


3. Install tambahan (jika error Google API)

4. npm install googleapis


5. Buat file .env
```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/namadb
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxx
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
```

6. Jalankan server

7. npm start

---

🔑 Endpoint Utama
```
🔹 Auth

POST /login → login user (username + password)

GET /auth/google → login via Google

GET /auth/google/callback → callback Google OAuth

🔹 Users

GET /users → ambil semua user

POST /users → buat user baru (register)

PUT /users/:id → update username/email/fullName

PUT /users/:id/password → ganti password (butuh oldPassword & newPassword)

PUT /users/:id/role → update role (khusus super_admin)

DELETE /users/:id → hapus user

🔹 Chatbot

POST /api/chat → kirim prompt ke chatbot
```

📌 Contoh Request
```
Register
POST /users
{
  "username": "vieeganteng",
  "password": "123456",
  "email": "viee@example.com",
  "fullName": "Viee Permana"
}

Login
POST /login
{
  "username": "vieeganteng",
  "password": "123456"
}

Update Password
PUT /users/7/password
{
  "oldPassword": "123456",
  "newPassword": "abcdef"
}
```
🔗 Testing dengan Ngrok

Untuk mencoba callback Google login:

ngrok http 5000


Gunakan URL dari Ngrok di .env bagian GOOGLE_CALLBACK_URL.


---

⚡ Nah, kalau ditaruh di GitHub/VSCode Markdown preview, ini bakal tampil **rapi** banget (indentasi nggak kacau, tiap section jelas).  

Mau gue tambahin juga **API Response Example (200 / 400 / 401)** biar developer lain langsung ngerti format balikan
