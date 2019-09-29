## Intro

A repo to read and convert google sheet data to yaml file.

## How to Use
1. Clone this repo.
2. Open terminal and go into the directory of this repo.
3. Run `yarn install`.
4. Run `make init_config` to init config file.
5. Modify the `config/config.js` file as your like.
  - When first run, you need to generate `credentials.json` file and set path.(check in `config/config.js` )
6. Run `node index.js`.

## Note: 

When first run, you may to auth google sheet api at the auth url.