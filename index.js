const yaml = require("js-yaml");
const fs = require("fs");
// const XLSX = require("xlsx");
// const readline = require('readline');
const { google } = require("googleapis");
const { authorize } = require("./utils/google_auth");
const config = require('./config/config');

// // ====== SET CONFIG HERE ======

// // Sheet 里面应当保持统一的格式，否则请规定要读取的范围
// const SPECIFIED_RANGE = "Sheet1!A1:B3";
// // 我会认为左边一列死翻译的 key, 但从数据来看并不是这样
// // 若右边一列是翻译的 key, 则设置为 true
// const LEFT_COLUMN_IS_KEY = false;

// const SPREAD_SHEET_ID = "1xYouZXzx6tbPWaI40aM6vxo59A6lXb4HZkFonV6-dho";

// const CREDENTIAL_PATH = 'credentials.json';
// // ====== AFTER SET CONFIG ======

const {
  SPREAD_SHEET_ID,
  SPECIFIED_RANGE,
  LEFT_COLUMN_IS_KEY,
  CREDENTIAL_PATH,
} = config


// Get credentials.json
// https://developers.google.com/sheets/api/quickstart/nodejs

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
