# overlay

Provides real-time statistics of players in-game.

## Important Note

*This project was last updated in September 2021. Services such as the [Hypxiel API](https://api.hypixel.net) and [PlayerDB](https://playerdb.co) may have changed and are thus outdated. Edits may be required to use or reproduce. Moreover, this app is designed for the [Hypixel Server](https://hypixel.net) in [Minecraft Java Edition](https://minecraft.net), with support for both the Standard Forge Client and [Lunar Client](https://lunarclient.com). This may not be compatible with other servers, games, clients, or contexts and may not be guaranteed to work.*

## Requisites

1. `Minecraft Java Account` from [Minecraft](https://minecraft.net)
2. `API Key` from the [Hypxiel API](https://api.hypixel.net)
3. Standard Forge Client or [Lunar Client](https://lunarclient.com)
4. [MongoDB](https://mongodb.com) `Database` and uri

## Features

* Queries the Hypixel API for the **stats of participating players when in-game**. 
* **Built in tagging system** querying three APIs for nicks and known player behavior(s).
* Connects to a **custom Tracker Bot** with manual input support for further player tracking and detection.
* Lightweight; data retrieval is log-based on a user's game file. **The client and keys of the user are customizable in the app**.

## Technologies 

* The app is built on the [ElectronJS](https://electronjs.org) framework.
* [MongoDB](https://mongodb.com) is used for Database tracking.
* For API fetching, the [node-fetch](https://www.npmjs.com/package/node-fetch) package is used.
* Other npm packages include `electron-builder`, `electron-update`, `read-last-lines`, and `dotenv`.


## Setup

### Environment Variables

In order to start the app, create a `.env` file and fill in the following variables.

```
OVERLAY_PRIVATE_API_ROUTE=
OVERLAY_MONGODB_URI=
```

### Installation

To test the application, execute the following comamnds on the terminal.

`npm install`

`npm start`