// src/services/git.service.js
const simpleGit = require('simple-git');
const dayjs = require('dayjs');
const git = simpleGit();

async function getCommitsLast24h() {
  try {
    const since = dayjs().subtract(1, 'day').toISOString();
    const log = await git.log([`--since=${since}`]);
    return log.all.map(commit => `${commit.message} (${commit.hash.slice(0, 7)})`);
  } catch (err) {
    console.error('❌ Git error:', err.message);
    return ['Không có commit nào'];
  }
}

module.exports = { getCommitsLast24h };



