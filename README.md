# ✨ NovaChat — Your Intelligent AI Workspace

A modern, AI-powered chat application built to make conversations, coding assistance, and everyday problem-solving simpler. NovaChat combines a clean, responsive interface with AI-powered responses and conversation management.

<p align="center">
  <strong>Think. Create. Build with AI.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active%20Development-blue" alt="Project Status" />
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Build-Vite-646CFF" alt="Vite" />
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-8E75B2" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Auth-Supabase-3FCF8E" alt="Supabase" />
</p>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#️-tech-stack)
- [Architecture](#️-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running Locally](#-running-locally)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

NovaChat is an AI chat workspace designed with simplicity, usability, and extensibility in mind.

The project focuses on a distraction-free chat experience while building toward a broader AI workspace with authentication, persistent conversations, and additional AI capabilities.

### Why NovaChat?

- **Clean interface:** Minimal design that keeps conversations at the center.
- **Conversation management:** Create, switch between, and delete chats.
- **AI assistance:** Send messages to an AI model and display formatted responses.
- **Responsive experience:** Designed for both desktop and mobile screens.
- **Extensible architecture:** A separate frontend and backend make future features easier to integrate.

---

## 🚀 Features

### 💬 AI Conversations
- Send prompts and receive AI-generated responses.
- Render formatted AI output using Markdown.
- Support code blocks, lists, tables, and other common Markdown elements.

### 🗂️ Chat Management
- Create new conversations.
- Switch between existing conversations.
- Highlight the currently active conversation.
- Delete individual chats with confirmation.
- Delete all conversations with confirmation.
- Automatically save chat history in browser local storage.

### 🎨 User Experience
- Clean, minimal interface.
- Responsive sidebar behavior for mobile and desktop.
- Loading and error feedback during AI requests.
- Retry failed AI requests.

### 🔐 Authentication
- Supabase Auth integration.
- Google OAuth sign-in setup in progress.

> Authentication, session handling, and cloud-based chat storage should be considered complete only after their implementation and testing are finished.

---

## 📸 Screenshots

Screenshots will be added as the interface and authentication flow are finalized.

Recommended screenshots:
- Main chat workspace
- Sidebar and conversation management
- Mobile layout
- Google sign-in screen

---

## 🛠️ Tech Stack

### Frontend
- **React** — Component-based user interface.
- **Vite** — Development server and build tooling.
- **Tailwind CSS** — Utility-first styling.
- **Lucide React** — Interface icons.
- **React Markdown** — Markdown rendering.
- **remark-gfm** — GitHub Flavored Markdown support.

### Backend
- **Node.js** — JavaScript runtime.
- **Express** — HTTP server and API routes.
- **CORS** — Cross-origin request handling.
- **dotenv** — Environment variable configuration.
- **Google GenAI SDK** — Gemini API integration.

### Authentication
- **Supabase Auth** — Authentication and session management.
- **Google OAuth** — Google sign-in provider.

### Storage
- **Browser Local Storage** — Current local conversation persistence.
- **Supabase Database** — Planned for user-specific cloud conversation storage.

---

## 🏗️ Architecture

NovaChat uses a frontend-backend architecture.

```text
User
  |
  v
React Frontend (Vite)
  |
  | HTTP request
  v
Express Backend
  |
  | Google GenAI SDK
  v
Google Gemini API
  |
  v
AI Response
  |
  v
Chat Interface
```

Authentication flow:

```text
NovaChat
   |
   v
Supabase Auth
   |
   v
Google OAuth
   |
   v
Authenticated Session
   |
   v
NovaChat
```

The frontend communicates with the backend for AI requests. API credentials for the Gemini backend must remain on the server and must not be exposed in frontend code.

---

## 📦 Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) — A currently supported LTS version is recommended.
- npm — Included with Node.js.
- [Git](https://git-scm.com/)
- A Google Gemini API key.
- A Supabase project for authentication.

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd NovaChat
```

Replace `YOUR_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Install Dependencies

Open a terminal in each project directory and install its dependencies.

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd ../backend
npm install
```

> If your actual folder names use different capitalization or names, update these commands accordingly.

---

## 🔑 Environment Variables

Keep secrets in local `.env` files. Never commit real API keys, passwords, or OAuth client secrets to GitHub.

### Frontend Environment

Create a `.env` file in the frontend directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
```

Use the exact public key format provided by your Supabase project.

### Backend Environment

Create a `.env` file in the backend directory:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

Add other variables only if the backend actually requires them.

### Environment Setup Checklist

- Keep `.env` out of version control.
- Commit `.env.example` files containing placeholder values only.
- Never put the Gemini API key in frontend variables.
- Never expose the Supabase `service_role` key in browser code.
- Configure production environment variables separately when deploying.

---

## ▶️ Running Locally

Start the backend and frontend in separate terminals.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

Use the development command defined in the backend's `package.json`. If it does not have a `dev` script, use its configured start script.

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

The backend runs on the port configured in its environment, usually `5000`.

---

## 📁 Project Structure

The structure below is illustrative. Update it to match the actual repository before publishing.

```text
NovaChat/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   └── conversation/
│   │   ├── hooks/
│   │   ├── service/
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── .gitignore
├── backend/
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
└── README.md
```

---

## 🗺️ Roadmap

- [x] Core chat interface
- [x] Create and switch conversations
- [x] Delete individual and all conversations
- [x] Local conversation persistence
- [x] Markdown rendering for AI responses
- [x] Loading and error feedback
- [ ] Complete Google OAuth login and logout
- [ ] Restore authentication sessions reliably
- [ ] User-specific cloud chat history
- [ ] Stream AI responses
- [ ] File and PDF understanding
- [ ] Image understanding and generation
- [ ] Web search integration
- [ ] Support multiple AI models
- [ ] Production deployment and final testing

---

## 🔒 Security

NovaChat aims to follow these security practices:

- Store secrets in environment variables.
- Keep server-side AI credentials on the backend.
- Never commit real `.env` files.
- Use Supabase Auth for session management.
- Configure OAuth redirect URLs explicitly.
- Apply appropriate database access policies before storing user data in the cloud.

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes.

   ```bash
   git commit -m "feat: describe your change"
   ```

4. Push your branch.

   ```bash
   git push origin feature/your-feature
   ```

5. Open a Pull Request.

---

## 🐛 Bug Reports

When reporting a bug, include:
- A clear description of the issue.
- Steps to reproduce it.
- Expected and actual behavior.
- Relevant error messages or screenshots.

Do not include API keys, access tokens, or other secrets in issues.

---

## 📄 License

No license has been specified yet. Add a `LICENSE` file before claiming that NovaChat is released under a particular open-source license.

---

<p align="center">
  Built with ❤️ and curiosity.
  <br />
  <strong>NovaChat — Think. Create. Build with AI.</strong>
</p>
