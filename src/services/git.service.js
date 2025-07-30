const simpleGit = require('simple-git');
const dayjs = require('dayjs');

const git = simpleGit();

async function getCommitsLast24h() {
  const since = dayjs().subtract(1, 'day').toISOString();
  const log = await git.log({ since });
  return log.all.map(commit => `- ${commit.message} (${commit.hash.slice(0, 7)})`);
}

module.exports = { getCommitsLast24h };
