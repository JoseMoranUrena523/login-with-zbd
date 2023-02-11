# Login with ZEBEDEE - Express Example App

The [ZEBEDEE](https://zebedee.io) App is a Bitcoin/Lightning gaming wallet focused on user experience. It interfaces with the ZEBEDEE Internal APIs to make charges/requests/payments/withdrawals. The app is available for [iOS](https://apps.apple.com/us/app/zebedee-play-earn-shop/id1484394401) and [Android](https://play.google.com/store/apps/details?id=io.zebedee.wallet&hl=en_US&gl=US&pli=1).

You can provide your users `Login with ZEBEDEE` by contacting André Neves on Twitter at [@andreneves](https://twitter.com/andreneves) to gain access to the [Developer Dashboard](https://dashboard.zebedee.io), creating an application in the Developer Dashboard, and setting up OAuth2. Set the redirect URL and obtain the client ID and secret.

## Source code

This is a simple [Express](https://expressjs.com/) project with everything at `index.js`.

### Setting up your own environment variables

To try authenticating with ZEBEDEE, create environment variables on Glitch/Repl.it with the following names:

- ZEBEDEE_CLIENT_ID
- ZEBEDEE_CLIENT_SECRET
- HOST_URI

### Running the app

Before starting make sure you have Node.js version **^16**.

- Install dependencies: `npm i`
- Start the project: `npm start`

## Troubleshooting and Support

If you encounter any issues when setting up the environment variables, please reach out to me on Discord at “Coffee L. Burger#5667”. I will be happy to assist you further. =)
