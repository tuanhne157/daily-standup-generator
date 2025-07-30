# 📝 Daily Standup Generator

Automatically generate daily standup reports from Git commits & GitHub issues — saving 10–15 minutes every morning and helping maintain consistent productivity.

---

## ✅ Features

- Fetches Git commits from the past 24 hours.
- Retrieves currently assigned GitHub issues.
- Provides a preview interface on localhost (`EJS + Bootstrap`).
- Automatically sends the daily report via email every morning.
- Tracks report history and allows selecting blocker reasons.

---

## 🧠 Reflection

This tool saves me **10–15 minutes every morning** by automating the preparation of daily standup reports.  
Instead of switching between GitHub, Git CLI, and Trello to write updates manually,  
I just run `node index.js`, and the report is generated in seconds.

It's a small but practical improvement that eliminates repetitive tasks and helps me stay focused and productive.

---

## 💻 Tech Stack

- Node.js + Express
- Git + GitHub API (`axios`)
- MongoDB + Mongoose
- Nodemailer
- EJS + Bootstrap
- node-cron

---

## 🚀 Run the App

npm start

Access the preview interface: http://localhost:3000
Click 📤 Generate & Save Report to generate and email the report
View report history and optionally add blockers

## ⏰ Automatic Scheduler (Daily Emails)

No need to manually run the report each day.
```bash
npm run scheduler
In production, the scheduler runs automatically after you run npm start.

## 📧 Email Delivery
Each report is sent to your personal or team email (configure recipients in emailSender.js under to: ...).

## 🖼️ Demo Preview
Interface showing commits, issues, blockers, and report history:
[▶️ Watch Demo on Google Drive](https://drive.google.com/file/d/1J0_wlYEEm5ol7-4vFaY2t0ONcUEUmHLL/view)
This demo shows how the app generates standup reports from Git commits and GitHub issues, sends them via email, and displays them in a beautiful interface.

## ⚙️ Installation

```bash
git clone https://github.com/tuanhne157/daily-standup-generator.git
cd daily-standup-generator
npm install

