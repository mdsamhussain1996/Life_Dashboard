# Life Dashboard

A minimal, intelligent MVP for personal productivity. It stores all data in the browser's `localStorage` to keep things private and incredibly easy to run locally without a backend.

## Features
- **Daily State Check**: Log your mood, energy, and stress.
- **Smart Task System**: Recommends tasks based on your current energy level.
- **Thought Dump**: Brain dump text area that auto-categorizes entries.
- **Decision Helper**: Rate options by importance, effort, and impact to get an automated score.
- **Weekly Insights**: Track average mood and energy over time with simple charts.
- **Low Mode**: A calm interface that strips everything away except your daily log and a single task.

## Tech Stack
- React
- Vite
- Tailwind CSS
- Lucide React (Icons)
- Recharts (Charts)

## Setup Instructions

Since you wanted a website structure right away, I've laid down the exact project files using **Vite**.

1. **Ensure you have Node.js installed**
   Download from [nodejs.org](https://nodejs.org) if you haven't already.

2. **Open Terminal in the project folder**
   Navigate to `/Users/newtonuser/ANTI` (where the files are).

3. **Install Dependencies**
   Run the following command:
   ```bash
   npm install
   ```

4. **Run the Development Server**
   Start the local site:
   ```bash
   npm run dev
   ```

5. **Open the Website**
   Click the link shown in the terminal (usually `http://localhost:5173/`) to view your Life Dashboard!

## Assumptions Made
- We avoided creating a database/Node API as per the **Bonus** path to favor local storage. This fulfills all MVP requirements with a smoother setup.
- Used `recharts` for simple and clean weekly insight visualizations.
- Kept UI styling strictly to `TailwindCSS` with a focus on 'soft, minimal aesthetics'.
