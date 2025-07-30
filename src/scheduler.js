// src/scheduler.js
const cron = require('node-cron');
const dotenv = require('dotenv');
dotenv.config();

const { getCommitsLast24h } = require('./services/git.service');
const { getAssignedIssues } = require('./services/github.service');
const { generateMarkdown } = require('./utils/markdownGenerator');

console.log('📅 Scheduler running...');

// Tự động chạy lúc 9:00 sáng mỗi ngày (theo server time) * * * * * test mỗi phút
cron.schedule('* * * * *', async () => {
  console.log('⏰ Running daily standup generation...');

  try {
    const commits = await getCommitsLast24h();
    console.log(`✅ Found ${commits.length} commit(s)`);

    const issues = await getAssignedIssues();
    console.log(`✅ Found ${issues.length} issue(s)`);

    const blockers = []; // Có thể cập nhật thêm logic nếu cần

    await generateMarkdown({ commits, issues, blockers });
  } catch (err) {
    console.error('🔥 Unexpected error in scheduler:', err.message || err);
  }
});
