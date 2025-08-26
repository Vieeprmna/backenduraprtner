# BEUP-1 (Backend User & Partner Management)

Backend service untuk autentikasi, manajemen user, role, serta integrasi chatbot & Google Auth.

## 🚀 Tech Stack
- Node.js + Express
- PostgreSQL (dengan schema `core.users`)
- JWT (JSON Web Token)
- Bcrypt (hash password)
- Passport Google OAuth2
- Ngrok (tunnel untuk testing callback)

---

## 📂 Struktur Project

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


---

## ⚙️ Instalasi

1. Clone repo
   ```bash
   git clone <url-repo>
   cd beup-1

npm install

npm install googleapis

PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/namadb
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxx
GOOGLE_CALLBACK_URL=callback youuu

npm start


🔑 Endpoint Utama
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
