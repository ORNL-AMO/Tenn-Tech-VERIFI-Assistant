// this entire thing was written with chatgpt, I have no idea how to do webdev, but it translated some psuedocode I had written into ts

import express from 'express';
import cors from 'cors';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json({ limit: '10kb' }));

// Log directory
const LOG_DIR = path.join(process.cwd(), 'logs');

// Logging function
async function writelog(message: string): Promise<void> {
    const now = new Date();

    const time = now.toLocaleTimeString('en-GB');
    const date = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0')
    ].join('-');

    const filename = path.join(LOG_DIR, `${date}.log`);
    const logMessage = `${time}.${message}\n`;

    await fs.mkdir(LOG_DIR, { recursive: true });
    await fs.appendFile(filename, logMessage, 'utf8');
}

// API endpoint
app.post('/api/logs', async (req, res) => {
    try {
        const message = req.body?.message;

        if (typeof message !== 'string' || message.length === 0) {
            res.status(400).json({ error: 'Invalid log message' });
            return;
        }

        await writelog(message);

        res.status(204).send();
    } catch (error) {
        console.error('Logging failed:', error);
        res.status(500).json({ error: 'Failed to write log' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});

