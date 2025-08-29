// server.js - small express wrapper for local testing
const express = require('express');
const handler = require('./api/bfhl').default || require('./api/bfhl');

const app = express();
app.use(express.json());

// Handler expects same signature as serverless req/res
app.post('/bfhl', handler);

app.use((req, res) => res.status(404).json({ is_success: false, message: 'Not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Local server running on http://localhost:${PORT}/bfhl`));
