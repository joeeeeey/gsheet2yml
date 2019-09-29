const yaml = require("js-yaml");
const fs = require("fs");
const { google } = require("googleapis");
const { authorize } = require("./utils/google_auth");
const config = require('./config/config');

const {
  SPREAD_SHEET_ID,
  SPECIFIED_RANGE,
  LEFT_COLUMN_IS_KEY,
  CREDENTIAL_PATH,
} = config


// Load client secrets from a local file.
fs.readFile(CREDENTIAL_PATH, (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), convertSheetData2Yaml);
});

const writeJson2Yaml = rows => {
  const formatedData = {};
  rows.map(row => {
    if (LEFT_COLUMN_IS_KEY) {
      formatedData[row[0]] = row[1];
    } else {
      formatedData[row[1]] = row[0];
    }
    // console.log('formatedData: ', formatedData);
  });

  // See more dump params at:
  // https://github.com/nodeca/js-yaml#safedump-object---options-
  const res = yaml.safeDump(formatedData, {
    styles: {
      "!!null": "canonical" // dump null as ~
    },
    sortKeys: true // sort object keys
  });

  fs.writeFileSync("./tmp/result.yaml", res);

  console.log("Data has been written into tmp/result.yaml");
};

function convertSheetData2Yaml(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: SPREAD_SHEET_ID,
      range: SPECIFIED_RANGE
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const rows = res.data.values;
      if (rows.length) {
        writeJson2Yaml(rows);
      } else {
        console.log("No data found.");
      }
    }
  );
}
