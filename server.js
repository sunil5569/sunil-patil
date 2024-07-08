// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/museum-management', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the article schema
const articleSchema = new mongoose.Schema({
  name: String,
  category: String,
  dateCreated: Date,
  creatorName: String
});

// Create a model for the article schema
const Article = mongoose.model('Article', articleSchema);

// Create API endpoints
app.use(express.json());

// GET all articles
app.get('/api/articles', async (req, res) => {
  const articles = await Article.find().exec();
  res.json(articles);
});

// POST a new article
app.post('/api/articles', async (req, res) => {
  const article = new Article(req.body);
  await article.save();
  res.json(article);
});

// GET a single article
app.get('/api/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id).exec();
  if (!article) {
    res.status(404).json({ message: 'Article not found' });
  } else {
    res.json(article);
  }
});

// PUT update an article
app.put('/api/articles/:id', async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
  if (!article) {
    res.status(404).json({ message: 'Article not found' });
  } else {
    res.json(article);
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});