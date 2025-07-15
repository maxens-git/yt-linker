const express = require('express');
const { exec } = require('child_process');

const router = express.Router();

router.post('/', (req, res) => {
    const { url, format } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'Missing URL' });
    }

    const formatOptions = {
        best: 'best',
        mp4: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]',
        webm: 'bestvideo[ext=webm]+bestaudio[ext=webm]/best[ext=webm]'
    };

    const selectedFormat = formatOptions[format] || 'best';
    const command = `yt-dlp -f "${selectedFormat}" -j "${url}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('yt-dlp error:', stderr);
            return res.status(500).json({ error: 'Failed to extract video info' });
        }
        const videos = stdout
            .trim()
            .split('\n')
            .map(line => {
                const data = JSON.parse(line);
                return {
                    title: data.title,
                    url: data.url
                };
            });

        return res.json({ videos });
    });
});

module.exports = router;
