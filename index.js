const express = require('express');
const fetch = require('node-fetch');
const session = require('express-session');
const crypto = require('crypto');
const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest();
}

function base64URLEncode(str) {
  return str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function GeneratePKCE() {
  const verifier = base64URLEncode(crypto.randomBytes(32));

  if (verifier) {
    const challenge = base64URLEncode(sha256(verifier));
    return { challenge, verifier };
  }
}

app.get('/login', (req, res) => {
  const clientId = process.env.ZEBEDEE_CLIENT_ID;
  const redirectUri = `${process.env.HOST_URI}/callback`;
  const { verifier, challenge } = GeneratePKCE();
  const scope = "user";
  const url = `https://api.zebedee.io/v0/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&code_challenge_method=S256&code_challenge=${challenge}&scope=${scope}`;
  
  req.session.codeVerifier = verifier;
  res.redirect(url);
});

app.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  const codeVerifier = req.session.codeVerifier;
  
  const body = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: `${process.env.HOST_URI}/callback`,
    code_verifier: codeVerifier,
    client_id: process.env.ZEBEDEE_CLIENT_ID,
    client_secret: process.env.ZEBEDEE_CLIENT_SECRET
  };
  try {
    const response = await fetch('https://api.zebedee.io/v0/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    
    req.session.accessToken = data.access_token;
    
    const gamertagResponse = await fetch('https://api.zebedee.io/v0/oauth2/user', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.access_token}`
      }
    });
    const gamertagData = await gamertagResponse.json();
    console.log(gamertagData.data);
    const gamertag = gamertagData.data.gamertag;
    // res.redirect(`/?gamertag=${gamertag}`);
    res.redirect(`https://www.2048bitcoin.world/?gamertag=${gamertag}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error exchanging code for access token');
  }
});

app.get('/', async (req, res) => {
  if (!req.query.gamertag) {
    res.redirect(`/login`);
  } else {
    res.send(`Hey, ${req.query.gamertag}! This is an example so you can modify this code like line 76 for a redirect with the gamertag, or even this message!`);
  }
});

app.listen(3000);
