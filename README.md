# Login with ZEBEDEE - Express Example App

The [ZEBEDEE](https://zebedee.io) App is a Bitcoin/Lightning gaming wallet focused on user experience. It interfaces with the ZEBEDEE Internal APIs to make charges/requests/payments/withdrawals. The app is available for [iOS](https://apps.apple.com/us/app/zebedee-play-earn-shop/id1484394401) and [Android](https://play.google.com/store/apps/details?id=io.zebedee.wallet&hl=en_US&gl=US&pli=1).

You can provide your users `Login with ZEBEDEE` by contacting André Neves on Twitter at [@andreneves](https://twitter.com/andreneves) to gain access to the [Developer Dashboard](https://dashboard.zebedee.io), creating an application in the Developer Dashboard, and setting up OAuth2. Set the redirect URL and obtain the client ID and secret.

## Source code

This is a simple [Express](https://expressjs.com/) project with everything at `index.js`.

### Setting up your own environment variables

To try authenticating with ZEBEDEE, create environment variables on your hosting site with the following names:

- ZEBEDEE_CLIENT_ID
- ZEBEDEE_CLIENT_SECRET
- HOST_URI

Note: `HOST_URI` should be like "https://example.com", without the slash at the end of the URL or you will get errors.

### Running the app

Before starting make sure you have Node.js version **^16**.

- Install dependencies: `npm i`
- Start the project: `npm start`

## Troubleshooting and Support

If you encounter any issues when setting up the environment variables, please reach out to me on Discord at “Coffee L. Arkoburger#5667”. I will be happy to assist you further. =)

## Disclaimer

This repository and its contents were created by Jose Moran Urena, a former developer of ZEBEDEE LLC. The contents of this repository are the sole responsibility of Jose Moran Urena and do not necessarily reflect the views or policies of ZEBEDEE LLC.
