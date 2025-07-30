// src/scheduler.js
const cron = require('node-cron');
const { getCommitsLast24h } = require('./services/git.service');
const { getAssignedIssues } = require('./services/github.service');
const { generateMarkdown } = require('./utils/markdownGenerator');

console.log('📅 Scheduler running...');

// 9:00 mỗi sáng
cron.schedule('* * * * *', async () => {
  console.log('⏰ Running daily standup generation...');
  const commits = await getCommitsLast24h();
  const issues = await getAssignedIssues();
  await generateMarkdown({ commits, issues, blockers: [] });
});

