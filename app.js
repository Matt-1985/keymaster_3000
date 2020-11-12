//
// console.log(args["name"]); //joe

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question(`What's your name?`, (name) => {
//   console.log(`Hi ${name}!`);
//   readline.close();
// });

// const inquirer = require("inquirer");

// let questions = [
//   {
//     type: "input",
//     name: "name",
//     message: "What's your name?",
//   },
//   {
//     type: "password",
//     mask: " *",
//     name: "password",
//     message: "Enter your Password",
//   },
// ];

// inquirer.prompt(questions).then((answers) => {
//   console.log(`Hi ${answers["name"]}!`);
//   console.log("Korrekt!");
// });
// const inquirer = require("inquirer");
// const fs = require("fs").promises;
// const args = process.argv.slice(2); //durch slice wird ein neues array umgewandelt für bessere lesbarkeit; slice schneidet die 3 stelle rausgeschnitten
// const wantedPWDFor = args[0];
// // 0 = erste position im neuen arry die angesteuert wird

// const masterPassword = "test";

// async function getData() {
//   const promise = await fs.readFile("./db.json", "utf8"); // asyncrone functionen laufen nebeneinander ; "warte bis recht was kommt und dann gibb es nach links und dannn die nächgste Zeile"
//   const data = await JSON.parse(promise); //JSON ist für umwandlung und verarbeitung des Objektes
//   return data;
// }

// async function validateAccess() {
//   const rules = [
//     {
//       type: "password",
//       name: "answer",
//       message: "Enter your password",
//     },
//   ];

//   const { answer } = await inquirer.prompt(rules); // rules ist das "rules" aus Zeile 48 // await prompt ist das warten auf die nutzer eingabe  //"password" kopiert "password" asus Zeile 51 (destrcution)
//   if (answer !== masterPassword) {
//     console.error("Nice try...try again");
//     return; // return bedeutet in diesem zusammenhang das beenden der funktion
//   }
//   console.log("wow...how'd you managed?");

//   const newPasswordValue = args[1];
//   const passwordSafe = await getData();

//   if (newPasswordValue) {
//     passwordSafe[wantedPWDFor] = newPasswordValue;
//     fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
//   } else {
//     console.log(`You want to know the password of ${wantedPWDFor}`);
//   }

//   const password = passwordSafe[wantedPWDFor];
//   if (password) {
//     console.log(`${wantedPWDFor}: ${password}`);
//   } else {
//     console.log("Password not found...you fraud!");
//   }
// }

// validateAccess();
const { readCommandLineArguments } = require("./lib/commandoLine");
const { getPassword, setPassword } = require("./lib/passwords");
const { askForMasterPassword, askForNextStep } = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url =
  "mongodb+srv://matt:ZkVz2TK2GDq9Xigp@cluster0.re7ym.mongodb.net/keymaster3000?retryWrites=true&w=majority";

MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);

  const db = client.db("keymaster3000");
  db.collection("passwords")
    .insertOne({
      account: "mauzti",
      value: "bhsjkasj",
    })
    .then(function (result) {
      // process result
    });
  // client.close();
});

async function run() {
  const masterPassword = await askForMasterPassword();

  if (!isMasterPasswordCorrect(masterPassword)) {
    console.error("Nice try...try again!");
    return run;
  }

  const { searchAndAdd } = await askForNextStep();
  if (searchAndAdd === "Search") {
    console.log("What password do you want to search for?");
  } else {
    console.log("What would you like to add?");
  }

  const [entryValue, newPasswordValue] = readCommandLineArguments();
  if (!entryValue) {
    console.error("Missing entry value! 👾");
    return process.exit(9);
  }

  if (newPasswordValue) {
    await setPassword(entryValue, newPasswordValue);
    console.log(`Password ${entryValue}`);
  } else {
    const passwordValue = await getPassword(entryValue);
    console.log(`🀱 your password is: ${passwordValue}`);
  }
}

run();
