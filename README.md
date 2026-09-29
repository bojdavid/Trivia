# Trivia Quiz App

A modern, interactive, and fully responsive Trivia Quiz Application built with **Svelte 5** and **SvelteKit**. This application provides an engaging user experience with dynamic animations, custom themes, and robust quiz-taking mechanics.

🚀 **Live Demo:** [https://trivia-navy-nine.vercel.app/](https://trivia-navy-nine.vercel.app/)

## ✨ Features

- **Interactive Quiz Gameplay:** Seamlessly navigate through questions with slide animations.
- **Timer Modes:** Supports both countdown and countup timers.
- **Smart Navigation:** Skip questions, jump to specific questions via the sidebar, or go back to previous questions.
- **Instant Feedback:** Option to reveal correct answers and view detailed explanations during the quiz.
- **Dynamic Modals:** Custom-built confirmation modals with `positive`, `danger`, and `neutral` variants for submitting or quitting the quiz.
- **Responsive Design:** Optimized for both mobile and desktop screens with a stunning dual-tone (Dark/Light mode) aesthetic.
- **State Management:** Fully utilizes Svelte 5 Runes (`$state`, `$derived`, `$effect`) for highly performant state reactivity.

## 🛠️ Built With

- [Svelte 5](https://svelte.dev/) - UI Framework
- [SvelteKit](https://kit.svelte.dev/) - Application Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Skeleton](https://skeleton.dev/) - UI Toolkit
- [Lucide Svelte](https://lucide.dev/) - Icons

## 💻 Running Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/bojdavid/Trivia.git
   ```
2. Navigate into the directory
   ```bash
   cd Trivia
   ```
3. Install dependencies
   ```bash
   npm install
   # or pnpm install / yarn
   ```
4. Start the development server
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`

## 📦 Building for Production

To create an optimized production build of the app:

```bash
npm run build
```

You can preview the production build locally with:

```bash
npm run preview
```
