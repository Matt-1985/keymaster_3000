const fs = require("fs").promises;
const CryptoJS = require("crypto-js");

async function readPasswordSafe() {
  const passwordSafeJSON = await fs.readFile("./db.json", "utf-8");
  const passwordSafe = JSON.parse(passwordSafeJSON);

  return passwordSafe;
}

async function writePasswordSafe(passwordSafe) {
  await fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
}

async function getPassword(entryValue) {
  const passwordSafe = await readPasswordSafe();
  const passwordBytes = CryptoJS.AES.decrypt(passwordSafe[entryValue], "test");

  return passwordBytes.toString(CryptoJS.enc.Utf8);
}

async function setPassword(entryValue, newPasswordValue) {
  const passwordSafe = await readPasswordSafe();

  passwordSafe[entryValue] = CryptoJS.AES.encrypt(
    newPasswordValue,
    "test"
  ).toString();

  await writePasswordSafe(passwordSafe);
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
