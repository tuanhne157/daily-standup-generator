// src/services/github.service.js
const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_USERNAME;
const REPO = process.env.GITHUB_REPO;

const auth = {
  headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
};

async function getAssignedIssues() {
  try {
    const res = await axios.get(`https://api.github.com/repos/${OWNER}/${REPO}/issues`, auth);
    return res.data.map(i => ({
      number: i.number,
      title: i.title,
      body: i.body || '(No description)'
    }));
  } catch (err) {
    console.error('❌ Error fetching GitHub issues:', err.message);
    return [];
  }
}

module.exports = { getAssignedIssues };
