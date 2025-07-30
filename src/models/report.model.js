// models/report.model.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  date: String,
  commits: [String],
  issues: [String],
  blockers: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);

