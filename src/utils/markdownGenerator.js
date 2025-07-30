// src/utils/markdownGenerator.js
const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const Report = require('../models/report.model');
const { sendMail } = require('./emailSender');

async function generateMarkdown({ commits, issues, blockers }) {
  const today = dayjs().format('YYYY-MM-DD');

  const content = `## Daily Standup - ${today}

✅ Yesterday:
${commits.map(c => `- ${c}`).join('\n')}

📋 Today:
${issues.map(i => `- #${i.number} ${i.title}\n  👉 ${i.body}`).join('\n\n')}

🚧 Blockers:
${blockers.length ? blockers.map(b => `- ${b}`).join('\n') : '- None'}

🧑‍💻 Meeting link (if no blockers): ${blockers.length ? '(Blocked)' : 'https://meet.google.com/dok-jnko-vff'}
`;

  fs.writeFileSync(path.join(__dirname, '../../standup.md'), content);

  await Report.findOneAndUpdate(
    { date: today },
    {
      date: today,
      commits,
      issues: issues.map(i => `#${i.number} ${i.title}`),
      blockers
    },
    { upsert: true }
  );

  await sendMail(content);
  console.log('✅ Created standup.md and saved to MongoDB');
}

module.exports = { generateMarkdown };



