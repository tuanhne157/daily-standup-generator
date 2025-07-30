// routes/standup.route.js
// routes/standup.route.js
const express = require('express');
const router = express.Router();
const { getCommitsLast24h } = require('../services/git.service');
const { getAssignedIssues } = require('../services/github.service');
const { generateMarkdown } = require('../utils/markdownGenerator');
const Report = require('../models/report.model');
const dayjs = require('dayjs');

// Trang preview + lịch sử
router.get('/', async (req, res) => {
  const today = dayjs().format('YYYY-MM-DD');
  const todayReport = await Report.findOne({ date: today });
  const history = await Report.find().sort({ date: -1 });

  let commits = [];
  let issues = [];

  if (todayReport) {
    commits = todayReport.commits;
    issues = todayReport.issues;
  } else {
    commits = await getCommitsLast24h();
    issues = await getAssignedIssues();
  }

  res.render('preview', {
    commits,
    issues,
    history,
    success: req.query.success
  });
});

// API tạo báo cáo
router.post('/generate', async (req, res) => {
  console.log('🟡 Form body:', req.body); // 👈 check giá trị

  const commits = await getCommitsLast24h();
  const issues = await getAssignedIssues();
  const blockers = req.body.blocker ? [req.body.blocker] : [];

  await generateMarkdown({ commits, issues, blockers });
  res.redirect('/?success=1');
});




router.post('/reset', async (req, res) => {
  await Report.deleteMany({});
  res.redirect('/');
});

module.exports = router;
