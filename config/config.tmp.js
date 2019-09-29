'use strict';


// Get Sheet id at url.
const SPREAD_SHEET_ID = "1xYouZXzx6tbPWaI40aM6vxo59A6lXb4HZkFonV6-dho";

// `${Area}!${Range}`
const SPECIFIED_RANGE = "Sheet1!A1:B3";

// 默认翻译的数据只会使用两列，该参数声明翻译的 key 是左边一列还是右边一列
// 我会认为左边一列死翻译的 key, 但从数据来看并不是这样
// 若右边一列是翻译的 key, 则设置为 false
const LEFT_COLUMN_IS_KEY = false;

// Get credentials.json
// 在 https://developers.google.com/sheets/api/quickstart/nodejs 点击按钮生成并下载 credentials 文件
// 可将下载的文件拷贝至此处使用相对路径, 或指定其绝对路径
const CREDENTIAL_PATH = 'credentials.json';

// 在第一次授权完后会自动生成 token.json 到本地 为后续发起 API 请求自动授权。
// 可随意规定
// const TOKEN_PATH = 'token.json';

const config = {
  SPREAD_SHEET_ID,
  SPECIFIED_RANGE,
  LEFT_COLUMN_IS_KEY,
  CREDENTIAL_PATH,
}

module.exports = config;