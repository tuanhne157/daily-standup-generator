const axios = require('axios');
require('dotenv').config();

async function getAssignedIssues() {
  const { GITHUB_USERNAME, GITHUB_TOKEN } = process.env;
  const res = await axios.get(`https://api.github.com/issues`, {
    auth: {
      username: GITHUB_USERNAME,
      password: GITHUB_TOKEN
    }
  });
  return res.data.map(issue => `- ${issue.title} (#${issue.number})`);
}

module.exports = { getAssignedIssues };
