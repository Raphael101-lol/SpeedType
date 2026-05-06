const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

const scoreSchema = new mongoose.Schema({
  username: String,
  wpm: Number,
  accuracy: Number,
  mode: String,
  time: Number,
  createdAt: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', scoreSchema);

app.post('/api/scores', async (req, res) => {
  try {
    const { username, wpm, accuracy, mode, time } = req.body;
    
    let existing = await Score.findOne({ username, mode });
    
    if (existing) {
      if (wpm > existing.wpm) {
        existing.wpm = wpm;
        existing.accuracy = accuracy;
        existing.time = time;
        await existing.save();
      }
      return res.json(existing);
    }
    
    const score = await Score.create({ username, wpm, accuracy, mode, time });
    res.json(score);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/scores', async (req, res) => {
  try {
    const result = { Easy: [], Medium: [], Hard: [], Extreme: [] };
    const modes = ['Easy', 'Medium', 'Hard', 'Extreme'];
    
    for (let mode of modes) {
      result[mode] = await Score.find({ mode }).sort({ wpm: -1 }).limit(10);
    }
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/scores/:id', async (req, res) => {
  try {
    await Score.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));