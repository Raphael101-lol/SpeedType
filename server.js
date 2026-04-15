require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.listen(3000, () => {
    console.log('SpeedType Game is Running');
});

const Score = mongoose.model('score', new mongoose.Schema({
    username: String,
    wpm: Number,
    accuracy: Number,
    date: String
}));

app.post('/api/submit-score', async (req, res) => {
    const score = new Score(req.body);
    await score.save();
    res.send(score);
    console.log("Game Result Saved:", score);
});

app.get('/api/leaderboard', async (req, res) => {
    const scores = await Score.find().sort({ wpm: -1 }).limit(10);
    res.send(scores);
    console.log('Leaderboard loaded');
});

app.delete('/api/scores/:id', async (req, res) => {
    await Score.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

app.put('/api/scores/:id', async (req, res) => {
    const updateScore = await Score.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.send(updateScore);
});