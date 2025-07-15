const express = require('express');
const cors = require('cors');
const audioRouter = require('./routes/audio');
const videoRouter = require('./routes/video');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/audio', audioRouter);
app.use('/api/video', videoRouter);

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
