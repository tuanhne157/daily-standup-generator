const { getCommitsLast24h } = require('./services/git.service');
const { getAssignedIssues } = require('./services/github.service');
const { generateMarkdown } = require('./utils/markdownGenerator');

(async () => {
  try {
    console.log('🚀 Generating Daily Standup...');
    const commits = await getCommitsLast24h();
    const issues = await getAssignedIssues();
    generateMarkdown({ commits, issues });
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();
