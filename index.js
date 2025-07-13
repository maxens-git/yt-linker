const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/audio', (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'Missing URL' });
    }

    const command = `yt-dlp -f bestaudio --get-url "${url}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('yt-dlp error:', stderr);
            return res.status(500).json({ error: 'Failed to extract audio URL' });
        }
        const audioUrl = stdout.trim();
        return res.json({ audioUrl });
    });
});

app.listen(PORT, () => {
    console.log(`YouTube Audio Backend with yt-dlp running on http://localhost:${PORT}`);
});