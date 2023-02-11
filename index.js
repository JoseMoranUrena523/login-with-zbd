const express = require('express');
const fetch = require('node-fetch');
const session = require('express-session');
const crypto = require('crypto');
const app = express();

app.use(session({
  secret: 'asecretcool',
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
  // redirect user to ZEBEDEE authorization endpoint
  const clientId = "209b5bac-0636-4d5e-8398-8e8a21382999";
  const redirectUri = "https://loginwithzbd.glitch.me/callback";
  const { codeVerifier, codeChallenge } = GeneratePKCE();
  const scope = "user";
  const url = `https://api.zebedee.io/v0/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=${scope}`;
  // save code verifier to the session for later use
  req.session.codeVerifier = codeVerifier;
  res.redirect(url);
});

app.get('/callback', async (req, res) => {
  // handle callback from ZEBEDEE
  const { code, state } = req.query;
  const codeVerifier = req.session.codeVerifier;
  // exchange authorization code for access token
  const body = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: "https://loginwithzbd.glitch.me/callback",
    code_verifier: codeVerifier,
    client_id: "209b5bac-0636-4d5e-8398-8e8a21382999",
    client_secret: "e3f731ea-128d-4f3b-9eff-f2cdefe05421"
  };
  try {
    const response = await fetch('https://api.zebedee.io/v0/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    console.log(data);
    // save access token to the session
    req.session.accessToken = data.access_token;
    // retrieve ZEBEDEE Gamertag
    const gamertagResponse = await fetch('https://api.zebedee.io/v0/oauth2/user', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.access_token}`
      }
    });
    const gamertagData = await gamertagResponse.json();
    console.log(gamertagData);
    const gamertag = gamertagData.username;
    res.redirect(`/?gamertag=${gamertag}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error exchanging code for access token');
  }
});

app.listen(3000);