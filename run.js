const { readCommandLineArg } = require("");
const { getPassword, setPassword } = require("");
const { askForMasterPassword } = require("");
const { isMasterPasswordCorrect } = require("");



async function run() {
 const masterPassword = await askForMasterPassword();


 if (!isMasterPasswordCorrect(masterPassword)) {
     console.error("Nice try...try again!");
     return run;
 }

 const [entryValue, newPasswordValue] = readCommandLineArg();
 if (!entryValue) {
     console.error("Missing entry value! 👾");
     return process.exit(9);
 }

 if (newPasswordValue) {
     await setPassword(entryValue, newPasswordValue);
     console.log(`Password ${entryValue}` set 🙏🏻);
 } else {
     const passwordValue = await getPassword(entryValue);
     console.log(`🀱 your password is: ${passwordValue}`);

 }

}

run();