Tars Live Chat

A real-time chat application built with Next.js, Convex, and Clerk that enables instant messaging between users with a clean modern UI.

🔴 Live Demo: [https://tars-live-chat-rho.vercel.app/]
📦 Repository: [https://github.com/abhijeetgupta1132/tars-live-chat]

✨ Features

🔐 Authentication with Clerk

⚡ Real-time messaging using Convex

👥 User discovery sidebar

💬 One-to-one conversations

🟢 Live message updates (no refresh)

🕒 Message timestamps

🫧 Modern chat bubble UI

📭 Empty state handling

🚀 Production deployed on Vercel

🏗️ Tech Stack

Frontend

Next.js 16 (App Router)

React

TypeScript

Tailwind CSS

Backend

Convex (database + realtime)

Clerk (authentication)

Deployment

Vercel

🧠 Architecture Overview
Clerk Auth → UserSync → Convex DB
↓
UsersList → createOrGetConversation → ChatWindow
↓
Real-time messages
📂 Project Structure
app/
page.tsx

components/
UsersList.tsx
ChatWindow.tsx
UserSync.tsx

convex/
users.ts
messages.ts
conversations.ts
schema.ts
⚙️ Environment Variables

Create .env.local:

NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
🧪 Local Development

# install deps

npm install

# run convex

npx convex dev

# start app

npm run dev

App runs at:

http://localhost:3000
🚀 Deployment

This project is deployed on Vercel.

Steps

Push to GitHub

Import repo in Vercel

Add environment variables

Deploy

🔥 Real-Time Test (Important)

To verify realtime:

Open app in two browsers

Login with different users

Send message

✅ Messages appear instantly without refresh.

📌 Future Improvements

Group chat support

Online presence indicator

Message read receipts

File/image sharing

Typing indicators

👨‍💻 Author

Abhijeet Gupta

GitHub: https://github.com/abhijeetgupta1132

LinkedIn: https://www.linkedin.com/in/abhijeet-gupta-807876381/
