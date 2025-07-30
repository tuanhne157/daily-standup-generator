const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');

function generateMarkdown({ commits, issues }) {
  const today = dayjs().format('DD/MM/YYYY');
  const md = `## Daily Standup - ${today}

**Yesterday:**
${commits.join('\n') || '- No commits'}

**Today:**
${issues.join('\n') || '- No issues assigned'}

**Blockers:**
- None
`;

  fs.writeFileSync(path.join(__dirname, '../../standup.md'), md);
  console.log('✅ Generated standup.md');
}

module.exports = { generateMarkdown };
