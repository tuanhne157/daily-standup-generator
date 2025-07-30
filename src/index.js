// src/index.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const standupRoutes = require('./routes/standup.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Cấu hình view & static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', standupRoutes);

// Gọi scheduler sau khi server khởi động (gọi scheduler.js để gửi standup mỗi ngày)
require('./scheduler');

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 App running at http://localhost:${PORT}`);
});
