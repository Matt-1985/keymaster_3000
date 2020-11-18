const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const { setCollection } = require("./database");
const { replaceOne } = require("./database");
const { findInDB } = require("./database");
// const { deleteInDB } = require("./database");

// async function readPasswordSafe() {
//   const passwordSafeJSON = await fs.readFile("./db.json", "utf-8");
//   const passwordSafe = JSON.parse(passwordSafeJSON);

//   return passwordSafe;
// }

// async function writePasswordSafe(passwordSafe) {
//   await fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
// }

async function getPassword(entryValue) {
  const entry = await findInDB(entryValue);
  console.log(entry);
  const passwordBytes = CryptoJS.AES.decrypt(entry.value, "test");
  const pwd = passwordBytes.toString(CryptoJS.enc.Utf8);
  return pwd;
}

async function setPassword(entryValue, newPasswordValue) {
  const encryptPWValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    "test"
  ).toString();

  const collection = await setCollection("passwords");
  const newPWObject = {
    account: entryValue,
    value: encryptPWValue,
  };
  await replaceOne(collection, newPWObject);
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
