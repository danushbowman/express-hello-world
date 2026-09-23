const express = require('express');
const app = express();

app.use(express.json());

// GET /webhook for Meta verification handshake
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = 'bowmicrosys_secure_token_deltabravo31';
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// POST /webhook for incoming WhatsApp messages & catalog inquiries
app.post('/webhook', (req, res) => {
  console.log('Incoming webhook message:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
